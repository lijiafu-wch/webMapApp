function treecreat(params, type) {
	console.log(type);
	if (type === true) {
		var str = '<ul>'
	} else {
		var str = '<ul style="display: none">'
	}
	params.forEach(element => {
		if (type === false) {
			str += '<li data-info=' + JSON.stringify({code: element.code, name: element.name, level: element.level}) + '><div class="three"><img class="checkThree" data-check="true" src="./img/checked.png" alt="">' + element.name + '<i>(' + element.num + ')</i><span class="unfold">+</span></div>'
		} else if (type === true && element.children.length === false) {
			str += '<li data-info=' + JSON.stringify({code: element.code, name: element.name, level: element.level}) + '><div class="first">' + element.name + '</div>'
		} else {
			str += '<li data-info=' + JSON.stringify({code: element.code, name: element.name, level: element.level}) + '><div class="tow">' + element.name + '<i>(' + element.num + ')</i> <span class="unfold">+</span></div>'
		}
	if (element.children && element.children != '') {
		str += treecreat(element.children, false);
	}
		str += '</li>';
	});
	str += '</ul>'
	return str
}

// 街道点击取消标点
$('.tree').on('click', '.checkThree', function () {
	let dom = $(this)
	if (dom.attr('data-check') === 'false') {
		dom.attr('data-check', 'true')
		dom.attr('src', './img/checked.png')
		dom.parent().parent().find('ul').find('.checkThree').attr('data-check', 'true')
		dom.parent().parent().find('ul').find('.checkThree').attr('src', './img/checked.png')
		let lidomlist = dom.parent().parent().find('.flexLi')
		if (lidomlist.length) {
			let lidomlistlen = lidomlist.length
			for (var i = 0; i < lidomlistlen; i++) {
				// console.log($(lidomlist[i]).find('.check').attr('data-check'), !$(lidomlist[i]).find('.check').attr('data-check'));
				if ($(lidomlist[i]).find('.check') && $(lidomlist[i]).find('.check').attr('data-check') === 'false') {
					$(lidomlist[i]).find('.check').attr('data-check', 'true')
					$(lidomlist[i]).find('.check').attr('src', './img/checked.png')
					var str = $(lidomlist[i]).attr('data-info')
					console.log(str);
					if (str.indexOf('latitude') < 0) return
					let obj = JSON.parse(str)
					if (obj.type === 'bui') {
						icon = './img/building_marker_normal.png'
					} else if (obj.type === 'bus') {
						icon = './img/business_marker_normal.png'
					} else if (obj.type === 'wd') {
						icon = './img/wangdianicon.png'
					} else if (obj.type === 'ys') {
						icon = './img/yunshuicon.png'
					}
					if (obj.latitude) {
							var layers = BM.marker([obj.latitude,obj.longitude],{icon:BM.icon({iconUrl: icon }), alt: str }).addTo(map)
							.on('click', function(e) { 
								layerlist.forEach((element, i) => {
									if (element._tooltip) {
										element.unbindTooltip()
									}
								});
				
								if (obj.type === 'bus') {
									console.log(e.target.options.alt);
									getSqInfo(e.target.options.alt)
								} else {
									getShInfo(e.target.options.alt)
								}
								this.bindTooltip(obj.name || obj.roundName, {permanent: true, opacity: 1, direction: 'bottom'}).openTooltip();
							})
							// map.flyTo([obj.latitude, obj.longitude], 15);
							if (map.getZoom() >= 15) {
								map.flyTo([obj.latitude, obj.longitude], map.getZoom());
							} else {
								map.flyTo([obj.latitude, obj.longitude], 15);
							}
							layerlist.push(layers)
					}
				
				}
			}
			
			
		}
		
	} else {
		dom.attr('data-check', 'false')
		dom.attr('src', './img/check.png')
		dom.parent().parent().find('ul').find('.checkThree').attr('data-check', 'false')
		dom.parent().parent().find('ul').find('.checkThree').attr('src', './img/check.png')
		let lidomlist = dom.parent().parent().find('.flexLi')
		if (lidomlist.length) {
			let lidomlistlen = lidomlist.length
			for (var i = 0; i < lidomlistlen; i++) {
				if ($(lidomlist[i]).find('.check') && $(lidomlist[i]).find('.check').attr('data-check')) {
					$(lidomlist[i]).find('.check').attr('data-check', 'false')
					$(lidomlist[i]).find('.check').attr('src', './img/check.png')
					var str = $(lidomlist[i]).attr('data-info')
					layerlist.forEach((element, i) => {
						if (element.getElement() && element.getElement().alt) {
							if (str=== element.getElement().alt) {
								element.remove()
								layerlist.splice(i, 1);
							}
						}
					});
				}
			}
			
			
		}
	}
}) 
function treebusinesscreat(params, type, icontypeform) {
	console.log(icontypeform);
	if (type === 1) {
		var str = '<ul>'
	} else {
		var str = '<ul class="ul" style="display: none">'
	}
	params.forEach(element => {
		let icon
		let icontype
		if (type === 1){
			str += '<li data-info=' + JSON.stringify({code: element.code, name: element.name, level: element.level}) + '><div>' + element.name + '<i>(' + element.num + ')</i> <span class="unfold">+</span></div>'
		} 
		if (type === 2) {
			icon = './img/business_marker_normal.png'
			str += '<li data-info=' + JSON.stringify({ roundId: element.roundId, roundName: element.roundName, latitude: element.latitude, longitude: element.longitude, type: 'bus' }) + ' class="besflexLi"><img class="check" data-check="false" src="./img/check.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname">' + element.roundName + '</span><i>(' + element.num + ')</i><span class="besunfold">+</span></li>'
		} 
		if (type === 3) {
			let color
			if (element.operationStatus  === 'a') {
				color = '#92D050'
			} else if (element.operationStatus  === 'b') {
				color = '#9CC3E6'
			} else if (element.operationStatus  === 'c') {
				color = '#FFC000'
			} else if (element.operationStatus  === 'd' ) {
				color = '#FF0000'
			}else {
				color = '#444'
			}
			console.log(3333);
			if (icontypeform === 'wd') {
				icon = './img/wangdianicon.png'
				icontype = 'wd'
			} else if (icontypeform === 'ys') {
				icon = './img/yunshuicon.png'
				icontype = 'ys'
			} else {
				icon = './img/building_marker_normal.png'
				icontype = 'bui'
			}
			str += '<li data-info=' + JSON.stringify({ id: element.id, name: element.name, latitude: element.latitude, longitude: element.longitude, type: icontype }) + ' class="besflexLi"><img class="check" data-check="false" src="./img/check.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname" style="color:' + color + '">' + element.name + '</span><img class="dressTrue"  src="' + (element.latitude && element.longitude ? './img/dress.png' : '') + '" alt=""></li>'
		} 
		if (element.merchantList && element.merchantList != '') {
			str += treebusinesscreat(element.merchantList, 3, icontypeform);
		}
		if (element.businessRounds && element.businessRounds != '') {
			str += treebusinesscreat(element.businessRounds, 2, icontypeform);
		}
		str += '</li>';
	});
	str += '</ul>'
	return str
}
var layer
$('.tree').on('click', '.unfold', function (e) {
	let obj = JSON.parse($(this).parent().parent().attr('data-info'))
	if ($(this).text() === '-') {
		$(this).parent().next().hide()
		$(this).text('+')
	} else {
		$(this).text('-')
		$(this).parent().next().show()
	}
	if ($(this).parent().parent().find('ul').length) return
	if (obj.level ===2) {
		// 获取商家  社区
		getlevel2(obj, $(this))
	} else {
		// 查看商家
		getlevel3(obj, $(this))
	}
})
// 展开商圈
$('.tree').on('click', '.besunfold', function (e) {
	let obj = JSON.parse($(this).parent().attr('data-info'))
	console.log($(this).parent().next().prop("className"));
	if ($(this).text() === '-') {
		console.log($(this).parent().next());
		if ($(this).parent().next().prop("className") === 'ul') {
			$(this).parent().next().hide()
		}
		$(this).text('+')
	} else {
		$(this).text('-')
		if ($(this).parent().next().prop("className") === 'ul') {
			$(this).parent().next().show()
		}
	}
})

