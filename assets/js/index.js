$(function(){
    getuserinfo()
    // 获取用户的基本信息
       
    //   退出管理系统 清除 token
  $('#out').on('click',function(e) {
      localStorage.removeItem('token')
      e.preventDefault()
      location.href="/login.html"
  })
})
   
function getuserinfo(){
  $.ajax({
      type: "GET",
      url: "/my/userinfo",             
      success: function(res){
        console.log(res);
          if( res.status !== 0) return console.log(res.message);
          let uname =res.data.nickname || res.data.nickname
          if(res.data.username) $('.welcome').html('欢迎'+ uname)
           if(res.data.user_pic == null) {
            $('.layui-nav-img').hide()
            let textimg = uname[0].toUpperCase()
            $('.text-img').html(textimg).show()
           }  
           else  {
            $('.layui-nav-img').attr('src',res.data.user_pic).show()
            $('.text-img').hide()
           }  
               
      }

    //    如果在没权限的状态下登录 会强制回到登录页面
      
  })
} 