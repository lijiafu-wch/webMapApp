/*
 * @Author: wxp
 * @Date: 2020-10-11 10:33:32
 * @LastEditTime: 2020-11-01 22:44:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webMap/js/index.js
 *//* @preserve
 * Bigemap 2.1.0+doc-translated.fa4f6f5, a JS library for interactive maps. http://bigemapjs.com
 * (c) 2018 BIGEMAP
 */

    BM.Config.HTTP_URL = 'http://map.qthscditu.com:9000';
	// 在ID为map的元素中实例化一个地图，不要设置地图ID，ID号程序自动生成，无需手动配置，并设置地图的投影为百度地图 ，中心点，默认的级别和显示级别控件
	var map = BM.map('map', 'bigemap.googlemapen-satellite', {center: [ 45.7521,131.0256], zoom: 12, zoomControl: false, attributionControl: false});
	//  var data = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[131.0107610753417,45.76845355691061],[131.00702207565482,45.7684025529816],[131.00501207572745,45.768374550987645],[131.00378607586205,45.768357549878935],[131.00243507634102,45.76833954859702],[131.002121076566,45.7683355480254],[131.0016270768913,45.76832854768111],[131.0010430768177,45.76832054718641],[131.0006890768653,45.768315546491024],[130.9984450766193,45.768284544649276],[130.9966650768132,45.768259542399434],[130.99460707721212,45.76823154030766],[130.98777307817792,45.76813753380484],[130.98755807812307,45.7681345333764],[130.9853690797476,45.77187666297088],[130.98785807933422,45.772175674551974],[130.9897900793603,45.776365821394855],[130.99167807960387,45.778969913742564],[130.9919350795138,45.77911991893142],[130.9919780798787,45.778161885150936],[130.99382407979274,45.778161886151516],[130.99386707961457,45.77904391696938],[130.99390907960625,45.77989794685954],[130.99539008215874,45.79263339199578],[130.99544408168092,45.792641392473506],[131.00710208120685,45.79532149252715],[131.0187110796391,45.79904462874772],[131.01878807959915,45.79893162445134],[131.01941407937048,45.79827160175269],[131.02093807873348,45.796292533754865],[131.023747078015,45.79232139649709],[131.02481807774868,45.7905603354839],[131.02624207648813,45.78764623507815],[131.02073307707434,45.78775123561577],[131.01507307805696,45.787790234146335],[131.0199660770586,45.78479813196178],[131.01962507650882,45.78419211060176],[131.01920307665037,45.78344208416803],[131.01848907665544,45.782172039643584],[131.0176010765486,45.78059298442183],[131.0215330756041,45.78038997909687],[131.02258507540355,45.78033597774746],[131.01790007538816,45.776096827660076],[131.01793707477765,45.773946752426944],[131.01796907509578,45.772068686768804],[131.0180290737845,45.76855356432189],[131.01426407506034,45.76850156037286],[131.0107610753417,45.76845355691061]]]},"properties":{"name":"桃北街道","stroke":"#ff0000","stroke-opacity":1,"fill-opacity":0}}]};
	//  var all=["#f7acbc","#deab8a","#817936","#444693","#ef5b9c","#fedcbd","#7f7522","#2b4490","#feeeed","#f47920","#80752c","#2a5caa","#f05b72","#905a3d","#87843b","#224b8f","#f15b6c","#8f4b2e","#726930","#003a6c","#f8aba6","#87481f","#454926","#102b6a","#f69c9f","#5f3c23","#2e3a1f","#426ab3","#f58f98","#6b473c","#4d4f36","#46485f","#ca8687","#faa755","#b7ba6b","#4e72b8","#f391a9","#fab27b","#b2d235","#181d4b","#bd6758","#f58220","#5c7a29","#1a2933","#d71345","#843900","#bed742","#121a2a","#d64f44","#905d1d","#7fb80e","#0c212b","#d93a49","#8a5d19","#a3cf62","#6a6da9","#b3424a","#8c531b","#769149","#585eaa","#c76968","#826858","#6d8346","#494e8f","#bb505d","#64492b","#78a355","#afb4db","#987165","#ae6642","#abc88b","#9b95c9","#ac6767","#56452d","#74905d","#6950a1","#973c3f","#96582a","#cde6c7","#6f60aa","#b22c46","#705628","#1d953f","#867892","#a7324a","#4a3113","#77ac98","#918597","#aa363d","#412f1f","#007d65","#6f6d85","#ed1941","#845538","#84bf96","#594c6d","#f26522","#8e7437","#45b97c","#694d9f","#d2553d","#69541b","#225a1f","#6f599c","#b4534b","#d5c59f","#367459","#8552a1","#ef4136","#cd9a5b","#007947","#543044","#c63c26","#cd9a5b","#40835e","#63434f","#f3715c","#b36d41","#2b6447","#7d5886","#a7573b","#df9464","#005831","#401c44","#aa2116","#b76f40","#006c54","#472d56","#b64533","#ad8b3d","#375830","#45224a","#b54334","#dea32c","#274d3d","#411445","#853f04","#d1923f","#375830","#4b2f3d","#840228","#c88400","#27342b","#402e4c","#7a1723","#c37e00","#65c294","#c77eb5","#a03939","#c37e00","#73b9a2","#ea66a6","#8a2e3b","#e0861a","#72baa7","#f173ac","#8e453f","#ffce7b","#005344","#fffffb","#8f4b4a","#fcaf17","#122e29","#fffef9","#892f1b","#ba8448","#293047","#f6f5ec","#6b2c25","#896a45","#00ae9d","#d9d6c3","#733a31","#76624c","#508a88","#d1c7b7","#54211d","#6d5826","#70a19f","#f2eada","#78331e","#ffc20e","#50b7c1","#d3d7d4","#53261f","#fdb933","#00a6ac","#999d9c","#f15a22","#d3c6a6","#78cdd1","#a1a3a6","#b4533c","#c7a252","#008792","#9d9087","#84331f","#dec674","#94d6da","#8a8c8e","#f47a55","#b69968","#afdfe4","#74787c","#f15a22","#c1a173","#5e7c85","#7c8577","#f3704b","#dbce8f","#76becc","#72777b","#da765b","#ffd400","#90d7ec","#77787b","#c85d44","#ffd400","#009ad6","#4f5555","#ae5039","#ffe600","#145b7d","#6c4c49","#6a3427","#f0dc70","#11264f","#563624","#8f4b38","#fcf16e","#7bbfea","#3e4145","#8e3e1f","#decb00","#33a3dc","#3c3645","#f36c21","#cbc547","#228fbd","#464547","#b4532a","#6e6b41","#2468a2","#130c0e","#b7704f","#596032","#2570a1","#281f1d","#de773f","#525f42","#2585a6","#2f271d","#c99979","#5f5d46","#1b315e","#1d1626"];
	//  BM.geoJSON(data,{
	//      style: function () {
	//          // return {color: 'white',fillColor:all[Math.floor(Math.random()*all.length)],weight:1,fillOpacity:0.9};
	// 		 return {color: 'white',fillColor:'#ff0000',weight:1,fillOpacity:0.3};
	//      },
	//      onEachFeature: function (feature,layer) {
	//          feature.properties&&feature.properties.name&&layer.bindTooltip(feature.properties.name,{direction:'bottom',className:'my_tooltip',permanent:true});
	//        layer.on('click', (e) => {
	//              alert("桃北街道");
	//          })
	// 	 }
	//  })
	//  .on('mouseover',function (e) {
	//      // e.layer.setStyle({color: 'white',fillColor:all[Math.floor(Math.random()*all.length)],weight:1,fillOpacity:0.9});
	//      e.layer.setStyle({color: 'white',fillColor:'#f7acbc',weight:1,fillOpacity:0.3});
	//  })
	//  .on('mouseout',function (e) {
	//      // e.layer.setStyle({color: 'white',fillColor:all[Math.floor(Math.random()*all.length)],weight:1,fillOpacity:0.9});
	//      e.layer.setStyle({color: 'white',fillColor:'#ff0000',weight:1,fillOpacity:0.3});
	//  })
	//  .addTo(map);


    var google_satellite=BM.tileLayer('bigemap.googlemap-satellite');
    google_satellite.addTo(map);
    var google_street=BM.tileLayer('bigemap.googlemap-streets');
    document.getElementById('satellite').addEventListener('click',function () {
        //先移除一个图层 ，再添加一个图层
        google_satellite.addTo(map);
        google_street.remove(map);
    });

    document.getElementById('street').addEventListener('click',function () {
        google_satellite.remove(map);
        google_street.addTo(map);
    });

