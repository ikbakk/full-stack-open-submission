const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
    let likes = blogs.map(blog => blog.likes)
    let index = likes.indexOf(Math.max(...likes))
    return blogs[index]
}

const mostBlogs = (blogs) => {
    let authors = blogs.map(blog => blog.author)
    authors = [...new Set(authors)]

    let published = new Array(authors.length).fill(0)
    blogs.map(blog =>
        published[authors.indexOf(blog.author)] += 1
    )

    let index = published.indexOf(Math.max(...published))
    
    return {
        author: authors[index],
        blogs: published[index]
    }
}

const mostLikes = (blogs) => {
    let authors = blogs.map(blog => blog.author)
    authors = [...new Set(authors)]

    let total = new Array(authors.length).fill(0)
    blogs.map(blog =>
        total[authors.indexOf(blog.author)] += blog.likes
    )

    let index = total.indexOf(Math.max(...total))

    return {
        author: authors[index],
        likes: total[index]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}