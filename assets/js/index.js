$(function(){
    getuserinfo()
    // 获取用户的基本信息
      function getuserinfo(){
          $.ajax({
              type: "GET",
              url: "/my/userinfo",             
              success: function(res){
                  if( res.status !== 0) return console.log(res.message);
                   if(res.data.user_pic == null) {
                       $('.layui-nav-img').hide()
                   }else {
                    res.data.user_pic.attr('url',res.data.user_pic)
                   }
              },
            //    如果在没权限的状态下登录 会强制回到登录页面
              
          })
      }    
    //   退出管理系统 清除 token
  $('#out').on('click',function(e) {
      localStorage.removeItem('token')
      e.preventDefault()
      location.href="/login.html"
  })
  


})