// 商户主体查看 
$('.tree').on('click', '.buildingname', function (e) {
	let str = $(this).parent().attr('data-info')
	// if (str.indexOf('latitude') < 0) { 
	// 	alert('信息不全')
	// 	return 
	// }
		$(this).parent().find('.check').attr('data-check', 'true')
		$(this).parent().find('.check').attr('src', './img/checked.png')
		let obj = JSON.parse(str)
		if (obj.type === 'bus') {
			getSqInfo(str)
		} else {
			getShInfo(str)
		}
		if (obj.latitude) {
			if (obj.type === 'bui') {
				icon = './img/building_marker_normal.png'
			} else if (obj.type === 'bus') {
				icon = './img/business_marker_normal.png'
			} else if (obj.type === 'wd') {
				icon = './img/wangdianicon.png'
			} else if (obj.type === 'ys') {
				icon = './img/yunshuicon.png'
			}
			
			layer = BM.marker([obj.latitude,obj.longitude],{icon:BM.icon({iconUrl: icon }), alt: str }).addTo(map)
			.on('click', function(e) { 
				layerlist.forEach((element, i) => {
					if (element._tooltip) {
						element.unbindTooltip()
					}
				});

				if (obj.type === 'bus') {
					console.log(e.target.options.alt);
					getSqInfo(e.target.options.alt)
				} else {
					getShInfo(e.target.options.alt)
				}
				console.log(e);
				this.bindTooltip(obj.name || obj.roundName, {permanent: true, opacity: 1, direction: 'bottom'}).openTooltip();
			})
			layerlist.forEach((element, i) => {
				if (element._tooltip) {
					element.unbindTooltip()
				}
			});
			layer.bindTooltip(obj.name || obj.roundName, {permanent: true, opacity: 1, direction: 'bottom'}).openTooltip();
			// map.flyTo([obj.latitude, obj.longitude], 15);
			if (map.getZoom() >= 15) {
				map.flyTo([obj.latitude, obj.longitude], map.getZoom());
			} else {
				map.flyTo([obj.latitude, obj.longitude], 15);
			}
			layerlist.push(layer)
			// if (obj.type === 'bui') {
			// 	getShInfo(str)
			// } else {
			// 	getSqInfo(str)
			// }
			if (map.getZoom() >= 15) {
				map.flyTo([obj.latitude, obj.longitude], map.getZoom());
			} else {
				map.flyTo([obj.latitude, obj.longitude], 15);
			}
			// map.flyTo([obj.latitude, obj.longitude], 15);
		}
})

