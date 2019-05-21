const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

// static == look at file as is
// can only access things in public folder directly via localhost:5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/histogram'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
