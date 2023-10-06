const canvas = document.getElementById("chart");
canvas.width = 500;
canvas.height = 500;
let R = 100
let width = canvas.width
let height = canvas.height
let chartColor = "#223963"
let inChartColor = "#7188B1"


const context = canvas.getContext("2d");
const mouse = {
    x: 0,
    y: 0,
    left: false,
    over: false,
    inChart: false
}

canvas.addEventListener('mouseenter', mouseEnterHandler)

canvas.addEventListener('mousemove', mouseMoveHandler)


canvas.addEventListener('mouseleave', mouseLeaveHandler)

canvas.addEventListener('mousedown', mouseDownHandler)

const R_arr = document.getElementsByName("R_button");

function mouseDownHandler(event) {
    let decartX = mouse.x - width / 2
    let decartY = -(mouse.y - height / 2)

    let flagR = false;
    let chosenR

    for (let i = 0; i < R_arr.length; i++) {
        if (R_arr[i].checked) {
            flagR = true;
            chosenR = R_arr[i].value
        }
    }
    if (flagR) { // R выбран
        let divX = 100 * 2
        let divY = 100 * 2
        let requestX = decartX / divX * chosenR
        let requestY = decartY / divY * chosenR
        // для R = 100 decartX, decartY
        // console.log(requestX, requestY)
        let data = new URLSearchParams({
            x: requestX,
            y: requestY,
            R: chosenR,
            mouse: true
        })

        let options = {
            method: 'POST',
            body: data,
        }

        fetch("control", options).then(response => {
            if (!response.ok) {
                throw new Error('Ошибка HTTP ' + response.status);
            }
            return response.text();
        })
            .then(data => {
                document.querySelector('html').innerHTML = data;
                updateJS()

            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });

        if (mouse.inChart) {
            console.log("in chart")
            clear(inChartColor)
        } else {
            console.log("clicked not in area")
        }

    } else {
        Toastify({
            text: 'R is not selected',
            duration: 2000,
            style: {
                background: "red"
            },
            offset: {
                x: 0,
                y: 0
            }
        }).showToast();
    }


}

function mouseEnterHandler(event) {
    mouse.over = true;

}

function mouseMoveHandler(event) {
    const rect = canvas.getBoundingClientRect()
    mouse.x = event.clientX - rect.left
    mouse.y = event.clientY - rect.top

}

function mouseLeaveHandler(event) {
    mouse.over = false;
}

document.addEventListener('DOMContentLoaded', function () {

    draw(chartColor)

});

