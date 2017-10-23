const Todo = require('../models/todo')
const helper = require('../helper/helper')

module.exports = {
  findAll: (req, res) => {
    let decode = helper.getId(req.params.token)
    Todo.find({userid: decode.id}).populate('userid').sort('description').then((rowsTodo) => {
      if (rowsTodo.length != 0) {
        res.json({
          message: "Berhasil Tampil Semua list",
          data: rowsTodo
        })
      } else {
        res.json({
          message: "Belom ada data"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  insert: (req, res) => {
    let decode = helper.getId(req.body.token)
    let data = helper.dataTodo(req.body, decode.id)
    Todo(data).save().then((result) => {
      res.json({
        message: "Berhasil Menambahkan",
        data: result
      })
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  update: (req, res) => {
    // console.log(req.params.id);
    Todo.update({_id: req.params.id}, {$set: {status: "Finished"}}).then((rowTodo) => {
      if (rowTodo.n != 0) {
        res.json({
          message: "Berhasil Update",
          data: rowTodo
        })
      } else {
        res.json({
          message: "Maaf tidak ada todo dengan Id tersebut"
        })
      }
    }).catch((reason) => {
      message: reason
    })
  },

  delete: (req, res) => {
    Todo.remove({_id: req.params.id}).then((rowTodo) => {
    // console.log(rowTodo);
      if (rowTodo.result.n != 0) {
        res.json({
          message: "Berhasil Hapus",
          data: rowTodo
        })
      } else {
        res.json({
          message: "Maaf tidak ada Id tersebut"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  }
}
