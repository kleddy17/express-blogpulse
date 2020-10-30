var db = require('./models')

// db.comment.create({
//   name: 'Kristi Eddy',
//   content: 'I got to fix the name of content',
//   articleId: 1
// })
// .then(function(comment) {
//   console.log(comment.get())
// })








db.article.findOne({
  where: { id: 1 },
  include: [db.comment]
}).then(function(article) {
  // by using eager loading, the article model should have a comments key
  console.log(article.comments)
})