let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific article and its comments
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author],
  })
  
  .then((article) => {
    if (!article) throw Error()
    console.log(article.author)
    res.render('articles/show', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})
// Add the ability to view comments on GET /articles/:id.
// See the example above on how to include the comments, 
// then use EJS to render each comment's information on the page.
// Make sure you have a comment 
// in the database you can use to verify this functionality.


// POST /articles - create a new comment WORKS DONT TOUCH
router.post('/:id', (req, res) => {
  db.comment.create({
  name: req.body.name,
  content: req.body.content,
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.get('/:id/comments', (req, res) => {
  db.comment.findAll({
    where: {artcleId: req.params.id},
    include: [db.comment],
  
  }).then((comment) => {
    res.render('articles/comments', {comment: comment})
  }).catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})



module.exports = router
