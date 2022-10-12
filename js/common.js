var com = com || {}

com.init = function () {
	com.width = 620
	com.height = 570
	com.spaceX = 36,			//着点X跨度
	com.spaceY = 36,			//着点Y跨度
	com.pointStartX = 26,		//第一个着点X坐标
	com.pointStartY =  2,		//第一个着点Y坐标
	com.canvas = document.getElementById("checkerboard")
	com.ct = com.canvas.getContext("2d")
	com.canvas.width = com.width
	com.canvas.height = com.height
	com.box = document.getElementById("checkerboardBox")
	console.log(com.box)
	com.box.style.marginTop = (window.innerHeight/2 - 285).toString() + "px"
	com.childList = com.childList || []
	com.bgImg = new Image()
	com.bgImg.src = "img/stype/checkerborad.png"
	com.whiteImg = new Image()
	com.whiteImg.src = "img/stype/white.png"
	com.blackImg = new Image()
	com.blackImg.src = "img/stype/black.png"
}

window.onload = function () {
	com.bg = new com.class.Bg()
	com.bg.show()
	com.childList = []
	play.init()
}

com.show = function () {
	com.ct.clearRect(0, 0, com.width, com.height)
	com.bg.show()
	for (var i = 0; i < com.childList.length; i++) {
		com.childList[i].show()
	}
}

com.class = com.class || {}
com.class.Node = function (x, y) {
	this.x = x || 0
	this.y = y || 0
	this.show = function () {
		com.ct.save()
		switch(play.map[y][x]) {
			case 1:
				var img = com.blackImg
				break
			default:
				var img = com.whiteImg
		}
		com.ct.drawImage(img, com.spaceX * this.x + com.pointStartX + 10, com.spaceY * this.y + com.pointStartY + 10)
		com.ct.restore()
	}

	this.value = function () {
		return com.value(this.x, this.y, this.c)
	}
}

com.class.Bg = function (img, x, y) {
	this.x = x || 0
	this.y = y || 0
	this.isShow = true
	this.show = function () {
		if (this.isShow) com.ct.drawImage(com.bgImg, com.spaceX * this.x, com.spaceY * this.y)
	}
}
com.init()
