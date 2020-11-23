$(function(){
  let form = layui.form
  let layer = layui.layer
      form.verify({
         nickname: function (value){
             if(value.length > 6){
                 return '必须是1-6个字符'
             }
         }
      })
    // 获取用户基本信息
    getuserinfo()
    function getuserinfo(){
        $.ajax({
            method: 'GET',
            url:'/my/userinfo',
            success: function(res){
                console.log(res);
               if(res.status !==0) return console.log(res.message);
               if(res.data.username) {
                  form.val('userinfo',res.data)
               }
            }
        })
    }
    // 重置按钮
    $('#chongzhi').on('click',function(e){
            e.preventDefault()
            getuserinfo()
    })

//    提交修改
tii()
  function tii(){
    $('#postuser').on('submit',function(e){
        e.preventDefault()
        $.ajax({
              method: 'POST',
              url:'/my/userinfo',
              data: $(this).serialize(),
              success:function(res){
                 if(res.status !==0) return console.log(res.message);
                 window.parent.getuserinfo()
                 layer.msg(res.message)
                 
              }
        })
    })
  }




})