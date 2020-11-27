$(function(){ 
//    获取文章列表
let form = layui.form
let layer = layui.layer
getartlist()
  function getartlist() {
      $.ajax({
         method: "GET",
         url: "/my/article/cates",
         success: function(res) {
            console.log(res);
            if(res.status !==0) return console.log(res.message);
             let strlist = template('make',res)
             $('#tbodys').html(strlist);
         }
      })
  }
   // 文章类别弹出层

   let indexadd = null
     $('#addbtn').on('click', function(e) {
        e.preventDefault();
      //   let strcontent = template('form_make',)
       indexadd= layer.open({
            type:1,
            title: '添加文章分类',
            content:$('#form_make').html(),
            area:['500px','250px']
         })
     })
   //   把添加的文章放到列表中
    $('body').on('submit','#formtext', function (e) {
       e.preventDefault();
       $.ajax({
         method:'POST',
         url:'/my/article/addcates',
         data:$(this).serialize(),
         success:function (res) {
            if(res.status !==0) return layer.msg('文件上传失败');
             layer.msg('文件上传成功')
             layer.close(indexadd)
             getartlist()
             
         }

        })
    })
   //  修改文章弹出层 表单

   $('body').on('click','#compile',function(e){
         e.preventDefault();
         let id = $(this).attr('data-id');
         indexadd= layer.open({
            type:1,
            title: '修改文章名称',
            content:$('#form_maketwo').html(),
            area:['500px','250px']
         })
         $.ajax({
            method:'GET', 
            url:'/my/article/cates/'+id,
            success:function(res){
               if(res.status !==0) return layer.msg(res.message);
               form.val('formText',res.data)
               // layer.msg(res.message)
            }
         })
         
          
   })
   //  更新文章放到列表中
   $('body').on('submit','#formtext',function(event){
      event.preventDefault()
      $.ajax({
         method: 'POST',
         url:'/my/article/updatecate',
         data:$(this).serialize(),
         success: function(res) {
         if(res.status !== 0) return layer.msg(res.message);
         layer.msg(res.message);
         layer.close(indexadd)
         getartlist()
    }
   })
   })
      
   //  删除文章
   $('body').on('click','#delbtn',function(e){
      e.preventDefault();
      let id = $(this).attr('data-id')
      layer.confirm('是否确定删除?', {icon: 3, title:'提示'}, function(index){
         //do something      
         $.ajax({
            method:'GET', 
            url:'/my/article/deletecate/'+id,
            success:function(res){
               if(res.status !==0) return layer.msg('文件删除失败');
               layer.msg('文件删除成功')
               getartlist()
            }
         })
         layer.close(index);
       });
   })
      
}) 