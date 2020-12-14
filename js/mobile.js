/*
 * @Author: wxp
 * @Date: 2020-10-11 10:33:32
 * @LastEditTime: 2020-12-14 21:58:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webMap/js/index.js
 */

// 图层切换
var TOOL = $('.tool')
// 图层切换展示
let TOOLFLAG = false
let TOOLCOLOR = 0
let layerlist_phone = [] // 标注集合

let icon = './img/building_marker_normal.png'
BM.Config.HTTP_URL = 'http://49.232.203.212:9000';
var map = BM.map('map', 'bigemap.googlemapen-satellite', { center: [45.7521, 131.0256], zoom: 13, zoomControl: false, attributionControl: false });

var google_satellite = BM.tileLayer('bigemap.googlemap-satellite');
google_satellite.addTo(map);
var google_street = BM.tileLayer('bigemap.googlemap-streets');
$('#satellite').on('click', function () {
    google_satellite.addTo(map);
    google_street.remove(map);
    $(this).addClass("toolitemActive")
    $('#street').removeClass("toolitemActive")
    TOOLCOLOR = 0
    setTimeout(() => {
        TOOL.css({
            left: '1rem',
        })
        if (!$('.operation_btn_active')) return
        $('.operation_btn_active').hasClass('operation_btn_active_b') ? $('.operation_btn_active').removeClass('operation_btn_active_b').addClass('operation_btn_active_f') : $('.operation_btn_active').addClass('operation_btn_active_f')
    }, 100);
})

$('#street').on('click', function () {
    $(this).addClass("toolitemActive")
    $('#satellite').removeClass("toolitemActive")
    TOOLCOLOR = 1
    setTimeout(() => {
        TOOL.css({
            left: '1rem',
        })
        if (!$('.operation_btn_active')) return
        $('.operation_btn_active').hasClass('operation_btn_active_f') ? $('.operation_btn_active').removeClass('operation_btn_active_f').addClass('operation_btn_active_b') : $('.operation_btn_active').addClass('operation_btn_active_b')
    }, 100);
    google_satellite.remove(map);
    google_street.addTo(map);
})

$('.toolcontent').on('click', function () {
    TOOLFLAG ? TOOL.css({
        left: '1rem',
    }) :
        TOOL.css({
            left: '-0.7rem',
        })
    TOOLFLAG = !TOOLFLAG
})

$('.add').on('click', function () {
    map.zoomIn();
})

$('.sub').on('click', function () {
    map.zoomOut();
})

// ------------点击图标功能-------------------
function shadowChange(ele) {
    $('.seachContent').show()
    let len = $('.operation-btn').length
    for (var i = 0; i < len; i++) {
        $('.operation-btn').eq(i).removeClass('operation_btn_active_f').removeClass('operation_btn_active_b').removeClass('operation_btn_active')
    }
    if (TOOLCOLOR === 0) {
        ele.addClass('operation_btn_active_f').addClass('operation_btn_active')
    } else {
        ele.addClass('operation_btn_active_b').addClass('operation_btn_active')
    }

}
// 搜索更多
let down = $('.moredown')
let up = $('.moreup')
let screen = $('.screen')
up.hide()
$('.moredown').on('click', function () {
    $(this).hide()
    up.show()
    screen.show()
})
$('.moreup').on('click', function () {
    $(this).hide()
    down.show()
    screen.hide()
})

let ADRESSLIST; // 区县下拉数据
let operationType; // 经营type
// 深拷贝
function ADRESSLISTCHECK(data) {
    data.forEach(key => {
        key.value = key.code
        key.text = key.name + `(${key.num})`
        if (key.children) {
            ADRESSLISTCHECK(key.children)
        }
    })
    return data
}

$('.screen_quxian').on('click', function () {
    let data = ADRESSLISTCHECK(ADRESSLIST)
    let picker = new mui.PopPicker({
        layer: 2
    });
    picker.setData(data)
    picker.pickers[0].setSelectedIndex(1);
    picker.pickers[1].setSelectedIndex(1);
    picker.show(function (SelectedItem) {
        if (!SelectedItem.length) return
        $('.screen_quxian').val(SelectedItem[0].name + '/' + SelectedItem[1].name)
        $('.screen_shequ').val(undefined)
        getlevel2_phone(SelectedItem[1])
    })
})

