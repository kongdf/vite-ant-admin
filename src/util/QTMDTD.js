var mCanvas = {}; //声明Canvas对象;
var cxt = {}; //声明context对象,该对象拥有丰富的绘图的API
var sport={}
function initMikyouCanvas(mCanvas2, cxt,sport) {

  mCanvas = mCanvas2;
  cxt = cxt;
  sport=sport
}
/**
 * 1、绘制矩形(主要分为:绘制填充矩形和绘制边框矩形和清除矩形区域(利用isClear标记是否绘制清除矩形，实际上就是绘制一个与画布背景色一致的矩形区域),利用isFill变量来标记)
 * 主要使用canvas原生的API:FillRect(x,y,width,height),StrokeRect(x,y,width,height),ClearRect(x,y,width,height)
 * 自己封装的参数:drawRect(x,y,width,height,isClear,isFill,bgColor)
 * x:矩形起点的X坐标(注意：相对坐标系是以画布的左上角为原点，向右为X坐标正方向，向下为Y坐标的正方向)
 * y:矩形终点的Y坐标
 * width:矩形的宽度
 * height:矩形的高度
 * isClear:是否绘制清除画布的矩形区域，true则就是绘制一个清除画布矩形区域，false就是绘制其他两种矩形
 * isFill:是否是填充，false为绘制边框，true为绘制填充
 * bgColor:矩形的颜色，若为填充则为整个矩形背景色，边框则为边框色
 * */

function drawRect(x, y, width, height, isClear, isFill, bgColor) {
  if (isClear) { //为true表示绘制清除画布的矩形区域,那么传入的isFill, bgColor值可以为任意值
    cxt.clearRect(x, y, width, height);
  } else { //false
    if (isFill) { //为true，则绘制填充矩形
      cxt.fillStyle = bgColor;
      cxt.fillRect(x, y, width, height);
    } else { //为false,则绘制边框矩形
      cxt.strokeStyle = bgColor;
      cxt.strokeRect(x, y, width, height);
    }
  }
}
/**
 * 2、绘制圆弧(主要分为：绘制填充圆弧和绘制圆弧边框利用isFill变量来标记,注意：在绘制圆弧边框的时候还有一种特殊情况就是，只需要仅仅绘制弧边，不需要绘制圆弧开始起点和终点之间的连线，这个就是调用了beginPath()不需要调用closePath(),这里也使用一个isOnlyArc变量来标记true为仅仅绘制弧边
 *其他的正常)
 * 主要是使用的是canvas原生的API:
 * arc(x,y,radius,startAngle,endAngle,anticlockwise);
 * x:圆心X坐标
 * y:圆心Y坐标
 * startAngle:开始的弧度
 * endAngle:结束的弧度
 * anticlockwise:true为逆时针，false为顺时针
 * 自己封装的参数:drawCircle(x,y,radius,startAngle，endAngle,anticlockwise,isFill，bgColor)
 * x:圆心X坐标
 * y:圆心Y坐标
 * startAngle:开始的角度(通过getAngle方法将传入的角度转换成相应角度的弧度，
 *     因为在原生的绘制圆弧的API它是根据弧度大小来绘制的，例如如果你想绘制一个30度的圆弧，如果直接传入30是不行的，要传入Math.PI/6
 * 所以在这里个人做了一个优化，直接传入30就通过getAngle方法转换成Math.PI/6，这样就很方便的绘制自己传入的角度大小的圆弧。
 * )
 * endAngle:结束的角度
 * 注意:如果要绘制圆形那么只需要调用该方法，传入的startAngle和endAngle是0度和360度即可。
 * anticlockwise:true为逆时针，false为顺时针
 * isFill:是否是填充，false为绘制边框，true为绘制填充
 * bgColor:圆弧的颜色
 * */

