/*
 * @Author: your name
 * @Date: 2020-12-14 15:03:00
 * @LastEditTime: 2020-12-14 15:28:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webMapApp/js/sel.js
 */
//构造函数
function Cascader(id,data,fn){
    //把创建好的“联级选择器”插入到哪个元素内
    this.$box = $("#"+id);
    //data: 是要填充的数据
    this.init(data);
    
    //对外提供的接口函数
    this.clickHandle = fn || function(){};
    
    //最外层的容器,后期需要把createEl()方法创建的内容都插入到这里面的
    this.$wrap = null;
}

Cascader.prototype = {
    constructor: Cascader,
    init: function(data){
        var This = this;
        this.$wrap = $("<div class='cascader-menus'></div>")
        //创建里面的元素
        this.createEl(data,function($ul){
            This.$wrap.append($ul);
            This.$box.append(This.$wrap)
        });
        console.log(data)
    },
    createEl: function(data,fn) {
        var This = this;
        //创建完成以后回调函数
        var fn = fn || function(){};
        var $ul = $("<ul class='menus'></ul>");
        
        //创建li，并把li插入到ul中
        for (var i=0;i<data.length;i++) {
            var $li = $("<li>"+ data[i].label +"</li>");
            //给每一个Li加点击事件，点击以后显示子菜单,这里最好采用闭包的形式，不然i传递不进去，当然也可以用es6的let（不过这里没有bable，浏览器会不支持let的，在vue-cli中的话就没问题了）
            (function(i){
                $li.click(function(){
                    $(this).addClass('active').siblings().removeClass('active');
                    //先需要清除掉后面所有的菜单
                    $ul.nextAll().remove();
                    if (data[i].children && data[i].children.length) {
                        //创建子菜单
                        This.createEl(data[i].children,function(ul){
                            //把创建好的子菜单插入到上一个菜单的后面
                            $ul.after(ul);
                        });
                    }
                    //对外提供的点击接口函数，并把数据给传递出去
                    This.clickHandle(data[i]);
                })
            })(i)
            $ul.append($li);
        }
        
        //创建完成以后回调函数
        fn($ul)
    }
}