// 街道划分
$('.btn-street').on('click', function () {
    alert(1)
})

// 社区划分
$('.btn-community').on('click', function () {
    alert(2)
})

// 学区划分
$('.btn-schoolDistrict').on('click', function () {
    alert(3)
})
var arr
var icon
// 商户主体
$('.btn-building').on('click', function () {
        $('.detail-content').hide()
        $('.treeSearch').show()
        building()
})
// 生产商家树前两级
function building () {
    if (layerlist.length) {
        layerlist.forEach(element => {
            element.remove()
        });
    }
    $.ajax({
        //请求方式
        type : "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "/front/merchant/district",
        //数据，json字符串
        // data : JSON.stringify(list),
        //请求成功
        success : function(result) {
            if (result.code === 200) {
                titleSet('商户主体')
                $('.tree').html(treecreat(result.data.root, true));
            } else {
                alert(result.msg || '未获取到信息，请稍后再试！')
            }
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

// $('.seachRest').on('click', function (e) {
//     if ($('.treeBoxtitle').html() === '商户主体') {
//      buildin()
//     } else if ($('.treeBoxtitle').html() === '便民商圈') {
//         businessDistrict()
//     }
// })
function businessDistrict () {
    if (layerlist.length) {
        layerlist.forEach(element => {
            element.remove()
        });
    }
    $.ajax({
        //请求方式
        type : "POST",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "/front/business/list",
        //数据，json字符串
        // data : JSON.stringify(list),
        //请求成功
        success : function(result) {
            if (result.code === 200) {
                titleSet('便民商圈')
                $('.tree').html(treebusinesscreat(result.data, true));
            } else {
                alert(result.msg || '未获取到信息，请稍后再试！')
            }
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 便民商圈
$('.btn-businessDistrict').on('click', function () {
        $('.detail-content').hide()
        $('.treeSearch').hide()
        businessDistrict()
})
// 设置左侧标题并显示
function titleSet (text) {
    if (text === '商户主体') {
        icon = './img/building_marker_normal.png'
    } else if (text === '便民商圈') {
        icon = './img/business_marker_normal.png'
    }
    $('.treeBox').show(1)
    $('.treeBoxtitle').html(text)
}

var layerlist = []
// 计算商户主体树
function getMerchantTree (data) {
    for (var i = 0; i < data.length; i++) {
        data[i].checked = false
        data[i].nocheck = false
        if (data[i].countyName) {
            data[i].name = data[i].countyName
        }
        if (data[i].num) {
            data[i].id = data[i].num
        }

        if (data[i].merchantList && data[i].merchantList.length) {
            data[i].open = true
            data[i].children = data[i].merchantList
            getMerchantTree(data[i].merchantList)
        }
    }
}
// 计算商圈体树
function getBusinessTree (data) {
    for (var i = 0; i < data.length; i++) {
        data[i].checked = false
        data[i].nocheck = false

        // if (data[i].latitude) {
        //     const layer = BM.marker([data[i].latitude,data[i].longitude],{icon:BM.icon({iconUrl:'http://map.dlzs.gov.cn:8080/zs_gis/PGIS/zs/images/markers/building_marker_normal.png'}), alt: JSON.stringify(data[i])}).addTo(map)
        //     .on('click', function(e) { 
        //         getShInfo(e.target.options.alt)
        //      })
        //      layerlist.push(layer)
        // }
        if (data[i].roundName) {
            data[i].name = data[i].roundName
        }
        if (data[i].roundId) {
            data[i].id = data[i].roundId
        }
        if (data[i].merchantList) {
            data[i].open = true
            data[i].type = 'Business'
            data[i].children = data[i].merchantList
            getBusinessTree(data[i].merchantList)
        }
    }
}
$('.showInfoLeftimg').on('click', function (e) {
    if ($(this).attr('pic1') && $(this).attr('pic2')) {
        const str = `<div id="carousel-example-generic" class="carousel slide pulspic" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        </ol>
        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
          <div class="item active">
            <img src="${ $(this).attr('pic1') }" alt="...">
          </div>
          <div class="item">
            <img src="${ $(this).attr('pic2') }" alt="...">
          </div>
        </div>
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
    </div>`
    // http://47.110.155.20:81/profile/upload/2020/10/14/5286928a05ee4b9482a8275f28f31745.png
    $('.picturePanel').html(str)
    $('.pictureBox').show(1)
    } else if ($(this).attr('pic1') || $(this).attr('pic2')) {
        const str = `<div id="carousel-example-generic" class="carousel slide pulspic" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        </ol>
        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
          <div class="item active">
            <img src="${ $(this).attr('pic1') || $(this).attr('pic2') }" alt="...">
          </div>
        </div>
        <!-- Controls -->
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
    </div>`
    $('.picturePanel').html(str)
    $('.pictureBox').show(1)
    }
})
$('.businessshowInfoLeftimg').on('click', function (e) {
    console.log(e);
    const str = `<img style="width: 500px;" src="${ $(this).attr('pic')  }" alt="...">`
    $('.picturePanel').html(str)
    $('.pictureBox').show(1)

})
function getShInfo (val) {
    const obj = JSON.parse(val)
    if (obj.latitude) {
        map.flyTo([obj.latitude, obj.longitude], 15);

    }
    $.ajax({
        //请求方式
        type : "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "/front/merchant/" + obj.id,
        //数据，json字符串
        // data : JSON.stringify(list),
        //请求成功
        success : function(result) {
            if (result.code === 200) {
               console.log(result.data)
               const data = result.data
               $('.showInfoLeftimg').attr('pic1', data.pictureOne || 'http://47.110.155.20:81/profile/upload/2020/10/14/5286928a05ee4b9482a8275f28f31745.png')
               $('.showInfoLeftimg').attr('pic2', data.pictureTwo)
               $('.showInfoLeftimg').html(`<img src="${ data.pictureOne || 'http://47.110.155.20:81/profile/upload/2020/10/14/5286928a05ee4b9482a8275f28f31745.png' }" οnerrοr="this.src='http://47.110.155.20:81/profile/upload/2020/10/14/5286928a05ee4b9482a8275f28f31745.png'"alt="">
               <img src="${ data.pictureTwo || 'http://47.110.155.20:81/profile/upload/2020/10/14/5286928a05ee4b9482a8275f28f31745.png' }" οnerrοr="this.src='http://47.110.155.20:81/profile/upload/2020/10/14/5286928a05ee4b9482a8275f28f31745.png'" alt="">`)
               $('#business1').hide()
               $('#building').show()
               
               $('.detail-content-title-text').text(obj.name)
                let str = `<div class="new-detail-head">
                    <span class="new-detail-label">名称:</span>
                    <span class="new-detail-field">${ data.name || '' }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">地址：</span>
                    <span class="new-detail-field">${ data.countyName || '' + data.streetName || '' + data.communityName || '' }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">同一社会信用代码:</span>
                    <span class="new-detail-field">${ data.creditCode || '' }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">联系电话：</span>
                    <span class="new-detail-field">${ data.outPhone || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">成立日期：</span>
                    <span class="new-detail-field">${ data.merchantDate || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">行业分类：</span>
                    <span class="new-detail-field">${ data.firstBusinessCategoryName || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">二级分类：</span>
                    <span class="new-detail-field">${ data.secondBusinessCategoryName || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">用工人数：</span>
                    <span class="new-detail-field">${ data.workerNum || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">经营状态：</span>
                    <span class="new-detail-field">${ data.operationStatusName || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">特殊状态：</span>
                    <span class="new-detail-field">${ data.specialStatusName || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">执行标准编号:</span>
                    <span class="new-detail-field">${ data.standardNo || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">企业产品名称:</span>
                    <span class="new-detail-field">${ data.productName || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">经营范围：</span>
                    <span class="new-detail-field">${ data.operationRange || ''  }</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">证书：</span>
                    <span class="new-detail-field" >${ certificateList(data.certificateList)  }</span>
                </div>
                </div>
                <div class="jj">
                    <h3>企业简介</h3>
                    <div>${ data.detail || '暂无简介'  }</div>
                </div>
                `
                $('.showInfoRight').html(str)
            } else {
                alert(result.msg)
            }
            
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function certificateList (arr) {
    // arr = [{name: '食品经营许可证'}, {name: '特种设备人员登记证'}, {name: '医疗器械经营许可证'}]
    if (arr.length < 1) {
        return ''
    } else {
        let str = ''
        arr.forEach(element => {
         str += '<div>' + element.cerName + '</div>'
        });
        return str

    }
}
// businessshowInfoLeftimgsrc

function getSqInfo (val) {
    const obj = JSON.parse(val)
    map.flyTo([obj.latitude, obj.longitude], 15);
    $.ajax({
        //请求方式
        type : "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "/front/round/" + obj.roundId || obj.id,
        //数据，json字符串
        // data : JSON.stringify(list),
        //请求成功
        success : function(result) {
            if (result.code === 200) {
               $('#building').hide()
                const data = result.data
               $('.businessshowInfoLeftimg').attr('pic', data.picture || 'http://47.110.155.20:81/profile/upload/2020/10/14/5286928a05ee4b9482a8275f28f31745.png')
                $('.businessshowInfoLeftimg').html(`<img class="businessshowInfoLeftimgsrc" src="${ data.picture || 'http://47.110.155.20:81/profile/upload/2020/10/14/5286928a05ee4b9482a8275f28f31745.png' }" alt="">`)
                $('.businesssshowInfoRight').html(`<div class="businessname">商圈名称： <span>${ data.name || '' }</span> </div>
						<div class="businessaddress">地址： <span>${ data.address || '' }</span></div>`)
                $('.business1detail').html(data.detal || '暂无介绍')
                $('#business1').show()
                $('.detail-content-title-text').text(obj.name)
            } else {
                alert(result.msg)
            }
            
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}


console.log(map.getZoom());
$('.grade').html(map.getZoom() + '级')
$('.add').on('click', function () {
    map.zoomIn();
console.log(map.getZoom());
$('.grade').html(map.getZoom() + '级')


})

$('.sub').on('click', function () {
    map.zoomOut();
console.log(map.getZoom());
$('.grade').html(map.getZoom() + '级')


})