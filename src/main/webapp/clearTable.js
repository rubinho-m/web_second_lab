document.getElementById("clear_button").addEventListener("click", function () {
    let data = new URLSearchParams({
        clear: true,
        path: 'main'
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
            document.getElementById("tableStore").innerHTML = data;
            // document.querySelector('html').innerHTML = data;
            // window.location.reload()

        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
})

// function doJS() {
//     fs.readFile('script.js', 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         eval(data)
//     })
// }