let SHLIST; // 商户list 生成准备
let SQLIST; // 社区list 下拉数据
function getlevel2_phone(obj) {
    const data = { code: obj.code, operationType: operationType }
    $.ajax({
        //请求方式
        type: "POST",
        //请求的媒体类型
        // contentType: "application/json;charset=UTF-8",
        //请求地址
        url: "/front/merchant/street",
        //数据，json字符串
        data: data,
        //请求成功
        success: function (result) {
            if (result.code === 200) {
                SHLIST = []
                SQLIST = []
                result.data.forEach(element => {
                    // if (type === false) {
                    if (element.type === 1) {
                        if (element.address) {
                            element.address = null
                        }
                        element.text = element.name
                        element.value = element.code
                        SQLIST.push(element)
                    } else {
                        if (element.address) {
                            element.address = null
                        }
                        let color
                        if (element.operationStatus === 'a') {
                            color = '#92D050'
                        } else if (element.operationStatus === 'b') {
                            color = '#9CC3E6'
                        } else if (element.operationStatus === 'c') {
                            color = '#FFC000'
                        } else if (element.operationStatus === 'd') {
                            color = '#FF0000'
                        }
                        SHLIST.push(SHLIST)

                        if (element.latitude && element.longitude) {
                            let layer = BM.marker([element.latitude, element.longitude], { icon: BM.icon({ iconUrl: icon }), alt: JSON.stringify({ ...element, type: 'bui' }) }).addTo(map)
                                .on('click', function (e) {
                                    layerlist_phone.forEach((element, i) => {
                                        if (element._tooltip) {
                                            element.unbindTooltip()
                                        }
                                    });
                                    // 获取星系信息
                                    // getShInfo(e.target.options.alt)
                                    this.bindTooltip(element.name || element.roundName, { permanent: true, opacity: 1, direction: 'bottom' }).openTooltip();
                                })
                            layerlist_phone.forEach((element, i) => {
                                if (element._tooltip) {
                                    element.unbindTooltip()
                                }
                            });
                            layerlist_phone.push(layer)
                        }

                    }
                });
                $('.screen_shequ').show()

            } else {
                mui.toast(result.msg || '未获取到信息，请稍后再试！', { duration: 'long', type: 'div' })
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 选择社区
$('.screen_shequ').on('click', function () {
    let picker = new mui.PopPicker();
    picker.setData(SQLIST)
    picker.pickers[0].setSelectedIndex(1);
    picker.show(function (SelectedItem) {
        console.log(SelectedItem);
        if (!SelectedItem.length) return
        $('.screen_shequ').val(SelectedItem[0].name)
        getlevel3_phone(SelectedItem[0])
    })
})

function getlevel3_phone(obj) {
    const data = { code: obj.code, operationType: operationType }
    $.ajax({
        //请求方式
        type: "POST",
        //请求的媒体类型
        // contentType: "application/json;charset=UTF-8",
        //请求地址
        url: "/front/merchant/community",
        //数据，json字符串
        data: data,
        //请求成功
        success: function (result) {
            if (result.code === 200) {
                SHLIST = []
                result.data.forEach(element => {
                    let color
                    if (element.address) {
                        element.address = null
                    }
                    SHLIST.push(SHLIST)
                    // if (element.operationStatus  === 'a') {
                    // 	color = '#92D050'
                    // } else if (element.operationStatus  === 'b') {
                    // 	color = '#9CC3E6'
                    // } else if (element.operationStatus  === 'c') {
                    // 	color = '#FFC000'
                    // } else if (element.operationStatus  === 'd' ) {
                    // 	color = '#FF0000'
                    // }
                    if (element.latitude && element.longitude) {
                        let layer = BM.marker([element.latitude, element.longitude], { icon: BM.icon({ iconUrl: icon }), alt: JSON.stringify({ ...element, type: 'bui' }) }).addTo(map)
                            .on('click', function (e) {
                                layerlist_phone.forEach((element, i) => {
                                    if (element._tooltip) {
                                        element.unbindTooltip()
                                    }
                                });
                                
                                // getShInfo(e.target.options.alt)
                                this.bindTooltip(element.name || element.roundName, { permanent: true, opacity: 1, direction: 'bottom'}).openTooltip();
                            })
                        layerlist_phone.forEach((element, i) => {
                            if (element._tooltip) {
                                element.unbindTooltip()
                            }
                        });
                        layerlist_phone.push(layer)
                    }
                });
            } else {
                mui.toast(result.msg || '未获取到信息，请稍后再试！', { duration: 'long', type: 'div' })
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

// 商户正常
$('.btn-building').on('click', function () {
    shadowChange($(this))
    operationType = 1
    building_phone(1)
})

// 商户吊销
$('.btn-building1').on('click', function () {
    shadowChange($(this))
    operationType = 2
    building_phone(2)
})
// 商圈
$('.btn-businessDistrict').on('click', function () {
    shadowChange($(this))
    businessDistrict_phone()
})

// 运输户
$('.btn-yunshu').on('click', function () {
    shadowChange($(this))
    yunshuDistrict_phone()
})
// 网店
$('.btn-wangdian').on('click', function () {
    shadowChange($(this))
    wangdianDistrict_phone()
})

// 生产商家前两级选择
function building_phone(operationType) {
    if (layerlist_phone.length) {
        layerlist_phone.forEach(element => {
            element.remove()
        });
    }
    $.ajax({
        //请求方式
        type: "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url: "/front/merchant/district",
        //数据，json字符串
        data: { operationType: operationType },
        //请求成功
        success: function (result) {
            if (result.code === 200) {
                // console.log(result.data.root);
                ADRESSLIST = result.data.root

            } else {
                mui.toast(result.msg, { duration: 'long', type: 'div' })
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 商圈选择
function businessDistrict_phone() {
    if (layerlist_phone.length) {
        layerlist_phone.forEach(element => {
            element.remove()
        });
    }
    $.ajax({
        //请求方式
        type: "POST",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url: "/front/business/tree",
        //数据，json字符串
        // data : JSON.stringify(list),
        //请求成功
        success: function (result) {
            if (result.code === 200) {

                $('.tree').html(treebusinesscreat(result.data, 1));
            } else {
                alert(result.msg || '未获取到信息，请稍后再试！')
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 运输户选择
function yunshuDistrict_phone() {
    if (layerlist_phone.length) {
        layerlist_phone.forEach(element => {
            element.remove()
        });
    }
    $.ajax({
        //请求方式
        type: "POST",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url: "front/car/list",
        //数据，json字符串
        // data : JSON.stringify(list),
        //请求成功
        success: function (result) {
            if (result.code === 200) {
                console.log(result);
            } else {
                alert(result.msg || '未获取到信息，请稍后再试！')
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 网店选择
function wangdianDistrict_phone() {
    if (layerlist_phone.length) {
        layerlist_phone.forEach(element => {
            element.remove()
        });
    }
    $.ajax({
        //请求方式
        type: "POST",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url: "front/store/list",
        //数据，json字符串
        // data : JSON.stringify(list),
        //请求成功
        success: function (result) {
            if (result.code === 200) {
                console.log(result);
            } else {
                alert(result.msg || '未获取到信息，请稍后再试！')
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}