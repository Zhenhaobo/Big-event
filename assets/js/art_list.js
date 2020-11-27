$(function () {
    let layer = layui.layer
    let form = layui.form
    //   事件过滤器
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data);
        let y = dt.getFullYear();
        let m = lv(dt.getMonth() + 1);
        let d = lv(dt.getDate());
        let h = lv(dt.getHours());
        let s = lv(dt.getSeconds());
        let mm = lv(dt.getMinutes());
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
    }
    function lv(n) {
        return n > 9 ? n : '0' + n;
    }
    //  获取文章列表列表 
    let q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页几行数据
        cate_id: '', //id
        state: '',   //状态
    }
    gittextlist()
    function gittextlist() {
        //    获取数据
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message)
                // 模板引擎渲染数据
                console.log(res);
                let strtemp = template('template-one', res)
                $('tbody').html(strtemp)
                fenyeqi(res.total)
            }
        })
    }
    // 渲染文章分类筛选下拉框
    select()
    function select() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                let strteplist = template('teplist', res)
                $('#city').html(strteplist)
                form.render()
            }

        })
    }
    // 筛选框选择

    $('#form-check').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name="cate_id"]').val()
        q.state = $('[name="state"]').val()
        console.log(q.cate_id);
        console.log(q.state);
        gittextlist()
    })


    //  渲染分页器
    function fenyeqi(total) {
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'limits', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 4, 5],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    gittextlist()
                }
            }
        });

    }
    // 删除功能的实现
    $('body').on('click', '.delbtn', function (e) {
        e.preventDefault();
       
        let len = $('.delbtn').length;
        console.log(len);
        let id = $(this).attr('laygg');
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message);
                    layer.msg(res.message)
                   if(len ===1){
                       q.pagenum==1? q.pagenum:q.pagenum-1
                       gittextlist()

                   }

                }
            })
            layer.close(index);

        })
    })
})