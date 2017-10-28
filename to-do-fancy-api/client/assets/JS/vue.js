new Vue({
  el: '#app',
  data: {
    todoList: [],
    errorMessage: ''
  },
  methods: {
    getAll(){
      let token = localStorage.getItem('token')

      axios.get('http://localhost:3000/todos/'+token).then((response) => {
        console.log(response.data.data);
        if (response.data.data) {
          let tombol = ''
          let mark = ''
          let arrMonth = ['January','February','March','April','May','June','July','August','September','October','November','December']

          response.data.data.forEach((todolist, index) => {
            let Obj = {
              id: todolist._id,
              description: todolist.description,
            }

            if (todolist.status) {
              Obj.buttonCondition = 'hidden'
              Obj.src = "assets/images/true.png"
            } else {
              Obj.buttonCondition = ''
              Obj.src = "assets/images/false.png"
            }

            if (todolist.deadline != null) {
              let deadline = new Date(todolist.deadline);
              Obj.formatedDL = deadline.getDate()+" "+arrMonth[deadline.getMonth()]+" "+deadline.getFullYear()
            } else {
              Obj.formatedDL = "Not Set"
            }

            this.todoList.push(Obj)
          })
        }
      }).catch((reason) => {
        console.log("ERROR, "+reason);
      })
    },

    checkLogin() {
      let inputData = {
        username: $('input[name=username]').val(),
        password: $('input[name=password]').val()
      }

      axios.post('http://localhost:3000/users/login', inputData)
      .then((response) => {
        if (!response.data.data) {
          // $("#logerror").html(response.message)
          this.errorMessage = response.data.message
        } else {
          localStorage.setItem('token', response.data.data)
          window.location.reload()
        }
      }).catch((reason) => {
        console.log("ERROR, "+reason);
      })
    },

    checkRegister() {
      let inputData = {
        username: $('input[name=signusername]').val(),
        password: $('input[name=signpassword]').val(),
        email: $('input[name=signemail]').val()
      }

      axios.post('http://localhost:3000/users/register', inputData)
      .then((response) => {
        if (!response.data.data) {
          // $("#signerror").html(response.message)
          this.errorMessage = response.data.message
        } else {
          localStorage.setItem('token', response.data.data)
          window.location.reload()
        }
      }).catch((reason) => {
        console.log("ERROR, "+reason);
      })
    },

    // logout() {
    //   localStorage.removeItem('token')
    //   alert("Byeeeeee Darling")
    //   window.location.reload()
    // },

    addTodo() {
      let inputData = {
        token: localStorage.getItem('token'),
        description: $('textarea[name=description]').val(),
        deadline: $('input[name=deadline]').val()
      }

      axios.post('http://localhost:3000/todos/insert', inputData)
      .then((response) => {
        window.location.reload()
      }).catch((reason) => {
        console.log("ERROR, "+reason);
      })
    },

    updateTodo(index) {
      let id = this.todoList[index].id
      axios.put('http://localhost:3000/todos/update/'+id)
      .then((response) => {
        this.todoList[index].buttonCondition = "hidden"
        this.todoList[index].src = "assets/images/true.png"
      }).catch((reason) => {
        console.log("ERROR, "+reason);
      })
    },

    deleteTodo(index) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to read this todo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((deleted) => {
        if (deleted) {
          let id = this.todoList[index].id
          axios.delete('http://localhost:3000/todos/delete/'+id)
          .then((response) => {
            this.todoList.splice(index, 1)
            swal("Your todo has been deleted", {
              icon: "success",
            });
          }).catch((reason) => {
            console.log("ERROR, "+reason);
          })
        }
      });
    }
  },

  mounted: function(){
    if (localStorage.getItem('token')) {
      this.getAll()
      $('#content').show(200)
    } else {
      $('#loginform').show(200)
    }
  }
})
