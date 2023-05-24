const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helper = require('./test_helper');
const Blog = require('../models/blogs');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs have id property named id instead of _id', async () => {
    const response = await api.get('/api/blogs');
    const ids = response.body.map(blog => blog.id);

    for (let id of ids) {
      expect(id).toBeDefined();
    }
  });
});

describe('addition of a new blog', () => {
  let token = null;

  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = await new User({ username: 'root', passwordHash }).save();

    const userForToken = { username: 'name', id: user.id };
    return (token = jwt.sign(userForToken, process.env.SECRET));
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'author',
      url: 'https://url.test',
      likes: 1
    };

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContain('new blog');
  });

  test('likes property defaults to 0 if missing', async () => {
    const newBlog = {
      title: 'new blog2',
      author: 'author2',
      url: 'https://url2.test'
    };

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test('backend responds with status 400 if title and url are missing', async () => {
    const newBlog = {
      author: 'author',
      likes: 1
    };

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = await new User({ username: 'name', passwordHash }).save();

    const userForToken = { username: 'name', id: user._id };
    token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: 'random blog',
      author: 'author',
      url: 'https://url.test'
    };

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    return token;
  });

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user');
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await Blog.find({}).populate('user');
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test('fails with status code 401 if id is not valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user');
    const blogToDelete = blogsAtStart[0];

    token = null;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(401);

    const blogsAtEnd = await Blog.find({}).populate('user');

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    expect(blogsAtStart).toEqual(blogsAtEnd);
  });
});
