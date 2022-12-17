const listHelper = require('../utils/list_helper')
const blogs = require('./blogsJSON')

describe('favorite Blog', () => {
  const mostLikedBlog = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }

  test('Canonical string reduction had the most number of likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(mostLikedBlog)
  })
})
