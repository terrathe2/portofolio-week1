$(document).ready(function(){
  $('#email').on('keypress', function(){
    console.log("coy");
    let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!pattern.test(this.value)) {
      console.log("hai");
      $('#emailerr').html("<img src='../images/false.png' width='12'> Invalid Email Address").css({"color":"red"}).show()
      $("#email").css({"border":"2px solid red","border-radius":"5px","padding":"2px"})
    } else {
      console.log("lol");
      $('#emailerr').html("<img src='../images/true.png' width='12'> Cool Email!").css({"color": "green"}).show()
      $("#email").css({"border":"2px solid green","border-radius":"5px","padding":"2px"})
    }
  })
})
