const listHelper = require('../utils/list_helper')
const blogs = require('./blogsJSON')

describe('Most Liked Blog', () => {
  const mostLikedBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  test('Edsger W. Dijkstra has the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikedBlog)
  })
})
