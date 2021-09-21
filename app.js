const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')

const bodyParser = require('body-parser') // 引用 body-parser

const Todo = require('./models/todo')

const app = express()

mongoose.connect('mongodb://localhost/todo-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true})) 
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理




// 瀏覽所有 Todo 路由
app.get('/', (req, res) => {
Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 新增路由
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// 新增路由
app.post('/todos', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  // const todo = new Todo({ name })
  // return todo.save()
  // .then(() => res.redirect('/'))
  // .catch(error => console.log(error))

  return Todo.create({ name })   // 存入資料庫
  .then(() => res.redirect('/'))   // 新增完成後導回首頁
  .catch(error => console.log(error))
})


// 瀏覽路由
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then(todo => res.render('detail', { todo}))
  .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('App is running on port 3000')
})