function drawArc(x, y, radius, startAngle, endAngle, anticlockwise, isOnlyArc, isFill, bgColor) {
  if (isFill) { //为true绘制填充圆弧
    cxt.fillStyle = bgColor;
    cxt.beginPath();
    cxt.arc(x, y, radius, getAngle(startAngle), getAngle(endAngle), anticlockwise);
    cxt.closePath();
    cxt.fill();
  } else { //为false绘制边框圆弧
    cxt.strokeStyle = bgColor;
    cxt.beginPath();
    cxt.arc(x, y, radius, getAngle(startAngle), getAngle(endAngle), anticlockwise);
    if (isOnlyArc) { //绘制边框的另一种情况就是仅仅绘制弧边不需要调用closePath()

    } else { //否则就是不仅绘制边框还得绘制起点和终点的连线，需要调用了closePath();
      cxt.closePath();
    }
    cxt.stroke();
  }
}
/**
 * 3、绘制扇形(主要分为：绘制填充扇形和绘制扇形边框利用isFill变量来标记）
 *主要是使用的是canvas原生的API:
 * arc(x,y,radius,startAngle,endAngle,anticlockwise);
 * x:圆心X坐标
 * y:圆心Y坐标
 * startAngle:开始的弧度
 * endAngle:结束的弧度
 * anticlockwise:true为逆时针，false为顺时针
 * 自己封装参数API:drawSector(x,y,radius,startAngle,endAngle,anticlockwise,isFill,bgColor);
 * x:圆心X坐标
 * y:圆心Y坐标
 * startAngle:开始的角度(通过getAngle方法将传入的角度转换成相应角度的弧度，
 *     因为在原生的绘制圆弧的API它是根据弧度大小来绘制的，例如如果你想绘制一个30度的圆弧，如果直接传入30是不行的，要传入Math.PI/6
 * 所以在这里个人做了一个优化，直接传入30就通过getAngle方法转换成Math.PI/6，这样就很方便的绘制自己传入的角度大小的圆弧。
 * )
 * endAngle:结束的角度
 * anticlockwise:true为逆时针，false为顺时针
 * isFill:是否是填充，false为绘制边框，true为绘制填充
 * bgColor:扇形的颜色
 * */

function drawSector(x, y, radius, startAngle, endAngle, anticlockwise, isFill, bgColor) {
  if (isFill) {
    cxt.fillStyle = bgColor;

    cxt.beginPath();
    cxt.moveTo(x, y); //把路径移动到画布中的指定点，不创建线条，注意：绘制扇形唯一与绘制弧的区别在于，紧跟着beginPath()后面调用，首先将路径移动到圆心位置
    cxt.arc(x, y, radius, getAngle(startAngle), getAngle(endAngle), false);
    cxt.closePath();
    cxt.fill();
  } else {
    cxt.strokeStyle = bgColor;

    cxt.beginPath();
    cxt.moveTo(x, y);
    cxt.arc(x, y, radius, getAngle(startAngle), getAngle(endAngle), false);
    cxt.closePath();
    cxt.stroke();
  }
}
/**
 * @description 4、绘制线段(主要分为：绘制填充线段和绘制空心线段利用isFill变量来标记）
 * 主要是使用的是canvas原生的API:
 * lineTo(x,y):表示从某点连线到该坐标点
 *moveTo(x,y):表示将路径移动到画布中的该坐标点
 * x:画布中某点的X坐标
 * y:画布中某点的Y坐标
 * 注意：如果开始没有调用moveTo,那么第一个lineTo的功能就相当于一个moveTo
 * 自己封装的API:drawLine(startX,startY,endX,endY,lineWidth,bgcolor)
 * 
 * startX:表示线的起点的X坐标
 * startY:表示起点的Y坐标
 * endX:表示线的终点的X坐标
 * endY:表示线的终点的Y坐标
 * lineWidth:表示线段的宽度
 * bgColor:线的颜色
 * */

function drawLine(startX, startY, endX, endY, lineWidth, bgColor) {
  cxt.beginPath();
  cxt.lineWidth = lineWidth;
  cxt.strokeStyle = bgColor;
  cxt.moveTo(startX, startY);
  cxt.lineTo(endX, endY);
  cxt.stroke();
  cxt.fill();
}
/**
 * @description 5、绘制贝塞尔曲线
 * drawBezierCurve
 * */

