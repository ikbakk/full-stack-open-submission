const listHelper = require('../utils/list_helper')
const blogs = require('./blogsJSON')

describe('favorite Blog', () => {
  const mostLikedBlog = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('Robert C. Martin has the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostLikedBlog)
  })
})
