const _ = require('lodash')

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const empty = (array) => {
  return array.length === 0
    ? 0
    : null
}

const maxLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc.likes > curr.likes ? acc : curr)
}

const mostBlogs = (blogs) => {
  return _.chain(blogs)
      .groupBy('author')
      .map((value, key) => ({ author: key, blogs: value.length }))
      .maxBy('blogs')
      .value()
}

const mostLikes = (blogs) => {
  return _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({ author: key, likes: _.sumBy(value, 'likes') }))
    .maxBy('likes')
    .value()
}

module.exports = {
  totalLikes,
  empty,
  maxLikes,
  mostBlogs,
  mostLikes
}