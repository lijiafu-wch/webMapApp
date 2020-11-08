function treecreat(params, type) {
	console.log(type);
	if (type === true) {
		var str = '<ul>'
	} else {
		var str = '<ul style="display: none">'
	}
	params.forEach(element => {
		if (type === false) {
			str += '<li data-info=' + JSON.stringify({code: element.code, name: element.name, level: element.level}) + '><div>' +  element.name + '<i>(' + element.num + ')</i><span class="unfold">+</span></div>'
		} else if (type === true && element.children.length === false) {
			str += '<li data-info=' + JSON.stringify({code: element.code, name: element.name, level: element.level}) + '><div>' + element.name + '</div>'
		} else {
			str += '<li data-info=' + JSON.stringify({code: element.code, name: element.name, level: element.level}) + '><div>' + element.name + '<i>(' + element.num + ')</i> <span class="unfold">+</span></div>'
		}
	if (element.children && element.children != '') {
		str += treecreat(element.children, false);
	}
		str += '</li>';
	});
	str += '</ul>'
	return str
}
function treebusinesscreat(params, type) {
	if (type === true) {
		var str = '<ul>'
	} else {
		var str = '<ul class="ul" style="display: none">'
	}
	params.forEach(element => {
		let icon
		if (type === false) {
			console.log(element);
			let color
			if (element.specialStatus === 'A') {
			color = 'green'
			} else if (element.specialStatus === 'B') {
			color = '#F4A460'
			} else if (element.specialStatus === 'C' || element.specialStatus === 'c') {
			color = '#FF4500'
			}
			icon = './img/building_marker_normal.png'
			str += '<li data-info=' + JSON.stringify({ id: element.id, name: element.name, latitude: element.latitude, longitude: element.longitude, type: 'bui' }) + ' class="besflexLi"><img class="check" data-check="false" src="./img/check.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname" style="color:' + color + '">' + element.name + '</span></li>'
		} else {
			icon = './img/business_marker_normal.png'
			str += '<li data-info=' + JSON.stringify({ roundId: element.roundId, roundName: element.roundName, latitude: element.latitude, longitude: element.longitude, type: 'bus' }) + ' class="besflexLi"><img class="check" data-check="false" src="./img/check.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname">' + element.roundName + '</span><i>(' + element.num + ')</i><span class="besunfold">+</span></li>'
		}
	if (element.merchantList && element.merchantList != '') {
		str += treebusinesscreat(element.merchantList, false);
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
		if (obj.type === 'bui') {
			getShInfo(str)
		} else {
			getSqInfo(str)
		}
		if (obj.latitude) {
			if (obj.type === 'bui') {
				icon = './img/building_marker_normal.png'
			} else {
				icon = './img/business_marker_normal.png'
			}
			
			layer = BM.marker([obj.latitude,obj.longitude],{icon:BM.icon({iconUrl: icon }), alt: str }).addTo(map)
			.on('click', function(e) { 
				if (obj.type === 'bui') {
					getShInfo(e.target.options.alt)
				} else {
					console.log(e.target.options.alt);
					getSqInfo(e.target.options.alt)
				}
			})
			layerlist.forEach((element, i) => {
				console.log(element, element._tooltip)
				if (element._tooltip) {
					element.unbindTooltip()
				}
			});
			layer.bindTooltip(obj.name || obj.roundName, {permanent: false, opacity: 1, direction: 'bottom'}).openTooltip();
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
		} else {
			icon = './img/business_marker_normal.png'
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
					if (obj.type === 'bui') {
						getShInfo(e.target.options.alt)
					} else {
						getSqInfo(e.target.options.alt)
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

function getlevel2 (obj, dom) {
	const data = { code: obj.code }
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
							element.address = element.address.trim()
						}
						str += '<li data-info=' + JSON.stringify(element) + '><div>' + element.name + '<i>(' + element.num + ')</i> <span class="unfold">+</span></div></li>'
					} else {
						if (element.address) {
							element.address = element.address.trim()
						}
						let color
						if (element.specialStatus === 'A') {
							color = 'green'
						} else if (element.specialStatus === 'B') {
							color = '#F4A460'
						} else if (element.specialStatus === 'C' || element.specialStatus === 'c' || element.specialStatus === 'c') {
							color = '#FF4500'
						}
						str += '<li data-info=' + JSON.stringify({...element, type: 'bui'}) + ' class="flexLi"><img class="check" data-check="false" src="./img/check.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname" style="color:' + color + '">' + element.name + '</span></li>'
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
	const data = { code: obj.code }
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
					element.address = element.address.trim()
					}
				   if (element.specialStatus === 'A') {
					color = 'green'
				   } else if (element.specialStatus === 'B') {
					color = '#F4A460'
				   } else if (element.specialStatus === 'C' || element.specialStatus === 'c') {
					color = '#FF4500'
				   }
					str += '<li data-info=' + JSON.stringify({...element, type: 'bui'}) + ' class="flexLi"><img class="check" data-check="false" src="./img/check.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname" style="color:' + color + '">' + element.name + '</span></li>'
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
	let data ={
		name: $('.treeSearchInput').val()
	}
	$.ajax({
        //请求方式
        type : "POST",
        //请求的媒体类型
        // contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "/front/merchant/search",
        //数据，json字符串
        data : data,
        //请求成功
        success : function(result) {
            if (result.code === 200) {
			console.log(result);
			if (result.data.length < 1) {
				$('.tree').html('<div style="width: 150px;margin: 0 auto;text-align: center;">暂无内容</div>');
				return
			}
			var str = '<ul>'
			result.data.forEach(element => {
				let icon = './img/building_marker_normal.png'
				let color
				if (element.specialStatus === 'A') {
				color = 'green'
				} else if (element.specialStatus === 'B') {
				color = '#F4A460'
				} else if (element.specialStatus === 'C' || element.specialStatus === 'c') {
				color = '#FF4500'
				}
				str += '<li data-info=' + JSON.stringify({ id: element.id, name: element.name, latitude: element.latitude, longitude: element.longitude, type: 'bui' }) + ' class="besflexLi"><img class="check" data-check="false" src="./img/check.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname" style="color:' + color + '">' + element.name + '</span></li>'
				str += '</li>';
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
	return
	var str = '<ul>'
	params.forEach(element => {
		let icon = './img/building_marker_normal.png'
		let color
		if (element.specialStatus === 'A') {
		color = 'green'
		} else if (element.specialStatus === 'B') {
		color = '#F4A460'
		} else if (element.specialStatus === 'C' || element.specialStatus === 'c') {
		color = '#FF4500'
		}
		str += '<li data-info=' + JSON.stringify({ id: element.id, name: element.name, latitude: element.latitude, longitude: element.longitude, type: 'bui' }) + ' class="besflexLi"><img class="check" data-check="false" src="./img/check.png" alt=""> <img class="iconImg" src="' + icon + '" alt=""><span class="buildingname" style="color:' + color + '">' + element.name + '</span></li>'
		str += '</li>';
	});
	str += '</ul>'
	return str
})


$('.seachRest').on('click', function() {
	$('.treeSearchInput').val('')
	building()
})
// ((global) => {
// 	//添加的dom方法   $().xxx 或 leg().xxx
// 	$.fn.extend({
// 		tree(data, arrs) {
// 			var tree = this;
// 			$(tree).on("click", ".isShow", function() {
// 				let that = this;
// 				isShow(that);
// 			})

// 			function isShow(that) {
// 				//:visible 判断当前元素是否可见。
// 				if ($(that).parent().find("ul").is(":visible")) {
// 					$(that).parent().find("ul").hide();
// 					$(that).attr("src", 'img/add.png');
// 				} else {
// 					if ($(that).next().next().next().next().length > 0) {
// 						$(that).attr("src", 'img/minus.png');
// 					} else {
// 						$(that).attr("style", 'opacity: 0;');
// 					}
// 					$(that).parent().find("ul").show();
// 					// $(that).attr("src", 'minus.png');
// 				}
// 			}
// 			//判断父级选中状态
// 			function checkParent(param) {
// 				if ($(param).is(':checked')) {
// 					$(param).parent().parent().prev().prev().prev().prop("checked", 'true');
// 				} else {
// 					var temp = $(param).parent().parent().find("input");
// 					var isChecked = false;
// 					//判断子级是否有checked的，没有就取消父级的选中状态
// 					$.each(temp, function(index, item) {
// 						if (item.checked) {
// 							isChecked = true;
// 						}
// 					});

// 					if (!isChecked) {
// 						$(param).parent().parent().prev().prev().prev().removeAttr("checked");
// 					}
// 				}
// 				var asd = $(param).parent().parent().prev().prev().prev()[0];
// 				if (asd != undefined) {
// 					checkParent(asd)
// 				}
// 				return;
// 			}

// 			//判断子级选中状态
// 			function checkChildren(param) {
// 				if (param.checked) {
// 					$(param).next().next().next().children().find("input").prop("checked", 'true');
// 				} else {
// 					$(param).next().next().next().children().find("input").removeAttr("checked");
// 				}
// 			}

// 			$(tree).on("click", "input", function() {
// 				let str = $(this).parent().find('a').attr('data-info')
// 				if (str.indexOf('latitude') < 0) return
// 				let obj = JSON.parse(str)
// 				if (obj.latitude) {
// 					if ($(this)[0].checked) {
// 						if (obj.type !== 'Business') {
// 							icon = './img/building_marker_normal.png'
// 						} else {
// 							icon = './img/business_marker_normal.png'
// 						}
// 						const layer = BM.marker([obj.latitude,obj.longitude],{icon:BM.icon({iconUrl: icon }), alt: str }).addTo(map)
// 						.on('click', function(e) { 
// 							// console.log(obj);
// 							if (obj.type !== 'Business') {
// 								getShInfo(e.target.options.alt)
// 							} else {
// 								getSqInfo(e.target.options.alt)
// 							}
// 						})
// 						layer.bindTooltip(obj.name, {permanent: true, opacity: 0.6, direction: 'bottom'}).openTooltip();
// 						if (obj.latitude) {
// 							map.flyTo([obj.latitude, obj.longitude], 15);
// 						}
// 						layerlist.push(layer)
// 						// layerlist.forEach(element => {
// 						// 	layerlist.forEach(element => {
// 						// 		if (element.getElement() && element.getElement().alt) {
// 						// 			if (str === element.getElement().alt) {
// 						// 				console.log(element.getElement().alt);
// 						// 				map.addLayer(element)
// 						// 			}
// 						// 		}
// 						// 	});
// 						// 	// console.log('====================================');
// 						// 	// console.dir(element.getElement().alt);
// 						// 	// console.log('====================================');
// 						// });
// 					} else {
// 						layerlist.forEach((element, i) => {
// 							if (element.getElement() && element.getElement().alt) {
// 								if (str === element.getElement().alt) {
// 									element.remove()
// 									layerlist.splice(i, 1);
// 								}
// 							}
							
// 						});
// 					}
// 				}
// 				//先子级在父级避免出错（父级里面有判断子级是否选中的）
// 				if (data[0].cascade) {
// 					checkChildren(this);
// 					checkParent(this);
// 				}
// 			})

// 			//使点击a标签等同于点击 input
// 			$(tree).on("click", "a", function(e) {
// 				if (e.target.dataset.info.indexOf('latitude') < 0) {
// 					alert('未找到商家信息')
// 					return
// 				}
// 				if (e.target.dataset.info.indexOf('merchantList') > -1 && $('.treeBoxtitle').text() !== '便民商圈') {
// 					alert('请选择具体商家')
// 					return
// 				}
				
// 				const obj = JSON.parse(e.target.dataset.info)
// 				if (obj && obj.latitude && obj.longitude) {
// 					if (obj.type !== 'Business') {
// 						getShInfo(e.target.dataset.info)
// 					} else {
// 						getSqInfo(e.target.dataset.info)
// 					}
// 					if (obj.latitude) {
// 						map.flyTo([obj.latitude, obj.longitude], 15);
// 					}
// 					if ($(this).prev().prev()[0].checked) {
// 						$(this).prev().prev().removeAttr("checked");
// 					} else {
// 						$(this).prev().prev().prop("checked", 'true');
// 					}
// 				}
				
// 				//判断是否为子父级联
// 				if (data[0].cascade) {
// 					checkChildren($(this).prev().prev()[0]);
// 					checkParent($(this).prev().prev()[0]);
// 				}
// 			})

// 			//id相等就选中
// 			const insert = (children, arr) => {
// 				for (var a in arr) {
// 					if (children.id == arr[a]) {
// 						children.checked = true
// 					}
// 				}
// 			}

// 			//设置tree节点是否选中
// 			function setCheckedNodes(data, arrs) {
// 				for (let x in data) {
// 					let children = data[x].children;
// 					if (children != null) {
// 						for (let y in children) {
// 							insert(children[y], arrs)
// 							setCheckedNodes(children, arrs);
// 						}
// 					} else {
// 						return;
// 					}
// 				}

// 			}
			
// 			//递归
			// function createTree(data) {
			// 	var str = '<ul>';
			// 	for (var i = 0; i < data.length; i++) {
			// 		if (data[i].merchantList  && data[i].merchantList.length) {
			// 			str +=
			// 			'<li><img class="isShow" src="img/minus.png" />'
			// 		} else {
			// 			str +=
			// 			'<li>'
			// 		}
			// 		if (data[i].checked == true) {
			// 			str += '<input id="' + data[i].id + '" type="checkbox" checked ' +
			// 				'data-show="' + data[i].open + '" value="' + data[i].id + '"/>'
			// 		} else {
			// 			str += '<input id="' + data[i].id + '" type="checkbox" ' +
			// 				'data-show="' + data[i].open + '" value="' + data[i].id + '"/>'
			// 		}
					

			// 		// $('.treeBoxtitle').html(text)
					
			// 		if (!data[i].children) {
			// 			str += '<label class="label" for="' +
			// 			data[i].id + '"/><img style="width: 14px; margin: 0 2px;" src="' + './img/building_marker_normal.png' + '" alt=""><a href="#" data-info=' + JSON.stringify(data[i]) + '>' + data[i].name + '</a>';
			// 		} else {
			// 			// str += '<label class="label" for="' +
			// 			// data[i].id + '"/><a href="#" >' + data[i].name + '</a>';
			// 			str += '<label class="label" for="' +
			// 			data[i].id + '"/><img style="width: 14px; margin: 0 2px;" src="' + icon + '" alt=""><a href="#" data-info=' + JSON.stringify(data[i]) + '>' + data[i].name + '</a>';
					
			// 		}
					
			// 		if (data[i].children && data[i].children != '') {
			// 			str += createTree(data[i].children);
			// 		}
			// 		str += '</li>';
			// 	};
			// 	str += '</ul>';
			// 	return str;
			// };

// 			//通过ID选中
// 			if (arrs.constructor == Array) { //判断是否为数组
// 				setCheckedNodes(data, arrs);
// 			}

// 			//把树放到容器
// 			$(tree).html(createTree(data));

// 			//通过原始数据选中
// 			$.each($("input:checkbox:checked"), function() {
// 				checkParent(this)
// 			});

// 			//是否展开
// 			$.each($("input"), function() {
// 				if (this.getAttribute('data-show') == 'false') {
// 					$(this).parent().find("ul").hide();
// 					if (!$(this).prev()[0]) return
// 					$(this).prev()[0].setAttribute("src", 'img/add.png');

// 				} else {
// 					$(this).parent().find("ul").show();
// 					if (!$(this).prev()[0]) return
// 					if ($(this).next().next().next().length > 0) {
// 						$(this).prev()[0].setAttribute("src", 'img/minus.png');
// 					} else {
// 						$(this).prev()[0].setAttribute("style", 'opacity: 0;');
// 					}
// 				}
// 			});
// 		},
// 	})

// 	//添加的$.xxx() 或者leg.xxx()
// 	$.extend({
// 		getCheckedNodes() { //获取选中id集合
// 			var arr = []
// 			$.each($('input:checkbox:checked'), function() {
// 				let temp = $(this).val();
// 				if (temp != "" && temp != "undefined") {
// 					arr.push($(this).val())
// 				}
// 			});
// 			return arr;
// 		}
// 	});

// 	global.leg = global.$ = $;

// })(window)