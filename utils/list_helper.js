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

module.exports = {
  totalLikes,
  empty,
  maxLikes
}