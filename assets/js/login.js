$(function(){
    //    点击登录 显示或隐藏
     $('.rega').click(function(){
        $('.deng').hide()
        $('.zhuce').show()
     })
     $('.logina').click(function(){
        $('.deng').show()
        $('.zhuce').hide()
    })
    let form = layui.form
    let  layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,没空格'],
        repwd:function(value){
            let vals = $('#pwd_val').val()
            if(vals !=value){
                return '两次输入不一致!'
            }
        } 
    })
    //  注册页面监听
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        // 请求数据提交
        $.post('/api/reguser',{ username:$('#form_reg [name= username]').val(),
        password:$('#form_reg [name= password]').val() },function(res){
       if(res.status !==0) return layer.msg(res.message)
            layer.msg(res.message)
           setTimeout(function(){
            $('.logina').click()
           },1000)
        })
     })

    //    获取数据登录
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $(this).serialize()
        $.ajax({
            method: 'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success: function(res){
               if(res.status !==0) return layer.msg(res.message)
               layer.msg(res.message)
            //  将数据保存到本地存储中
               localStorage.setItem('token',res.token)
               location.href='/index.html'
            }
        })
    })
})