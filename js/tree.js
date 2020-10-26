((global) => {
	//添加的dom方法   $().xxx 或 leg().xxx
	$.fn.extend({
		tree(data, arrs) {
			var tree = this;
			$(tree).on("click", ".isShow", function() {
				let that = this;
				isShow(that);
			})

			function isShow(that) {
				//:visible 判断当前元素是否可见。
				if ($(that).parent().find("ul").is(":visible")) {
					$(that).parent().find("ul").hide();
					$(that).attr("src", 'img/add.png');
				} else {
					if ($(that).next().next().next().next().length > 0) {
						$(that).attr("src", 'img/minus.png');
					} else {
						$(that).attr("style", 'opacity: 0;');
					}
					$(that).parent().find("ul").show();
					// $(that).attr("src", 'minus.png');
				}
			}
			//判断父级选中状态
			function checkParent(param) {
				if ($(param).is(':checked')) {
					$(param).parent().parent().prev().prev().prev().prop("checked", 'true');
				} else {
					var temp = $(param).parent().parent().find("input");
					var isChecked = false;
					//判断子级是否有checked的，没有就取消父级的选中状态
					$.each(temp, function(index, item) {
						if (item.checked) {
							isChecked = true;
						}
					});

					if (!isChecked) {
						$(param).parent().parent().prev().prev().prev().removeAttr("checked");
					}
				}
				var asd = $(param).parent().parent().prev().prev().prev()[0];
				if (asd != undefined) {
					checkParent(asd)
				}
				return;
			}

			//判断子级选中状态
			function checkChildren(param) {
				if (param.checked) {
					$(param).next().next().next().children().find("input").prop("checked", 'true');
				} else {
					$(param).next().next().next().children().find("input").removeAttr("checked");
				}
			}

			$(tree).on("click", "input", function() {
				let str = $(this).parent().find('a').attr('data-info')
				if (str.indexOf('latitude') < 0) return
				let obj = JSON.parse(str)
				if (obj.latitude) {
					if ($(this)[0].checked) {
						if (obj.type !== 'Business') {
							icon = 'http://map.dlzs.gov.cn:8080/zs_gis/PGIS/zs/images/markers/building_marker_normal.png'
						} else {
							icon = 'http://map.dlzs.gov.cn:8080/zs_gis/PGIS/zs/images/markers/business_marker_normal.png'
						}
						const layer = BM.marker([obj.latitude,obj.longitude],{icon:BM.icon({iconUrl: icon }), alt: str }).addTo(map)
						.on('click', function(e) { 
							// console.log(obj);
							if (obj.type !== 'Business') {
								getShInfo(e.target.options.alt)
							} else {
								getSqInfo(e.target.options.alt)
							}
						})
						layer.bindTooltip(obj.name, {permanent: true, opacity: 0.6, direction: 'bottom'}).openTooltip();
						if (obj.latitude) {
							map.flyTo([obj.latitude, obj.longitude], 15);
						}
						layerlist.push(layer)
						// layerlist.forEach(element => {
						// 	layerlist.forEach(element => {
						// 		if (element.getElement() && element.getElement().alt) {
						// 			if (str === element.getElement().alt) {
						// 				console.log(element.getElement().alt);
						// 				map.addLayer(element)
						// 			}
						// 		}
						// 	});
						// 	// console.log('====================================');
						// 	// console.dir(element.getElement().alt);
						// 	// console.log('====================================');
						// });
					} else {
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
				//先子级在父级避免出错（父级里面有判断子级是否选中的）
				if (data[0].cascade) {
					checkChildren(this);
					checkParent(this);
				}
			})

			//使点击a标签等同于点击 input
			$(tree).on("click", "a", function(e) {
				if (e.target.dataset.info.indexOf('latitude') < 0) {
					alert('未找到商家信息')
					return
				}
				if (e.target.dataset.info.indexOf('merchantList') > -1 && $('.treeBoxtitle').text() !== '便民商圈') {
					alert('请选择具体商家')
					return
				}
				
				const obj = JSON.parse(e.target.dataset.info)
				if (obj && obj.latitude && obj.longitude) {
					if (obj.type !== 'Business') {
						getShInfo(e.target.dataset.info)
					} else {
						getSqInfo(e.target.dataset.info)
					}
					if (obj.latitude) {
						map.flyTo([obj.latitude, obj.longitude], 15);
					}
					if ($(this).prev().prev()[0].checked) {
						$(this).prev().prev().removeAttr("checked");
					} else {
						$(this).prev().prev().prop("checked", 'true');
					}
				}
				
				//判断是否为子父级联
				if (data[0].cascade) {
					checkChildren($(this).prev().prev()[0]);
					checkParent($(this).prev().prev()[0]);
				}
			})

			//id相等就选中
			const insert = (children, arr) => {
				for (var a in arr) {
					if (children.id == arr[a]) {
						children.checked = true
					}
				}
			}

			//设置tree节点是否选中
			function setCheckedNodes(data, arrs) {
				for (let x in data) {
					let children = data[x].children;
					if (children != null) {
						for (let y in children) {
							insert(children[y], arrs)
							setCheckedNodes(children, arrs);
						}
					} else {
						return;
					}
				}

			}
			
			//递归
			function createTree(data) {
				var str = '<ul>';
				for (var i = 0; i < data.length; i++) {
					if (data[i].merchantList  && data[i].merchantList.length) {
						str +=
						'<li><img class="isShow" src="img/minus.png" />'
					} else {
						str +=
						'<li>'
					}
					if (data[i].checked == true) {
						str += '<input id="' + data[i].id + '" type="checkbox" checked ' +
							'data-show="' + data[i].open + '" value="' + data[i].id + '"/>'
					} else {
						str += '<input id="' + data[i].id + '" type="checkbox" ' +
							'data-show="' + data[i].open + '" value="' + data[i].id + '"/>'
					}
					

					// $('.treeBoxtitle').html(text)
					
					if (!data[i].children) {
						str += '<label class="label" for="' +
						data[i].id + '"/><img style="width: 14px; margin: 0 2px;" src="' + 'http://map.dlzs.gov.cn:8080/zs_gis/PGIS/zs/images/markers/building_marker_normal.png' + '" alt=""><a href="#" data-info=' + JSON.stringify(data[i]) + '>' + data[i].name + '</a>';
					} else {
						// str += '<label class="label" for="' +
						// data[i].id + '"/><a href="#" >' + data[i].name + '</a>';
						str += '<label class="label" for="' +
						data[i].id + '"/><img style="width: 14px; margin: 0 2px;" src="' + icon + '" alt=""><a href="#" data-info=' + JSON.stringify(data[i]) + '>' + data[i].name + '</a>';
					
					}
					
					if (data[i].children && data[i].children != '') {
						str += createTree(data[i].children);
					}
					str += '</li>';
				};
				str += '</ul>';
				return str;
			};

			//通过ID选中
			if (arrs.constructor == Array) { //判断是否为数组
				setCheckedNodes(data, arrs);
			}

			//把树放到容器
			$(tree).html(createTree(data));

			//通过原始数据选中
			$.each($("input:checkbox:checked"), function() {
				checkParent(this)
			});

			//是否展开
			$.each($("input"), function() {
				if (this.getAttribute('data-show') == 'false') {
					$(this).parent().find("ul").hide();
					if (!$(this).prev()[0]) return
					$(this).prev()[0].setAttribute("src", 'img/add.png');

				} else {
					$(this).parent().find("ul").show();
					if (!$(this).prev()[0]) return
					if ($(this).next().next().next().length > 0) {
						$(this).prev()[0].setAttribute("src", 'img/minus.png');
					} else {
						$(this).prev()[0].setAttribute("style", 'opacity: 0;');
					}
				}
			});
		},
	})

	//添加的$.xxx() 或者leg.xxx()
	$.extend({
		getCheckedNodes() { //获取选中id集合
			var arr = []
			$.each($('input:checkbox:checked'), function() {
				let temp = $(this).val();
				if (temp != "" && temp != "undefined") {
					arr.push($(this).val())
				}
			});
			return arr;
		}
	});

	global.leg = global.$ = $;

})(window)