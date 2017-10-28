Vue.component('list', {
  props: ['idx', 'imgSrc', 'description', 'formatedDL', 'buttonCondition'],
  template: `
    <tr>
      <td><img :src="imgSrc" alt="Mark Image"></td>
      <td>{{ description }}</td>
      <td> ~~~ </td>
      <td>Deadline : {{ formatedDL }}</td>
      <td>
        <button class='finish' v-if="buttonCondition === ''" @click="updateTodoSendIdx()" >Finished</button>
        <button class='finish' v-else hidden>Finished</button>
        <button class='delete' @click="deleteTodoSendIdx()" >Delete</button>
      </td>
    </tr>
  `,
  methods: {
    updateTodoSendIdx() {
      this.$emit('changeStatus', {
        key: this.key
      })
    },

    deleteTodoSendIdx() {
      this.$emit('deleteList', {
        key: this.key
      })
    }
  },
})

Vue.component('todo', {
  props: ['tlist'],
  template: `
    <div class='todoContent'>
      <button id="logout" onclick="logout()">Logout</button>
      <h2>My ToDo List</h2>
      <table class="todolist">
        <tbody>
          <list v-for="(value, index) in tlist" key="index" @changeStatus="updateTodo(index)" @deleteList="deleteTodo(index)" idx="index" :imgSrc="value.src" :description="value.description" :formatedDL="value.formatedDL" :buttonCondition="value.buttonCondition"></list>
        </tbody>
      </table><br>
      <button id="togle">Show Add Todo Form</button>
    </div>
  `,
  methods: {
    updateTodo(index) {
      // console.log(index);
      let id = this.tlist[index].id
      // console.log(id);
      axios.put('http://localhost:3000/todos/update/'+id)
      .then((response) => {
        let buttonCondition = 'hidden'
        let src = 'assets/images/true.png'

        this.tlist[index].src = src
        this.tlist[index].buttonCondition = buttonCondition
      }).catch((reason) => {
        console.log("ERROR, "+reason);
      })
    },

    deleteTodo(index) {
      // console.log(index);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to read this todo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((deleted) => {
        if (deleted) {
          let id = this.tlist[index].id
          axios.delete('http://localhost:3000/todos/delete/'+id)
          .then((response) => {
            this.tlist.splice(index, 1)
            swal("Your todo has been deleted", {
              icon: "success",
            });
          }).catch((reason) => {
            console.log("ERROR, "+reason);
          })
        }
      });
    }
  }
})

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
        // console.log(response.data.data);
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
          this.errorMessage = response.data.message
        } else {
          localStorage.setItem('token', response.data.data)
          window.location.reload()
        }
      }).catch((reason) => {
        console.log("ERROR, "+reason);
      })
    },

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

    // updateStateList(index) {
    //   console.log("DIMARI", index);
    //
    //   // this.todoList[index].buttonCondition = 'hidden'
    //   // this.todoList[index].src = 'assets/images/true.png'
    //   //
    //   // console.log(this.todoList);
    // },

    // deleteStateList(index) {
    //   // console.log("DIMARI", index);
    //   this.todoList.splice(index, 1)
    // }
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
