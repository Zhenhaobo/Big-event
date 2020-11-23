$(function(){
 let form = layui.form
let layer = layui.layer
//  提交事件
 form.verify({
     pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      newpwd:function (value) {
          if(value === $('[name=oldPwd]').val()) {
              return '两次密码不能一样'
          }
        },
     newspwd:function (value) {
        if(value !==$('[name=newPwd]').val())
        {
            return '两次密码输入不一致'
        }
     }
      


 })

 $('#postpwd').on('submit', function(e) {
       e.preventDefault();
       $.ajax({
           method: 'POST',
           url:'/my/updatepwd',
           data:$(this).serialize(),
           success: function(res) {
               if(res.status !==0) return layer.msg(res.message);
               layer.msg(res.message)
               $('#postpwd')[0].reset();
            //    location.href= '/login.html'
           }
       })
 })





})