//将角度转换成弧度函数，
function getAngle(arc) {
  return Math.PI * (arc / 180);
}
/**
 * @description 6、吊钩
 * variousHooks
 * x原点横坐标,
 * y原点纵坐标,
 * X变量值左右,
 * Y变量值上下,
 * bgColor颜色
 * */

function variousHooks(x, y, X, Y, bgColor) {
  cxt.beginPath();
  cxt.strokeStyle = bgColor;
  //钩子头部分
  cxt.moveTo(x + 5 + X, y);
  cxt.lineTo(x + 35 + X, y);
  cxt.moveTo(x + 5 + X, y + 10);
  cxt.lineTo(x + 35 + X, y + 10)
  cxt.moveTo(x + 10 + X, y);
  cxt.lineTo(x + 10 + X, y + 10);
  cxt.moveTo(x + 30 + X, y);
  cxt.lineTo(x + 30 + X, y + 10);
  cxt.moveTo(x + 11 + X, y + 10);
  cxt.lineTo(x + 11 + X, y + 10 + Y);
  cxt.moveTo(x + 29 + X, y + 10);
  cxt.lineTo(x + 29 + X, y + 10 + Y);
  //半圆
  cxt.moveTo(x + 20 + X, y + 10 + Y);
  cxt.arc(x + 20 + X, y + 10 + Y, 10, 0, 180 * Math.PI / 180, false);
  cxt.moveTo(x + 20 + X, y + 10 + Y + 5);
  cxt.lineTo(x + 10 + X, y + 10 + Y + 15);
  cxt.moveTo(x + 20 + X, y + 10 + Y + 5);
  cxt.lineTo(x + 30 + X, y + 10 + Y + 15);
  cxt.moveTo(x + 50 + X, y + 10 + Y + 15);
  cxt.lineTo(x + 50 + X, y + 10 + Y + 35);
  cxt.lineTo(x + 10 + X, y + 10 + Y + 35);
  cxt.lineTo(x + 0 + X, y + 10 + Y + 35);
  cxt.lineTo(x + 0 + X, y + 10 + Y + 15);
  cxt.lineTo(x + 30 + X, y + 10 + Y + 15);


  
//   startX,startY,endX,endY,lineWidth,bgcolor



  cxt.stroke();
  cxt.fill();
  drawLine(170, 195, 180+X,195, 1, "rgb(0,126,255)");
}
/**
 * @description 7、叉线
 * wiredCables
 * */

function wiredCables(x, y, lineWidth, bgColor) {
  cxt.beginPath();
  cxt.lineWidth = lineWidth;
  cxt.strokeStyle = bgColor;
  cxt.moveTo(x - 10, y + 15);
  cxt.lineTo(x + 10, y - 15);
  cxt.moveTo(x - 10, y - 15);
  cxt.lineTo(x + 10, y + 15);
  cxt.stroke();
  cxt.fill();
}

/**
 * @description 8、文字
 * wiredCables
 * */

function drawText(text, x, y, color, font, textAlign) {
  cxt.font = font;
  cxt.textAlign = textAlign;
  cxt.fillStyle = color;
  cxt.fillText(text, x, y);
}

