var CANVAS_WIDTH = 900,
    CANVAS_HEIGHT = 700,
    triangles = [],
    currentVertices = [],
    clickCount = 0,
    savedSessions = JSON.parse(localStorage.getItem('savedSessions')) || [],
    canvas = document.getElementById('trianglesCanvas'),
    context = canvas.getContext('2d'),
	tempCanvas = document.getElementById('tempMovementCanvas'),
    tempContext = tempCanvas.getContext('2d'),
    colorPicker = document.getElementById('triangleFillColor'),
    clearButton = document.getElementById('clearCanvas'),
    saveButton = document.getElementById('save'),
    selectLoad = document.getElementById('loadOptions'),
    loadButton = document.getElementById('load'),
    menu = document.getElementById('rightSideMenu');
    
canvas.setAttribute('width', CANVAS_WIDTH);
canvas.setAttribute('height', CANVAS_HEIGHT);

tempCanvas.setAttribute('width', CANVAS_WIDTH);
tempCanvas.setAttribute('height', CANVAS_HEIGHT);

$(menu).css('left', CANVAS_WIDTH);

$(tempCanvas).on('click', clickHandler);
$(tempCanvas).on('mousemove', moveHandler);
$(colorPicker).on('change', changeFillColor);
$(clearButton).on('click', clearCanvas);
$(saveButton).on('click', saveToLocal);
$(loadButton).on('click', loadFromLocal);

loadSelectOptions();

function clickHandler (ev) {
    ev = ev || event;
    fillPoint(point(ev.clientX, ev.clientY));

    clickCount++;
    currentVertices.push(point(ev.clientX, ev.clientY));
    
    if (clickCount === 3) {
        triangles.push({
            points: currentVertices,
            color: context.fillStyle
        });
        fillTriangle(currentVertices);
        writeArea(context.fillStyle, currentVertices);

        clickCount = 0;
        currentVertices = [];
        tempContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function moveHandler(ev) {
    ev = ev || event;
    tempContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if(clickCount === 1) {
        fillPoint(currentVertices[0]);

        strokeLine([currentVertices[0], point(ev.clientX, ev.clientY)]);

    } else if (clickCount === 2) {
        fillPoint(currentVertices[0]);
        fillPoint(currentVertices[1]);

        strokeTriangle(currentVertices, point(ev.clientX, ev.clientY));
    }
}

function point(x, y) {
    return {x: x, y: y}
}

function fillTriangle(vertices) {
    context.beginPath();
    context.moveTo(vertices[0].x, vertices[0].y);
    context.lineTo(vertices[1].x, vertices[1].y);
    context.lineTo(vertices[2].x, vertices[2].y);
    context.fill();
}

function strokeTriangle(vertices, point) {
    tempContext.beginPath();
    tempContext.moveTo(vertices[0].x, vertices[0].y);
    tempContext.lineTo(vertices[1].x, vertices[1].y);
    tempContext.lineTo(point.x, point.y);
    tempContext.lineTo(vertices[0].x, vertices[0].y);
    tempContext.stroke();
}

function fillPoint(point) {
    tempContext.beginPath();
    tempContext.arc(point.x, point.y, 5 , 0, 2*Math.PI);
    tempContext.fill();
}

function strokeLine(points) {
    tempContext.beginPath();
    tempContext.moveTo(points[0].x, points[0].y);
    tempContext.lineTo(points[1].x, points[1].y);
    tempContext.stroke();
}

function changeFillColor (ev) {
    ev = ev || event;
    context.fillStyle = ev.target.value;
}

function clearCanvas () {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function loadSelectOptions () {
    for (var i = 0; i < selectLoad.options.length; i++) {
        selectLoad.remove(i);
    };

    for (var i = 0; i < savedSessions.length; i++) {
        var option = document.createElement("option");
        option.text = savedSessions[i].name;
        selectLoad.add(option);
    };
}

function saveToLocal () {
    var name = prompt("Name the current save:"),
        id = "save" + savedSessions.length;

    localStorage.setItem(id, JSON.stringify(triangles));

    savedSessions.push({id: id, name: name});
    localStorage.setItem("savedSessions", JSON.stringify(savedSessions));
    loadSelectOptions();
}

function loadFromLocal () {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    triangles = [];

    var selectedName = selectLoad.value,
        selectedId;

    for (var i = 0; i < savedSessions.length; i++) {
        if(savedSessions[i].name === selectedName) {
            selectedId = savedSessions[i].id;
        }
    }

    if (selectedId) {
        var retrievedObject = JSON.parse(localStorage.getItem(selectedId)),
            currentColor = context.fillStyle;

        for (var i = 0; i < retrievedObject.length; i++) {
           context.fillStyle = retrievedObject[i].color;
           fillTriangle(retrievedObject[i].points);
           writeArea(context.fillStyle, retrievedObject[i].points);

           triangles.push(retrievedObject[i]);
        };   

        context.fillStyle = currentColor;
    }
}

function triangleArea (points) {
    return Math.abs(((points[2].x - points[0].x) * (points[1].y - points[0].y) - 
            (points[1].x - points[0].x) * (points[2].y - points[0].y)) / 2.0);
}

function triangleCenter (points) {
    return {
        x: (points[0].x + points[1].x + points[2].x) / 3,
        y: (points[0].y + points[1].y + points[2].y) / 3
    }
}

function writeArea (triangleColor, trianglePoints) {

    console.log(triangleColor);
    var textColor = invertHex(triangleColor),
        textPosition = triangleCenter(trianglePoints),
        text = triangleArea(trianglePoints);


    context.textAlign = "center";
    context.textBaseline = "middle"; 
    context.fillStyle = textColor;
    context.fillText(text, textPosition.x, textPosition.y);

    context.fillStyle = triangleColor;
}

function invertHex(hexnum){
    hexnum = hexnum.replace('#', '');
    if(hexnum.length != 6) {
        alert("Hex color must be six hex numbers in length.");
        return false;
    }
        
    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";
        
    for(i=0; i<6; i++){
        if(!isNaN(splitnum[i])) {
            resultnum += simplenum[splitnum[i]]; 
        } else if(complexnum[splitnum[i]]){
            resultnum += complexnum[splitnum[i]]; 
        } else {
            alert("Hex colors must only include hex numbers 0-9, and A-F");
            return false;
        }
    }
        
    return resultnum;
}