
    let layer = layui.layer
     // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

//    把文件上传给到上传按钮中
     $('#shangchuan').on('click',function(e) {
         e.preventDefault()
         $('#filess').click()
     })
     // 更换图片
     $('#filess').on('change', function(e){
        e.preventDefault()
       let file = e.target.files
       if( file.length ===0) return layer.msg('请上传图片')
       let filesss = e.target.files[0]
       var newImgURL = URL.createObjectURL(filesss)
       $image
       .cropper('destroy')      // 销毁旧的裁剪区域
       .attr('src', newImgURL)  // 重新设置图片路径
       .cropper(options)        // 重新初始化裁剪区域
})
 $('#trues').on('click',function(e){
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
     })
     .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
     e.preventDefault()
     $.ajax({
         method: 'POST',
         url:'/my/update/avatar',
         data:{
            avatar:dataURL
         },
         success:function(res){
            if(res.status !==0) return layer.msg(res.message)
            window.parent.getuserinfo()
         }
     })

 })