export const initCanvas = function (id,sport) { //onload事件加载该方法，当HTML5页面加载的时候就会回调该方法
  mCanvas = document.getElementById(id); //初始化canvas对象,这里只是获得了Canvas的这个整个的标签---<canvas id="mCanvas" width="800" height="800"></canvas>

  cxt = mCanvas.getContext("2d"); //初始化cxt对象,然后就去获得canvas的上下文对象cxt,注意传入参数为2d表示绘制2d平面，cxt得到的是一个canvasRenderingContext2D对象，里面封装了大量的canvas绘图API
 
  //初始化Canvas
  initMikyouCanvas(mCanvas, cxt,sport);
  /**canvas各种绘图的API**/
  //    //1、绘制矩形，drawRect(x,y,width,height,isClear,isFill,bgColor);
  drawRect(150, 370, 20, 30, false, false, "rgb(0,126,255)");
  drawRect(150, 340, 20, 30, false, false, "rgb(0,126,255)");
  drawRect(150, 310, 20, 30, false, false, "rgb(0,126,255)");
  drawRect(150, 280, 20, 30, false, false, "rgb(0,126,255)");
  drawRect(150, 250, 20, 30, false, false, "rgb(0,126,255)");
  drawRect(150, 220, 20, 30, false, false, "rgb(0,126,255)");
  drawRect(150, 190, 20, 30, false, false, "rgb(0,126,255)");
  drawRect(150, 160, 20, 30, false, false, "rgb(0,126,255)");
  drawRect(150, 115, 10, 40, false, true, "rgb(0,126,255)");
  //   左小重物
  drawRect(57, 113, 9, 15, false, true, "rgb(0,126,255)");
  drawRect(67, 113, 9, 15, false, true, "rgb(0,126,255)");
  drawRect(77, 113, 9, 15, false, true, "rgb(0,126,255)");
  //3、绘制圆形
  //支柱交点
  drawArc(150, 400, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(150, 370, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(150, 340, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(150, 310, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(150, 280, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(150, 250, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(150, 220, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(150, 190, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(150, 160, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(170, 400, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(170, 370, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(170, 340, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(170, 310, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(170, 280, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(170, 250, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(170, 220, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(170, 190, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  drawArc(170, 160, 2, 0, 360, false, false, true, "rgb(0,126,255)");
  //5、绘制线段 drawLine(startX, startY, endX, endY, lineWidth,bgColor)
  drawLine(110, 400, 210, 400, 1, "rgb(0,126,255)");
  drawLine(135, 400, 150, 340, 1, "rgb(0,126,255)");
  drawLine(185, 400, 170, 340, 1, "rgb(0,126,255)");
  //驾驶室
  drawLine(160, 115, 170, 115, 1, "rgb(0,126,255)");
  drawLine(170, 115, 180, 135, 1, "rgb(0,126,255)");
  drawLine(180, 135, 160, 135, 1, "rgb(0,126,255)");
  drawLine(180, 135, 170, 155, 1, "rgb(0,126,255)");
  drawLine(170, 155, 160, 155, 1, "rgb(0,126,255)");
  //塔吊尖
  drawLine(150, 110, 170, 110, 1, "rgb(0,126,255)");
  drawLine(150, 110, 160, 20, 1, "rgb(0,126,255)");
  drawLine(170, 110, 160, 20, 1, "rgb(0,126,255)");
  drawLine(152, 90, 168, 90, 1, "rgb(0,126,255)");
  drawLine(155, 70, 165, 70, 1, "rgb(0,126,255)");
  drawLine(158, 50, 162, 50, 1, "rgb(0,126,255)");

  drawLine(160, 45, 85, 80, 1, "rgb(0,126,255)");
  drawLine(160, 45, 88, 80, 1, "rgb(0,126,255)");
  drawLine(160, 45, 91, 80, 1, "rgb(0,126,255)");

  drawLine(160, 45, 240, 90, 1, "rgb(0,126,255)");
  drawLine(160, 45, 243, 90, 1, "rgb(0,126,255)");
  drawLine(160, 45, 246, 90, 1, "rgb(0,126,255)");
  drawLine(160, 45, 350, 90, 1, "rgb(0,126,255)");
  drawLine(160, 45, 353, 90, 1, "rgb(0,126,255)");
  drawLine(160, 45, 356, 90, 1, "rgb(0,126,255)");
  //右臂上下线条
  drawLine(170, 110, 390, 110, 1, "rgb(0,126,255)");
  drawLine(180, 90, 380, 90, 1, "rgb(0,126,255)");

  //上下线见得线    比例1:2
  drawLine(170, 110, 180, 90, 1, "rgb(0,126,255)");
  drawLine(190, 110, 180, 90, 1, "rgb(0,126,255)");
  drawLine(190, 110, 200, 90, 1, "rgb(0,126,255)");
  drawLine(210, 110, 200, 90, 1, "rgb(0,126,255)");
  drawLine(210, 110, 220, 90, 1, "rgb(0,126,255)");
  drawLine(230, 110, 220, 90, 1, "rgb(0,126,255)");
  drawLine(230, 110, 240, 90, 1, "rgb(0,126,255)");
  drawLine(250, 110, 240, 90, 1, "rgb(0,126,255)");
  drawLine(250, 110, 260, 90, 1, "rgb(0,126,255)");
  drawLine(270, 110, 260, 90, 1, "rgb(0,126,255)");
  drawLine(270, 110, 280, 90, 1, "rgb(0,126,255)");
  drawLine(290, 110, 280, 90, 1, "rgb(0,126,255)");
  drawLine(290, 110, 300, 90, 1, "rgb(0,126,255)");
  drawLine(310, 110, 300, 90, 1, "rgb(0,126,255)");
  drawLine(310, 110, 320, 90, 1, "rgb(0,126,255)");
  drawLine(330, 110, 320, 90, 1, "rgb(0,126,255)");
  drawLine(330, 110, 340, 90, 1, "rgb(0,126,255)");
  drawLine(350, 110, 340, 90, 1, "rgb(0,126,255)");
  drawLine(350, 110, 360, 90, 1, "rgb(0,126,255)");
  drawLine(370, 110, 360, 90, 1, "rgb(0,126,255)");
  drawLine(370, 110, 380, 90, 1, "rgb(0,126,255)");
  drawLine(390, 110, 380, 90, 1, "rgb(0,126,255)");

  //左吊臂
  drawLine(55, 110, 150, 110, 1, "rgb(0,126,255)");
  drawLine(55, 110, 55, 80, 1, "rgb(0,126,255)");
  drawLine(85, 110, 85, 80, 1, "rgb(0,126,255)");
  drawLine(115, 110, 115, 80, 1, "rgb(0,126,255)");
  drawLine(145, 110, 145, 80, 1, "rgb(0,126,255)");
  drawLine(55, 100, 145, 100, 1, "rgb(0,126,255)");
  drawLine(55, 90, 145, 90, 1, "rgb(0,126,255)");
  drawLine(55, 80, 145, 80, 1, "rgb(0,126,255)");

  //左小重物竖线
  drawLine(62, 110, 62, 130, 1, "rgb(0,126,255)");
  drawLine(72, 110, 72, 130, 1, "rgb(0,126,255)");
  drawLine(82, 110, 82, 130, 1, "rgb(0,126,255)");




  //6.控制吊钩的运动  以(165,110)为原点  X~(0--180),Y~(0--240)
  variousHooks(165, 110, sport.x, sport.y, "rgb(0,126,255)")
  drawText('2.5t', 180+105, 201, "red", '16px 微软雅黑', "left")
  drawText('2.5t', 180+25, 190, "white", '16px 微软雅黑', "left")


  //7.绘制叉线    y递减30
  wiredCables(160, 385, 1, "rgb(0,126,255)")
  wiredCables(160, 355, 1, "rgb(0,126,255)")
  wiredCables(160, 325, 1, "rgb(0,126,255)")
  wiredCables(160, 295, 1, "rgb(0,126,255)")
  wiredCables(160, 265, 1, "rgb(0,126,255)")
  wiredCables(160, 235, 1, "rgb(0,126,255)")
  wiredCables(160, 205, 1, "rgb(0,126,255)")
  wiredCables(160, 175, 1, "rgb(0,126,255)")
  //8 吊钩区域文字     
//   drawText('尾臂: ', 20, 35, "#01adec", '18px 微软雅黑', "left")
//   drawText('12.5米', 65, 35, "#01adec", '18px 微软雅黑', "left")
//   drawText('倾角: ', 20, 240, "#01adec", '18px 微软雅黑', "left")
//   drawText('0°', 65, 240, "#01adec", '18px 微软雅黑', "left")
//   //   drawText('更新时间: ', 75, 430, "#01adec", '18px 微软雅黑', "left")
//   //   drawText('2018-11-12', 160, 430, "#01adec", '18px 微软雅黑', "left")
//   //   drawText('14:57:30', 275, 430, "#01adec", '18px 微软雅黑', "left")
//   drawText('长臂: ', 280, 35, "#01adec", '18px 微软雅黑', "left")
//   drawText('30.26米', 325, 35, "#01adec", '18px 微软雅黑', "left")






}