function draw(color) {
//
    // let width = 500
    // let height = 500

    //
    // canvas.width = width;
    // canvas.height = height;

    let points = []
    let badPoints = []
    context.lineWidth = 2;


    let deltaY = 6
    let deltaX = 10
    context.font = "14px monospace"

    drawChart(context, width, height, R, color)

    context.fillStyle = 'white'
    context.strokeStyle = 'white'


    // x axis

    context.beginPath();
    context.moveTo(0, height / 2)
    context.lineTo(width, height / 2)
    context.stroke()
    context.closePath()

    // y axis

    context.beginPath();
    context.moveTo(width / 2, 0)
    context.lineTo(width / 2, height)
    context.stroke()
    context.closePath()

    // y arrow
    let length = 7
    context.beginPath();
    context.moveTo(width / 2 - length, length)
    context.lineTo(width / 2, 0)
    context.lineTo(width / 2 + length, length)
    context.fill()
    context.closePath()

    // x arrow

    context.beginPath();
    context.moveTo(width - length, height / 2 - length)
    context.lineTo(width - length, height / 2 + length)
    context.lineTo(width, height / 2)
    context.fill()
    context.closePath()

    // x text

    context.fillText('R/2', width / 2 + R, height / 2 - deltaY)
    context.fillText('R', width / 2 + R * 2, height / 2 - deltaY)

    context.fillText('-R/2', width / 2 - R - deltaX, height / 2 - deltaY)
    context.fillText('-R', width / 2 - R * 2 - deltaX, height / 2 - deltaY)

    //y text

    context.fillText('R/2', width / 2 + deltaX, height / 2 - R)
    context.fillText('R', width / 2 + deltaX, height / 2 - R * 2)

    context.fillText('-R/2', width / 2 + deltaX, height / 2 + R)
    context.fillText('-R', width / 2 + deltaX, height / 2 + R * 2)

    // points

    drawPoint(context, width / 2, height / 2, 5, 'white')

    drawPoint(context, width / 2 - R, height / 2, 5, 'white')
    drawPoint(context, width / 2 - R * 2, height / 2, 5, 'white')
    drawPoint(context, width / 2 + R, height / 2, 5, 'white')
    drawPoint(context, width / 2 + R * 2, height / 2, 5, 'white')
    drawPoint(context, width / 2, height / 2 - R, 5, 'white')
    drawPoint(context, width / 2, height / 2 - R * 2, 5, 'white')
    drawPoint(context, width / 2, height / 2 + R, 5, 'white')
    drawPoint(context, width / 2, height / 2 + R * 2, 5, 'white')


    let table = document.getElementsByTagName('table')[0]
    let rows = table.getElementsByTagName("tr")
    let lastRow = rows[rows.length - 1]
    let lastCells = lastRow.getElementsByTagName("td")
    let lastR = lastCells[2].innerText;

    try {
        for (let i = 1; i < rows.length; i++) {
            let row = rows[i];
            let cells = row.getElementsByTagName("td");
            let cellX = cells[0].innerText
            let cellY = cells[1].innerText
            let cellR = cells[2].innerText
            let result = cells[3].innerText

            let divX = width / 2.55
            let divY = height / 2.55

            let drawX, drawY

            if (lastR != null){
                drawX = cellX / lastR * divX + width / 2
                drawY = -(cellY / lastR * divY) + height / 2
            } else {
                drawX = cellX / cellR * divX + width / 2
                drawY = -(cellY / cellR * divY) + height / 2
            }

            if (result === 'true') {
                points.push([drawX, drawY])
            } else {
                badPoints.push([drawX, drawY])
            }


        }
    } catch (e) {

    }


    points.forEach(point => {
        drawPoint(context, point[0], point[1], 5, 'green')
    })
    badPoints.forEach(point => {
        drawPoint(context, point[0], point[1], 5, 'red')
    })
}


function drawPoint(context, x, y, R, color) {
    context.beginPath()
    context.moveTo(x, y)
    context.arc(x, y, R, 0, Math.PI * 2)
    context.fillStyle = color
    context.fill()
    context.closePath()
}

function drawChart(context, width, height, R, color) {
    context.fillStyle = color


    context.fillRect(width / 2, height / 2, -R, R * 2)

    //triangle
    context.beginPath()
    context.moveTo(width / 2, height / 2)
    context.lineTo(width / 2, height / 2 - R)
    context.lineTo(width / 2 - R * 2, height / 2)
    context.fill()
    context.closePath()

    //circle

    context.beginPath()
    context.moveTo(width / 2, height / 2)
    context.arc(width / 2, height / 2, R, 0, Math.PI / 2)
    context.fill()

}

function clear(color) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    draw(color)
}


requestAnimationFrame(update)

function checkPointInPolygon(point, vs) {
    let x = point[0], y = point[1];

    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1];
        let xj = vs[j][0], yj = vs[j][1];

        let intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

function checkPointInCircle(point, centerX, centerY, radius) {


    return (centerX - point[0]) ** 2 + (centerY - point[1]) ** 2 <= radius ** 2 && point[0] >= 0 && point[1] <= 0;
}

const triangle = [[width / 2, height / 2], [width / 2, (height / 2 - R)], [width / 2 - 2 * R, height / 2]]
const rect = [[width / 2 - R, height / 2], [width / 2, height / 2], [width / 2, height / 2 + 2 * R], [width / 2 - R, height / 2 + 2 * R]]
triangle.forEach(point => {
    point[0] -= width / 2
    point[1] = -(point[1] - height / 2)
})

rect.forEach(point => {
    point[0] -= width / 2
    point[1] = -(point[1] - height / 2)
})

function update() {
    requestAnimationFrame(update);

    let decartX = mouse.x - width / 2
    let decartY = -(mouse.y - height / 2)
    let point = [decartX, decartY]
    let inChart = checkPointInPolygon(point, triangle) || checkPointInPolygon(point, rect) || checkPointInCircle(point, 0, 0, R)
    mouse.inChart = inChart

    if (inChart) {
        clear(inChartColor)
    } else {
        clear(chartColor)
    }


}