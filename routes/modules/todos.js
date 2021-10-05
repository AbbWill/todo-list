const express = require('express')

const router = express.Router()

const Todo = require('../../models/todo')

// 新增路由
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增路由
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then(todo => res.render('detail', { todo}))
  .catch(error => console.log(error))
})

// 編輯(修改todo)路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then(todo => res.render('edit', { todo}))
  .catch(error => console.log(error))
})

// 接edit路由
router.put('/:id', (req, res) => { 
  const id = req.params.id
  const { name, isDone } = req.body
  // const name = req.body.name
  // const isDone = req.body.isDone

  return Todo.findById(id) // 查詢資料
  .then(todo => {  // 如果查詢成功 修改後重新儲存資料
    todo.name = name
    todo.isDone = isDone === 'on'
    // if (isDone === 'on') {
    //   todo.isDone= true
    // } else {
    //   todo.isDone = false
    // } 
    return todo.save()
  })
  .then(() => res.redirect(`/todos/${id}`)) // 如國儲存成功 導向首頁
  // 少了>>(`/todos/${id}`)) 所以edit會error
  .catch(error => console.log(error))
})

// 刪除路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
  .then(todo => todo.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})




module.exports = router