$('.tree').on('click', '.check', function (e) {
	if ($(this).attr('data-check') === 'false') {
		$(this).attr('data-check', 'true')
		$(this).attr('src', './img/checked.png')
		let str = $(this).parent().attr('data-info')
		if (str.indexOf('latitude') < 0) return
		let obj = JSON.parse(str)
		if (obj.type === 'bui') {
			icon = './img/building_marker_normal.png'
		} else if (obj.type === 'bus') {
			icon = './img/business_marker_normal.png'
		} else if (obj.type === 'wd') {
			icon = './img/wangdianicon.png'
		} else if (obj.type === 'ys') {
			icon = './img/yunshuicon.png'
		}
		if (obj.latitude) {
			layerlist.forEach((element, i) => {
				console.log(element, element._tooltip)
				if (element._tooltip) {
					element.unbindTooltip()
				}
			});
				layer = BM.marker([obj.latitude,obj.longitude],{icon:BM.icon({iconUrl: icon }), alt: str }).addTo(map)
				.on('click', function(e) { 
					if (obj.type === 'bus') {
						getSqInfo(e.target.options.alt)
					} else {
						getShInfo(e.target.options.alt)
					}
				})
				layer.bindTooltip(obj.name || obj.roundName, {permanent: false, opacity: 1, direction: 'bottom'}).openTooltip();
				// map.flyTo([obj.latitude, obj.longitude], 15);
				if (map.getZoom() >= 15) {
					map.flyTo([obj.latitude, obj.longitude], map.getZoom());
				} else {
					map.flyTo([obj.latitude, obj.longitude], 15);
				}
				layerlist.push(layer)
		}
	} else {
		$(this).attr('data-check', 'false')
		$(this).attr('src', './img/check.png')
		let str = $(this).parent().attr('data-info')
		console.log(layerlist);
		layerlist.forEach((element, i) => {
			console.log(element.getElement() && element.getElement().alt);
			if (element.getElement() && element.getElement().alt) {
				if (str === element.getElement().alt) {
					element.remove()
					layerlist.splice(i, 1);
				}
			}
			
		});
	}
})
$('.tree').on('click', '.four', function () {
	let dom = $(this)
	console.log(dom.attr('data-check'));
	return
	if (dom.attr('data-check') === 'false') {
		dom.attr('data-check', 'true')
		dom.attr('src', './img/checked.png')
		let lidomlist = dom.parent().parent().find('.flexLi')
		if (lidomlist.length) {
			let lidomlistlen = lidomlist.length
			for (var i = 0; i < lidomlistlen; i++) {
				// console.log($(lidomlist[i]).find('.check').attr('data-check'), !$(lidomlist[i]).find('.check').attr('data-check'));
				if ($(lidomlist[i]).find('.check') && $(lidomlist[i]).find('.check').attr('data-check') === 'false') {
					$(lidomlist[i]).find('.check').attr('data-check', 'true')
					$(lidomlist[i]).find('.check').attr('src', './img/checked.png')
					var str = $(lidomlist[i]).attr('data-info')
					console.log(str);
					if (str.indexOf('latitude') < 0) return
					let obj = JSON.parse(str)
					if (obj.type === 'bui') {
						icon = './img/building_marker_normal.png'
					} else if (obj.type === 'bus') {
						icon = './img/business_marker_normal.png'
					} else if (obj.type === 'wd') {
						icon = './img/wangdianicon.png'
					} else if (obj.type === 'ys') {
						icon = './img/yunshuicon.png'
					}
					if (obj.latitude) {
							var layers = BM.marker([obj.latitude,obj.longitude],{icon:BM.icon({iconUrl: icon }), alt: str }).addTo(map)
							.on('click', function(e) { 
								layerlist.forEach((element, i) => {
									if (element._tooltip) {
										element.unbindTooltip()
									}
								});
				
								if (obj.type === 'bus') {
									console.log(e.target.options.alt);
									getSqInfo(e.target.options.alt)
								} else {
									getShInfo(e.target.options.alt)
								}
								this.bindTooltip(obj.name || obj.roundName, {permanent: true, opacity: 1, direction: 'bottom'}).openTooltip();
							})
							// map.flyTo([obj.latitude, obj.longitude], 15);
							if (map.getZoom() >= 15) {
								map.flyTo([obj.latitude, obj.longitude], map.getZoom());
							} else {
								map.flyTo([obj.latitude, obj.longitude], 15);
							}
							layerlist.push(layers)
					}
				
				}
			}
		}
	} else {
		dom.attr('data-check', 'false')
		dom.attr('src', './img/check.png')
		let lidomlist = dom.parent().parent().find('.flexLi')
		if (lidomlist.length) {
			let lidomlistlen = lidomlist.length
			for (var i = 0; i < lidomlistlen; i++) {
				if ($(lidomlist[i]).find('.check') && $(lidomlist[i]).find('.check').attr('data-check')) {
					$(lidomlist[i]).find('.check').attr('data-check', 'false')
					$(lidomlist[i]).find('.check').attr('src', './img/check.png')
					var str = $(lidomlist[i]).attr('data-info')
					console.log(str);
					layerlist.forEach((element, i) => {
						if (element.getElement() && element.getElement().alt) {
							if (str === element.getElement().alt) {
								element.remove()
								layerlist.splice(i, 1);
							}
						}
					});
				}
			}
			
			
		}
	}
})
function getlevel2 (obj, dom) {
	const data = { code: obj.code, operationType: operationType }
	$.ajax({
        //请求方式
        type : "POST",
        //请求的媒体类型
        // contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "/front/merchant/street",
        //数据，json字符串
        data : data,
        //请求成功
        success : function(result) {
            if (result.code === 200) {
			   var str = '<ul>'
			   result.data.forEach(element => {
					// if (type === false) {
					if (element.type === 1) {
						if (element.address) {
							element.address = null
						}
						str += '<li data-info=' + JSON.stringify(element) + '><div class="four"><img class="checkThree" data-check="true" src="./img/checked.png" alt="">' + element.name + '<i>(' + element.num + ')</i> <span class="unfold">+</span></div></li>'
					} else {
						if (element.address) {
							element.address = null
						}
						let color
						if (element.operationStatus  === 'a') {
							color = '#92D050'
						} else if (element.operationStatus  === 'b') {
							color = '#9CC3E6'
						} else if (element.operationStatus  === 'c') {
							color = '#FFC000'
						} else if (element.operationStatus  === 'd' ) {
							color = '#FF0000'
						}
						str += '<li data-info=' + JSON.stringify({...element, type: 'bui'}) + ' class="flexLi"><img class="check" data-check="true" src="./img/checked.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname" style="color:' + color + '">' + element.name + '</span><img class="dressTrue"  src="' + (element.latitude && element.longitude ? './img/dress.png' : '') + '" alt=""></li>'
						if (element.latitude && element.longitude) {
							layer = BM.marker([element.latitude,element.longitude],{icon:BM.icon({iconUrl: icon }), alt: JSON.stringify({...element, type: 'bui'}) }).addTo(map)
							.on('click', function(e) { 
								layerlist.forEach((element, i) => {
									if (element._tooltip) {
										element.unbindTooltip()
									}
								});
								getShInfo(e.target.options.alt)
								this.bindTooltip(element.name || element.roundName, {permanent: true, opacity: 1, direction: 'bottom'}).openTooltip();
							})
							layerlist.forEach((element, i) => {
								if (element._tooltip) {
									element.unbindTooltip()
								}
							});
							layerlist.push(layer)
						}
						
					}
				});
				str += '</ul>'
				dom.parent().after(str)

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
function getlevel3 (obj, dom) {
	const data = { code: obj.code, operationType: operationType }
	$.ajax({
        //请求方式
        type : "POST",
        //请求的媒体类型
        // contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "/front/merchant/community",
        //数据，json字符串
        data : data,
        //请求成功
        success : function(result) {
            if (result.code === 200) {
			   var str = '<ul>'
			   result.data.forEach(element => {
				   console.log(element.specialStatus);
				   let color
				   if (element.address) {
					element.address = null
					}
					if (element.operationStatus  === 'a') {
						color = '#92D050'
					} else if (element.operationStatus  === 'b') {
						color = '#9CC3E6'
					} else if (element.operationStatus  === 'c') {
						color = '#FFC000'
					} else if (element.operationStatus  === 'd' ) {
						color = '#FF0000'
					}
					str += '<li data-info=' + JSON.stringify({...element, type: 'bui'}) + ' class="flexLi"><img class="check" data-check="true" src="./img/checked.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname" style="color:' + color + '">' + element.name + '</span><img class="dressTrue"  src="' + (element.latitude && element.longitude ? './img/dress.png' : '') + '" alt=""></li>'
					if (element.latitude && element.longitude) {
						layer = BM.marker([element.latitude,element.longitude],{icon:BM.icon({iconUrl: icon }), alt: JSON.stringify({...element, type: 'bui'}) }).addTo(map)
						.on('click', function(e) { 
							layerlist.forEach((element, i) => {
								if (element._tooltip) {
									element.unbindTooltip()
								}
							});
							getShInfo(e.target.options.alt)
							this.bindTooltip(element.name || element.roundName, {permanent: true, opacity: 1, direction: 'bottom'}).openTooltip();
						})
						layerlist.forEach((element, i) => {
							if (element._tooltip) {
								element.unbindTooltip()
							}
						});
						layerlist.push(layer)
					}
				});
				str += '</ul>'
				dom.parent().after(str)
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

$('.seachQueqy').on('click', function () {
	if(!$('.treeSearchInput').val().trim()) {
		alert('请输入商家名称')
		return
	}
	if (layerlist.length) {
        layerlist.forEach(element => {
            element.remove()
        });
    }
	let data ={
		name: $('.treeSearchInput').val(),
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
        type : "POST",
        //请求的媒体类型
        // contentType: "application/json;charset=UTF-8",
        //请求地址
        url: url,
        //数据，json字符串
        data : data,
        //请求成功
        success : function(result) {
            if (result.code === 200) {
			if (result.data.length < 1) {
				$('.tree').html('<div style="width: 150px;margin: 0 auto;text-align: center;">暂无内容</div>');
				return
			}
			var str = '<ul>'
			result.data.forEach(element => {
				let icon = './img/building_marker_normal.png'
				let color
				if (element.operationStatus  === 'a') {
					color = '#92D050'
				} else if (element.operationStatus  === 'b') {
					color = '#9CC3E6'
				} else if (element.operationStatus  === 'c') {
					color = '#FFC000'
				} else if (element.operationStatus  === 'd' ) {
					color = '#FF0000'
				} else {
					color = '#444'
				}
				str += '<li data-info=' + JSON.stringify({ id: element.id, name: element.name, latitude: element.latitude, longitude: element.longitude, type: 'bui' }) + ' class="besflexLi"><img class="check" data-check="true" src="./img/checked.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname" style="color:' + color + '">' + element.name + '</span><img class="dressTrue"  src="' + (element.latitude && element.longitude ? './img/dress.png' : '') + '" alt=""></li>'
				str += '</li>';
				if (element.latitude && element.longitude) {
					layer = BM.marker([element.latitude,element.longitude],{icon:BM.icon({iconUrl: icon }), alt: JSON.stringify({...element, type: 'bui'}) }).addTo(map)
					.on('click', function(e) { 
						layerlist.forEach((element, i) => {
							if (element._tooltip) {
								element.unbindTooltip()
							}
						});
						getShInfo(e.target.options.alt)
						this.bindTooltip(element.name || element.roundName, {permanent: true, opacity: 1, direction: 'bottom'}).openTooltip();
					})
					layerlist.forEach((element, i) => {
						if (element._tooltip) {
							element.unbindTooltip()
						}
					});
					layerlist.push(layer)
				}
			});
			str += '</ul>'
			console.log(str);
			$('.tree').html(str);
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
})


$('.seachRest').on('click', function() {
	$('.treeSearchInput').val('')
	if (layerlist.length) {
        layerlist.forEach(element => {
            element.remove()
        });
	}
	if (operationType === 1) {
		building(1)
	} else if (operationType === 2) {
		building(2)
	} else if (operationType === 3) {
		businessDistrict()
	} else if (operationType === 4) {
		yunshuDistrict()
	} else if (operationType === 5) {
		wangdianDistrict()
	}
})
