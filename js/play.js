var play = play || {}

play.init = function () {
	play.move = false
	play.x = -1
	play.y = -1
	play.map = (function () {
		var arr = []
		for (var i = 0; i < 15; i++) {
			arr[i] = []
			for (var n = 0; n < 15; n++) {
				arr[i][n] = 0
			}
		}
		return arr
	})()

	x = [0,1,1,2,2,2,3,4,5,6,7,8,9,10,11,12,12,12,13,13]
	y = [0,1,3,3,5,7,8,10,12,9,7,5,7,5,3,2,6,10,4,11]
	c = [1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1]
	c = [2,2,2,2,2,2,2,2,2,2,1,3,3,3,3,3,3,3,3,3]
	for(var i = 0; i < x.length;i++) {
		play.map[y[i]][x[i]] = c[i]
		var node = new com.class.Node(x[i], y[i])
		com.childList.push(node)
	}

	com.show()
	//绑定拖拽事件
	com.canvas.addEventListener("mousedown", play.downCanvas)
	com.canvas.addEventListener("mousemove", play.moveCanvas)
	com.canvas.addEventListener("mouseup", play.upCanvas)

}

//点击事件
play.downCanvas = function (e) {
	var point = play.getClickPoint(e)
	var x = point.x
	var y = point.y
	if (play.map[y][x] > 0) {
		play.x = x
		play.y = y
		play.move = true
		document.getElementById("selectAudio").play()
		com.show()
	}
}

//移动事件
play.moveCanvas = function (e) {
	if (!play.move) return false
	var point = play.getClickPoint(e)
	var x = point.x
	var y = point.y
	var index = 0
	if (play.map[y][x] == 0 && (x != play.x || y != play.y)) {
		for (;index < com.childList.length; index++) {
			if (play.x == com.childList[index].x && play.y == com.childList[index].y) {
				break
			}
		}
		com.childList.splice(index, 1)
		c = play.map[play.y][play.x]
		console.log(c)
		play.map[play.y][play.x] = 0
		play.x = x
		play.y = y
		play.map[play.y][play.x] = c
		var newNode = new com.class.Node(play.x, play.y)
		com.childList.push(newNode)
		com.show()
	}
}

// 抬起事件
play.upCanvas = function (e) {
	if (!play.move) return false
	play.move = false
	var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
	httpRequest.open('GET', 'http://119.3.215.241:7003/Values/Set', true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
	httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
	httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
	httpRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
	httpRequest.send();//第三步：发送请求  将请求参数写在URL中
	document.getElementById("clickAudio").play()
}

//获得点击的着点
play.getClickPoint = function (e) {
	var domXY = play.getDomXY(com.canvas)
	var x = Math.round((e.pageX - domXY.x - com.pointStartX - 30) / com.spaceX)
	var y = Math.round((e.pageY - domXY.y - com.pointStartY - 30) / com.spaceY)
	if (x > 14) x = 14
	if (y > 14) y = 14
	if (x < 0) x = 0
	if (y < 0) y = 0
	return { "x": x, "y": y }
}

//获取元素距离页面左侧的距离
play.getDomXY = function (dom) {
	var left = dom.offsetLeft
	var top = dom.offsetTop
	var current = dom.offsetParent
	while (current !== null) {
		left += current.offsetLeft
		top += current.offsetTop
		current = current.offsetParent
	}
	return { x: left, y: top }
}