var CANVAS_WIDTH = 900,
    CANVAS_HEIGHT = 700,
    triangles = [],
    currentVertices = [],
    clickCount = 0,
    canvas = document.getElementById('trianglesCanvas'),
    context = canvas.getContext('2d'),
	tempCanvas = document.getElementById('tempMovementCanvas'),
    tempContext = tempCanvas.getContext('2d');
    
    canvas.setAttribute('width', CANVAS_WIDTH);
    canvas.setAttribute('height', CANVAS_HEIGHT);
	
    tempCanvas.setAttribute('width', CANVAS_WIDTH);
    tempCanvas.setAttribute('height', CANVAS_HEIGHT);
    
$(tempCanvas).on('click', clickHandler);
$(tempCanvas).on('mousemove', moveHandler);


        console.log(clickCount);

function clickHandler (ev) {
    ev = ev || event;
    tempContext.beginPath();
    tempContext.arc(ev.clientX, ev.clientY, 5 , 0, 2*Math.PI);
    tempContext.fill();
    //point.draw(CornerStone.context, ev.clientX, ev.clientY);
    //dragData.push([ev.clientX, ev.clientY]);
    /*clickCount++;
    console.log(clickCount);
    if (clickCount == 3) {
        var a = new CornerStone.Point(dragData[0][0], dragData[0][1]),
            b = new CornerStone.Point(dragData[1][0], dragData[1][1]),
            c = new CornerStone.Point(dragData[2][0], dragData[2][1]),
                points = drawTriangle(CornerStone.context);

        definingPoints.push(a);
        definingPoints.push(b);
        definingPoints.push(c);
        elements.triangles.push(new CornerStone.Triangle(a, b, c, points));
        this.first = a;
        this.second = b;
        this.third = c;

        clickCount = 0;
        CornerStone.tempContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }*/
}

function moveHandler(ev) {

}

function point(x, y) {
    return {x: x, y: y}
}