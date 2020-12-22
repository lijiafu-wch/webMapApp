/*
 * @Author: wxp
 * @Date: 2020-10-11 10:33:32
 * @LastEditTime: 2020-12-22 16:41:33
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
let active_sele = undefined // 下拉默认值
let active_sele_1 = undefined // 多级下拉默认值2
let icon = './img/building_marker_normal.png'
BM.Config.HTTP_URL = 'http://49.232.203.212:9000';
var map = BM.map('map', 'bigemap.googlemapen-satellite', { center: [45.7521, 131.0256], zoom: 13, zoomControl: false, attributionControl: false });

var google_satellite = BM.tileLayer('bigemap.googlemap-satellite');
google_satellite.addTo(map);
var google_street = BM.tileLayer('bigemap.googlemap-streets');
$('#satellite').on('click', function () {
    $('.nav_container').css('background-color', 'rgba(255, 255, 255, .6)')

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
    $('.nav_container').css('background-color', 'rgba(0, 0, 0, .6)')
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
    $('.loddingContent').show()
    const title = ele.attr('title')
    if ($('.seachContent').css('display') == 'block') {
        if ($('.seachContent').attr('title') === title) return
        $(".seachValue").val('')
        screen.hide()
        down.show()
        up.hide()
        $('.screen_quxian').val(undefined)
        $('.seach_item').hide()
        let str = ` <div class="lodding_info">请选择筛选条件</div>`
        $('.footInfoList ul').html(str)
        switch (title) {
            case '商户主体':
                $('.seach_shoping').show()
                break;
            case '吊/注销商户':
                $('.seach_shopend').show()

                break;
            case '便民商圈':
                $('.seach_business').show()

                break;
            case '运输户':
                $('.seach_yunshu').show()

                break;
            case '网店':
                $('.seach_wangdian').show()

                break;

            default:
                break;
        }
    }
    switch (title) {
        case '商户主体':
            $('.seach_shoping').show()
            $('.screen_shequ').hide()
            break;
        case '吊/注销商户':
            $('.seach_shopend').show()
            $('.screen_shequ').hide()

            break;
        case '便民商圈':
            $('.seach_business').show()
            // $('.seach_businessitem').hide()
            break;
        case '运输户':
            $('.seach_yunshu').show()

            break;
        case '网店':
            $('.seach_wangdian').show()

            break;

        default:
            break;
    }
    $('.seachContent').show()
    $('.seachContent').attr('title', title)
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
    $('.seachValue').val('')
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
// 处理商圈选择
function ADRESSLISTCHECK_SQ() {
    // console.log(ADRESSLIST);
    let arr = []
    let arr1 = []
    ADRESSLIST.forEach(key => {
        // key.value = key.roundId || key.countyCode
        // key.text = key.roundName || key.name + `(${key.num})`
        if (key.businessRounds) {
            arr1 = []
            key.businessRounds.forEach(ele => {
                arr1.push({ value: ele.roundId, name: ele.roundName, text: ele.roundName + `(${ele.num})` })
            });
        }
        arr.push({ value: key.countyCode, name: key.name, text: key.name + `(${key.num})`, children: arr1 })

    })
    console.log(arr);
    return arr
}

// 处理运输户 网店选择区县
function ADRESSLISTCHECK_QU(data) {
    let arr = []
    data.forEach(key => {
        arr.push({ value: key.countyCode, text: key.name + `(${key.num})`, name: key.name })
        key.value = key.countyCode
        key.text = key.name + `(${key.num})`
    })
    return arr
}

// 搜索
$(".seachValue").change(function () {
    let val = $(this).val().trim()
    if (!val) {
        mui.toast('请输入商家名称', { duration: 'long', type: 'div' })
        return
    }
    $('.screen_quxian').val('')
    $('.screen_shequ').val('')
    up.hide()
    screen.hide()
    down.show()
    $('.footInfoListTitlewdown').show()
    $('.footInfoListTitleup').hide()

    let str1 = `<div class="lodding_info"><img class="operation_img" src="./img/lodding.gif"></div>`
    $('.footInfoList ul').html(str1)
    if (layerlist_phone.length) {
        layerlist_phone.forEach(element => {
            element.remove()
        });
    }
    let data = {
        name: val,
        operationType: operationType
    }
    var url
    if (operationType === 1) {
        url = "/front/merchant/search"
    } else if (operationType === 2) {
        url = "/front/merchant/search"
    } else if (operationType === 3) {
        url = "/front/business/search"
    } else if (operationType === 4) {
        url = "/front/car/search"
    } else if (operationType === 5) {
        url = "/front/store/search"
    }
    $.ajax({
        //请求方式
        type: "POST",
        //请求的媒体类型
        // contentType: "application/json;charset=UTF-8",
        //请求地址
        url: url,
        //数据，json字符串
        data: data,
        //请求成功
        success: function (result) {
            if (result.code === 200) {
                if (result.data.length < 1) {
                    let str = ` <div class="lodding_info">暂无内容</div>`
                    $('.footInfoList ul').html(str)
                    $('.footInfoList').css({
                        bottom: '0',
                    })
                    return
                }
                let strs = ''
                result.data.forEach(element => {
                    let color;
                    if (element.operationStatus === 'a') {
                        color = '#92D050'
                    } else if (element.operationStatus === 'b') {
                        color = '#9CC3E6'
                    } else if (element.operationStatus === 'c') {
                        color = '#FFC000'
                    } else if (element.operationStatus === 'd') {
                        color = '#FF0000'
                    }
                    strs += `<li class="InfoItem">
                <span class="shopName" data-info='${JSON.stringify(element)}'  style="color:${color}">${element.name}</span><img class="iconTpye moreInfo" data-info='${JSON.stringify(element)}' src="${icon}" alt="">
              </li>`
                    if (element.latitude && element.longitude) {
                        let layer = BM.marker([element.latitude, element.longitude], { icon: BM.icon({ iconUrl: icon }), alt: JSON.stringify({ ...element, type: 'bui' }) }).addTo(map)
                            .on('click', function (e) {
                                layerlist_phone.forEach((element, i) => {
                                    if (element._tooltip) {
                                        element.unbindTooltip()
                                    }
                                });
                                getShInfo(e.target.options.alt)
                                this.bindTooltip(element.name || element.roundName, { permanent: true, opacity: 1, direction: 'bottom' }).openTooltip();
                            })
                        layerlist_phone.forEach((element, i) => {
                            if (element._tooltip) {
                                element.unbindTooltip()
                            }
                        });
                        layerlist_phone.push(layer)
                    }
                });
                $('.footInfoList ul').html(strs)
                $('.footInfoList').css({
                    bottom: '0',
                })
            } else {
                mui.toast('未获取到信息，请稍后再试', { duration: 'long', type: 'div' })
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});


$('.screen_quxian_shop').on('click', function () {
    let data = ADRESSLISTCHECK(ADRESSLIST)
    let picker = new mui.PopPicker({
        layer: 2
    });
    picker.setData(data)
    active_sele ? picker.pickers[0].setSelectedValue(active_sele) : picker.pickers[0].setSelectedIndex(1)
    setTimeout(function () {
        active_sele_1 ? picker.pickers[1].setSelectedValue(active_sele_1) : picker.pickers[1].setSelectedIndex(1)
    }, 100)
    // picker.pickers[1].setSelectedIndex(1);
    // setSelectedValue
    picker.show(function (SelectedItem) {
        if (!SelectedItem.length) return
        active_sele = SelectedItem[0].value
        active_sele_1 = SelectedItem[1].value
        console.log(active_sele, active_sele_1);
        let str = `<div class="lodding_info"><img class="operation_img" src="./img/lodding.gif"></div>`
        $('.footInfoList ul').html(str)
        $('.screen_quxian_shop').val(SelectedItem[0].name + '/' + SelectedItem[1].name)
        $('.screen_shequ').val(undefined)
        getlevel2_phone(SelectedItem[1])
        picker.dispose()
    })
})

$('.screen_quxian_business').on('click', function () {
    let data = ADRESSLISTCHECK_SQ()
    let picker = new mui.PopPicker({
        layer: 2
    });
    picker.setData(data)
    active_sele ? picker.pickers[0].setSelectedValue(active_sele) : picker.pickers[0].setSelectedIndex(0)
    setTimeout(function () {
        active_sele_1 ? picker.pickers[1].setSelectedValue(active_sele_1) : picker.pickers[1].setSelectedIndex(0)
    }, 100)
    picker.show(function (SelectedItem) {
        if (!SelectedItem.length) return
        let str = `<div class="lodding_info"><img class="operation_img" src="./img/lodding.gif"></div>`
        $('.footInfoList ul').html(str)
        active_sele = SelectedItem[0].value
        active_sele_1 = SelectedItem[1].value
        $('.screen_quxian_business').val(SelectedItem[0].name + (SelectedItem[1].name ? '/' + SelectedItem[1].name : ''))
        businessRounds_list_set(SelectedItem[1].value || '')
        picker.dispose()

    })
})
function businessRounds_list_set(val) {
    // console.log(val);
    let data = [];
    ADRESSLIST.forEach(element => {
        element.businessRounds.forEach(ele => {
            if (ele.roundId == val) {
                data.push({ id: ele.roundId, name: ele.roundName, type: 'bus', ...ele })
                data.push(...ele.merchantList)
            }
        });
    });
    SHLIST = []
    SQLIST = []
    data.forEach((element, i) => {
        if (element.address) {
            element.address = element.address.trim()
        }
        SHLIST.push(element)
        if (element.latitude && element.longitude) {
            let layer = BM.marker([element.latitude, element.longitude], { icon: BM.icon({ iconUrl: i == 0 ? './img/business_marker_normal.png' : icon }), alt: JSON.stringify({ ...element }) }).addTo(map)
                .on('click', function (e) {
                    layerlist_phone.forEach((element, i) => {
                        if (element._tooltip) {
                            element.unbindTooltip()
                        }
                    });
                    $('.footInfoContext').css({
                        bottom: '0',
                    })
                    // 获取星系信息
                    getShInfo(e.target.options.alt)
                    this.bindTooltip(element.name || element.roundName, { permanent: true, opacity: 1, direction: 'bottom' }).openTooltip();
                })
            layerlist_phone.forEach((element, i) => {
                if (element._tooltip) {
                    element.unbindTooltip()
                }
            });
            layerlist_phone.push(layer)
        }
    });
    footInfoList(SHLIST)

}

$('.screen_quxian_yunshu').on('click', function () {
    let data = ADRESSLISTCHECK_QU(ADRESSLIST)
    let picker = new mui.PopPicker();
    picker.setData(data)
    // picker.pickers[0].setSelectedIndex(1);
    active_sele ? picker.pickers[0].setSelectedValue(active_sele) : picker.pickers[0].setSelectedIndex(1)

    picker.show(function (SelectedItem) {
        if (!SelectedItem.length) return
        let str = `<div class="lodding_info"><img class="operation_img" src="./img/lodding.gif"></div>`
        $('.footInfoList ul').html(str)
        active_sele = SelectedItem[0].value

        $('.screen_quxian_yunshu').val(SelectedItem[0].name)
        wangdian_yunshu_list_set(SelectedItem[0].value)
        picker.dispose()

    })
})


$('.screen_quxian_wangdian').on('click', function () {
    let data = ADRESSLISTCHECK_QU(ADRESSLIST)
    let picker = new mui.PopPicker();
    picker.setData(data)
    // picker.pickers[0].setSelectedIndex(1);
    active_sele ? picker.pickers[0].setSelectedValue(active_sele) : picker.pickers[0].setSelectedIndex(1)

    picker.show(function (SelectedItem) {
        if (!SelectedItem.length) return
        active_sele = SelectedItem[0].value
        let str = `<div class="lodding_info"><img class="operation_img" src="./img/lodding.gif"></div>`
        $('.footInfoList ul').html(str)
        $('.screen_quxian_wangdian').val(SelectedItem[0].name)
        wangdian_yunshu_list_set(SelectedItem[0].value)
        picker.dispose()

    })
})

function wangdian_yunshu_list_set(val) {
    let data = [];
    ADRESSLIST.forEach(element => {
        if (element.countyCode == val) {
            data = element.merchantList
        }
    });
    SHLIST = []
    SQLIST = []
    console.log(2);
    data.forEach(element => {
        if (element.address) {
            element.address = element.address.trim()
        }
        SHLIST.push(element)
        if (element.latitude && element.longitude) {
            let layer = BM.marker([element.latitude, element.longitude], { icon: BM.icon({ iconUrl: icon }), alt: JSON.stringify({ ...element, type: 'bui' }) }).addTo(map)
                .on('click', function (e) {
                    layerlist_phone.forEach((element, i) => {
                        if (element._tooltip) {
                            element.unbindTooltip()
                        }
                    });
                    $('.footInfoContext').css({
                        bottom: '0',
                    })
                    // 获取星系信息
                    getShInfo(e.target.options.alt)
                    this.bindTooltip(element.name || element.roundName, { permanent: true, opacity: 1, direction: 'bottom' }).openTooltip();
                })
            layerlist_phone.forEach((element, i) => {
                if (element._tooltip) {
                    element.unbindTooltip()
                }
            });
            layerlist_phone.push(layer)
        }
    });
    footInfoList(SHLIST)

    // if (SHLIST && SHLIST.length) {
    //     footInfoList(SHLIST)
    // } else {
    //     let str = ` <div class="lodding_info">暂无内容</div>`
    //     $('.footInfoList ul').html(str)
    //     $('.footInfoList').css({
    //         bottom: '0',
    //     })
    // }
}

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
                        // if (element.address) {
                        //     element.address = element.address.trim()
                        // }
                        element.text = element.name
                        element.value = element.code
                        SQLIST.push(element)
                        footInfoList(undefined)
                        // let str = ` <div class="lodding_info">暂无内容</div>`
                        // $('.footInfoList ul').html(str)
                    } else {
                        if (element.address) {
                            element.address = element.address.trim()
                        }
                        SHLIST.push(element)

                        if (element.latitude && element.longitude) {
                            let layer = BM.marker([element.latitude, element.longitude], { icon: BM.icon({ iconUrl: icon }), alt: JSON.stringify({ ...element, type: 'bui' }) }).addTo(map)
                                .on('click', function (e) {
                                    layerlist_phone.forEach((element, i) => {
                                        if (element._tooltip) {
                                            element.unbindTooltip()
                                        }
                                    });
                                    $('.footInfoContext').css({
                                        bottom: '0',
                                    })
                                    // 获取星系信息
                                    getShInfo(e.target.options.alt)
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
                // if (SHLIST && SHLIST.length) {
                footInfoList(SHLIST)
                // }
                if (SQLIST && SQLIST.length) {
                    $('.screen_shequ').show()
                }
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
        if (!SelectedItem.length) return
        let str = `<div class="lodding_info"><img class="operation_img" src="./img/lodding.gif"></div>`
        $('.footInfoList ul').html(str)
        $('.screen_shequ').val(SelectedItem[0].name)
        getlevel3_phone(SelectedItem[0])
        down.show()
        up.hide()
        screen.hide()
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
                        element.address = element.address.trim()
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
                                $('.footInfoContext').css({
                                    bottom: '0',
                                })
                                getShInfo(e.target.options.alt)
                                this.bindTooltip(element.name || element.roundName, { permanent: true, opacity: 1, direction: 'bottom' }).openTooltip();
                            })
                        layerlist_phone.forEach((element, i) => {
                            if (element._tooltip) {
                                element.unbindTooltip()
                            }
                        });
                        layerlist_phone.push(layer)
                    }
                });
                footInfoList(result.data)
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

// 打开详细信息列表
function footInfoList(info) {
    $('.footInfoListTitlewdown').show()
    $('.footInfoListTitleup').hide()
    if (info && info.length) {
        let str = ''
        info.forEach(element => {
            let color;
            if (element.operationStatus === 'a') {
                color = '#92D050'
            } else if (element.operationStatus === 'b') {
                color = '#9CC3E6'
            } else if (element.operationStatus === 'c') {
                color = '#FFC000'
            } else if (element.operationStatus === 'd') {
                color = '#FF0000'
            } else {
                color = '#444'
            }
            str += `<li class="InfoItem">
            <span class="shopName" data-info='${JSON.stringify(element)}' style="color:${color}">${element.name}</span><img class="iconTpye moreInfo" data-info='${JSON.stringify(element)}' src="${element.type === 'bus' ? './img/business_marker_normal.png' : icon}" alt="">
          </li>`
        });
        $('.footInfoList ul').html(str)
    } else {
        let str = ` <div class="lodding_info">暂无内容</div>`
        $('.footInfoList ul').html(str)
    }
    $('.footInfoList').css({
        bottom: '0',
    })
}


$('.footInfoList').on('click', '.shopName', function () {
    if (!$(this).attr('data-info')) return
    let icon
    let str = $(this).attr('data-info')
    let obj = JSON.parse(str)
    if (obj.type === 'bus') {
        icon = './img/business_marker_normal.png'
    } else {
        icon = './img/building_marker_normal.png'
    } 
    if (obj.latitude) {
        layerlist_phone.forEach((element, i) => {
            if (element._tooltip) {
                element.unbindTooltip()
            }
        });
        let layer = BM.marker([obj.latitude, obj.longitude], { icon: BM.icon({ iconUrl: icon }), alt: str }).addTo(map)
            .on('click', function (e) {
                if (obj.type === 'bus') {
                    getSqInfo(e.target.options.alt)
                } else {
                    getShInfo(e.target.options.alt)
                }
               
                layerlist_phone.forEach((element, i) => {
                    if (element._tooltip) {
                        element.unbindTooltip()
                    }
                });
                this.bindTooltip(obj.name || obj.roundName, { permanent: true, opacity: 1, direction: 'bottom' }).openTooltip();
                $('.footInfoContext').css({
                    bottom: '0',
                })
            })
        layer.bindTooltip(obj.name || obj.roundName, { permanent: false, opacity: 1, direction: 'bottom' }).openTooltip();
        if (map.getZoom() >= 15) {
            map.flyTo([obj.latitude, obj.longitude], map.getZoom());
        } else {
            map.flyTo([obj.latitude, obj.longitude], 15);
        }
        layerlist_phone.push(layer)
        $('.footInfoList').css({
            bottom: '-42%',
        })
        $('.footInfoListTitlewdown').hide()
        $('.footInfoListTitleup').show()
    } else {
        mui.toast('无法获取详细地址', { duration: 'long', type: 'div' })
    }
})

$('.footInfoListBody').on('click', '.moreInfo', function () {
    // console.log($(this).attr('data-info'))
    $('.footInfoContext').css({
        bottom: '0',
    })
    if (!$(this).attr('data-info')) return
    let str = `<div class="lodding_info"><img class="operation_img" src="./img/lodding.gif"></div>`
    $('.footInfoContextBody').html(str)
    let type = JSON.parse($(this).attr('data-info')).type
    if (type === 'bus') {
        getSqInfo($(this).attr('data-info'))
    } else {
        getShInfo($(this).attr('data-info'))
    }
})

// 关闭商户信息
$('.footInfoContextclose').on('click', function () {
    $('.footInfoContext').css({
        bottom: '-85%',
    })
    // getShInfo()
})
// 获取商圈明细
function getSqInfo(val) {
    const obj = JSON.parse(val)
    if (map.getZoom() >= 15) {
        map.flyTo([obj.latitude, obj.longitude], map.getZoom());
    } else {
        map.flyTo([obj.latitude, obj.longitude], 15);
    }
    $.ajax({
        //请求方式
        type: "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url: "/front/round/" + obj.roundId || obj.id,
        //数据，json字符串
        // data : JSON.stringify(list),
        //请求成功
        success: function (result) {
            if (result.code === 200) {
                const data = result.data
                let str1 = '';
                $('.footInfoContextName').text(obj.name)
                str1 += ` 
                <div class="new-detail-head">
                    <span class="new-detail-label">商圈名称:</span>
                    <span class="new-detail-field">${data.name || ''}</span>
                </div>
                
                <div class="new-detail-head">
				     <span class="new-detail-label">地址:</span>
				     <span class="storeLink new-detail-field">${data.address || ''}</span>
                 </div>
                 <div class="buidImgBOX">
						<img class="buidImg buidImg1" onerror="javascript:this.src='../images/nopic.png';" src="${data.picture || '../images/nopic.png'}" alt="">
					</div>
                 <div class="jj">
						<h3>介绍</h3>
						<div>${data.detail || '暂无介绍'}</div>
					</div>`
                $('.footInfoContextBody').html(str1)
            } else {
                let str = ` <div class="lodding_info">暂无内容</div>`
                $('.footInfoContextBody').html(str)
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 获取商户明细
function getShInfo(val) {
    const obj = JSON.parse(val)
    if (obj.latitude) {
        if (map.getZoom() >= 15) {
            map.flyTo([obj.latitude, obj.longitude], map.getZoom());
        } else {
            map.flyTo([obj.latitude, obj.longitude], 15);
        }
    }
    $.ajax({
        //请求方式
        type: "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url: "/front/merchant/" + obj.id,
        //请求成功
        success: function (result) {
            if (result.code === 200) {
                const data = result.data
                $('.footInfoContextName').text(obj.name)
                let str1 = '';
                if (data.name != 'hide') {
                    str1 += ` 
					<div class="new-detail-head">
						<span class="new-detail-label">名称:</span>
						<span class="new-detail-field">${data.name || ''}</span>
					</div>`
                }
                if (data.legalPerson != 'hide') {
                    str1 += ` 
				<div class="new-detail-head">
				    <span class="new-detail-label">法人代表:</span>
				    <span class="new-detail-field">${data.legalPerson || ''}</span>
				</div>`
                }
                if (data.address != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">地址:</span>
				     <span class="storeLink new-detail-field">${data.address || ''}</span>
				 </div>`
                }
                if (data.creditCode != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">统一社会信用代码: </span>
				     <span class="new-detail-field">${data.creditCode || ''}</span>
				 </div>`
                }
                if (data.outPhone != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">联系电话:</span>
				     <span class="new-detail-field">${data.outPhone || ''}</span>
				 </div>`
                }
                if (data.merchantDate != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">成立日期:</span>
				     <span class="new-detail-field">${data.merchantDate || ''}</span>
				 </div>`
                }
                if (data.firstBusinessCategoryName != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">行业分类:</span>
				     <span class="new-detail-field">${data.firstBusinessCategoryName || ''}</span>
				 </div>`
                }
                if (data.secondBusinessCategoryName != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">二级分类:</span>
				     <span class="new-detail-field">${data.secondBusinessCategoryName || ''}</span>
				 </div>`
                }
                if (data.workerNum != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">用工人数:</span>
				     <span class="new-detail-field">${data.workerNum || ''}</span>
				 </div>`
                }
                if (data.operationStatusName != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">经营状态:</span>
				     <span class="new-detail-field">${data.operationStatusName || ''}</span>
				 </div>`
                }
                if (data.specialStatusName != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">特殊状态:</span>
				     <span class="new-detail-field">${data.specialStatusName || ''}</span>
				 </div>`
                }
                if (data.standardNo != 'hide') {
                    str1 += `
				 <div class="new-detail-head">
				     <span class="new-detail-label">执行标准编号:</span>
				     <span class="new-detail-field">${data.standardNo || ''}</span>
				 </div>`
                }
                if (data.productName != 'hide') {
                    str1 += `
				<div class="new-detail-head">
				    <span class="new-detail-label">企业产品名称:</span>
				    <span class="new-detail-field">${data.productName || ''}</span>
				</div>`
                }
                if (data.operationRange != 'hide') {
                    str1 += `
				<div class="new-detail-head">
				    <span class="new-detail-label">经营范围:</span>
				    <span class="new-detail-field">${data.operationRange || ''}</span>
				</div>`
                }

                str1 += `
                <div class="new-detail-head">
                    <span class="new-detail-label">证书:</span>
                    <span class="new-detail-field" >${certificateList(data.certificateList)}</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">计量器具:</span>
                    <span class="new-detail-field" >${certificateList(data.measureApplianceList)}</span>
                </div>
                <div class="new-detail-head">
                    <span class="new-detail-label">商标:</span>
                    <span class="new-detail-field" >${certificateList(data.brandRegisterList)}</span>
                </div>
				`
                if (data.pictureOne != 'hide') {
                    str1 += `
					<div class="buidImgBOX">
						<img class="buidImg buidImg1"  src="${data.pictureOne || '../images/nopic.png'}" alt="">
						<img class="buidImg buidImg2"  src="${data.pictureTwo || ''}" alt="">
					</div>`
                }
                if (data.detail != 'hide') {
                    str1 += `
					<div class="jj">
						<h3>企业简介</h3>
						<div>${data.detail || '暂无简介'}</div>
					</div>
					`
                }
                $('.footInfoContextBody').html(str1)
            } else {
                let str = ` <div class="lodding_info">暂无内容</div>`
                $('.footInfoContextBody').html(str)
            }

        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

$('.footInfoContextBody').on('click', '.buidImg', function (e) {
    // const str = `<img class="bigPic" draggable="true"  src="${$(this).attr('src')}" alt="...">`
    $('.bigPic').attr('src', $(this).attr('src'))
    // $('.picturePanel').html(str)
    $('.pictureBox').show(1)
})

// var startleft = 0;
// var starttop = 0;

// $('.bigPic').draggable({
//     start: function () {
//         //为两个变量设置被拖动图片的初始坐标
//         startleft = $(this).offset().left;
//         starttop = $(this).offset().top;
//     },
//     stop: function () {
//         if ($(this).offset().left > $('.picturePanel').offset().left + $('.picturePanel').width() || $(this).offset().top > $('.picturePanel').offset().top + $('.picturePanel').height()) {
//             $('.pictureBox').hide()
//         }
//         else {
//             //复位
//             $(this).offset({
//                 left: startleft,
//                 top: starttop
//             })
//         }
//     }
// })
$('.pictureBox').on('click', '.bigPic', function (e) {
    $('.pictureBox').hide()
})

$('.footInfoContextBody').on('click', '.new-detail-field', function () {
    $(this).css({ 'white-space': 'initial', 'overflow': 'initial', 'text-overflow': 'initial' })
})

function certificateList(arr) {
    // arr = [{name: '食品经营许可证'}, {name: '特种设备人员登记证'}, {name: '医疗器械经营许可证'}]
    if (arr.length < 1) {
        return ''
    } else {
        let str = ''
        arr.forEach(element => {
            if (element.flag == true) {
                str += '<div style="color: red">' + element.cerName + '</div>'
            } else {
                str += '<div>' + element.cerName + '</div>'
            }
        });
        return str

    }
}

$('.footInfoListTitlewdown').on('click', function () {
    $(this).hide()
    $('.footInfoListTitleup').show()
    $('.footInfoList').css({
        bottom: '-56.5%',
    })
})

$('.footInfoListTitleup').on('click', function () {
    $(this).hide()
    $('.footInfoListTitlewdown').show()
    $('.footInfoList').css({
        bottom: '0',
    })
})

function btnStatus() {
    active_sele = undefined
    active_sele_1 = undefined
    let str = '';
    switch (operationType) {
        case 1:
            str = `<div class="colorItem">
            <span class="colorBox colorBox1"></span>
            <span class="colorName">正常营业</span>
        </div>
        <div class="colorItem">
            <span class="colorBox colorBox2"></span>
            <span class="colorName">无经营场所营业</span>
        </div>
        <div class="colorItem">
            <span class="colorBox colorBox3"></span>
            <span class="colorName">歇业</span>
        </div>`
            break;
        case 2:
            str = `
            <div class="colorItem">
            <span class="colorBox colorBox4"></span>
            <span class="colorName">吊销</span>
        </div>`
            break;
        case 3:
            str = `<div class="colorItem">
            <span class="colorBox colorBox1"></span>
            <span class="colorName">正常营业</span>
        </div>
        <div class="colorItem">
            <span class="colorBox colorBox2"></span>
            <span class="colorName">无经营场所营业</span>
        </div>
        <div class="colorItem">
            <span class="colorBox colorBox3"></span>
            <span class="colorName">歇业</span>
        </div>`
            break;
        case 4:
            str = `
            <div class="colorItem">
            <span class="colorBox colorBox1"></span>
            <span class="colorName">正常营业</span>
        </div>
        <div class="colorItem">
            <span class="colorBox colorBox3"></span>
            <span class="colorName">歇业</span>
        </div>
        <div class="colorItem">
            <span class="colorBox colorBox4"></span>
            <span class="colorName">吊销</span>
        </div> `
            break;
        case 5:
            str = `<div class="colorItem">
            <span class="colorBox colorBox1"></span>
            <span class="colorName">正常营业</span>
        </div>
        <div class="colorItem">
            <span class="colorBox colorBox3"></span>
            <span class="colorName">歇业</span>
        </div>
        <div class="colorItem">
            <span class="colorBox colorBox4"></span>
            <span class="colorName">吊销</span>
        </div> `
            break;

        default:
            break;
    }
    $('.colorContent').html(str)
}

// 商户正常
$('.btn-building').on('click', function () {
    shadowChange($(this))
    operationType = 1
    building_phone(1, $(this))
    btnStatus()
})

// 商户吊销
$('.btn-building1').on('click', function () {
    shadowChange($(this))
    operationType = 2
    btnStatus()
    building_phone(2, $(this))
})
// 商圈
$('.btn-businessDistrict').on('click', function () {
    shadowChange($(this))
    businessDistrict_phone($(this))
    operationType = 3
    btnStatus()
})

// 运输户
$('.btn-yunshu').on('click', function () {
    operationType = 4
    shadowChange($(this))
    yunshuDistrict_phone($(this))
    btnStatus()
})
// 网店
$('.btn-wangdian').on('click', function () {
    operationType = 5
    shadowChange($(this))
    wangdianDistrict_phone($(this))
    btnStatus()
})

// 生产商家前两级选择
function building_phone(operationType, ele) {
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
                $('.loddingContent').hide()
                // shadowChange(ele)
            } else {
                $('.loddingContent').hide()
                mui.toast(result.msg, { duration: 'long', type: 'div' })
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            $('.loddingContent').hide()
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 商圈选择
function businessDistrict_phone(ele) {
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
                ADRESSLIST = result.data
                // shadowChange(ele)
                $('.loddingContent').hide()
            } else {
                $('.loddingContent').hide()
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
// 运输户选择
function yunshuDistrict_phone(ele) {
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
                $('.loddingContent').hide()

                ADRESSLIST = result.data
                // shadowChange(ele)
            } else {
                $('.loddingContent').hide()

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
// 网店选择
function wangdianDistrict_phone(ele) {
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
                $('.loddingContent').hide()

                ADRESSLIST = result.data
                // shadowChange(ele)
            } else {
                $('.loddingContent').hide()

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