// controller
const express = require('express')

const exphbs = require('express-handlebars')

const bodyParser = require('body-parser') // 引用 body-parser

const methodOverride = require('method-override')

// const Todo = require('./models/todo') <<已經無用

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true})) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理

app.use(methodOverride('_method'))

// 瀏覽所有 Todo 路由
// app.get('/', (req, res) => {
// Todo.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ _id: 'asc' }) // 正序，反序:desc 
//     .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
//     .catch(error => console.error(error)) // 錯誤處理
// })
app.use(routes) // 取代上面的


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})


// // 新增路由
// app.get('/todos/new', (req, res) => {
//   return res.render('new')
// })

// // 新增路由
// app.post('/todos', (req, res) => {
//   const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
//   // const todo = new Todo({ name })
//   // return todo.save()
//   // .then(() => res.redirect('/'))
//   // .catch(error => console.log(error))

//   return Todo.create({ name })   // 存入資料庫
//   .then(() => res.redirect('/'))   // 新增完成後導回首頁
//   .catch(error => console.log(error))
// })



// // 瀏覽路由
// app.get('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//   .lean()
//   .then(todo => res.render('detail', { todo}))
//   .catch(error => console.log(error))
// })

// // 編輯(修改todo)路由
// app.get('/todos/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//   .lean()
//   .then(todo => res.render('edit', { todo}))
//   .catch(error => console.log(error))
// })

// // 接edit路由
// app.put('/todos/:id', (req, res) => { 
//   const id = req.params.id
//   const { name, isDone } = req.body
//   // const name = req.body.name
//   // const isDone = req.body.isDone

//   return Todo.findById(id) // 差詢資料
//   .then(todo => {  // 如果查詢成功 修改後重新儲存資料
//     todo.name = name
//     todo.isDone = isDone === 'on'
//     // if (isDone === 'on') {
//     //   todo.isDone= true
//     // } else {
//     //   todo.isDone = false
//     // } 
//     return todo.save()
//   })
//   .then(() => res.redirect(`/todos/${id}`)) // 如國儲存成功 導向首頁
//   .catch(error => console.log(error))
// })

// // 刪除路由
// app.delete('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//   .then(todo => todo.remove())
//   .then(() => res.redirect('/'))
//   .catch(error => console.log(error))
// })

// test

