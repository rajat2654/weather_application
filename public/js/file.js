console.log("jS loaded next")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('.m1')
const msg2 = document.querySelector('.m2')
var name, prop


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loc = search.value
    console.log(loc)
    msg1.textContent = ''
    msg2.textContent = ''

    if (loc.length) {
        fetch(`/weather?address=${loc}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    name = "Error"
                    prop = data.error
                }
                else {
                    name = "Weather update"
                    prop = data.pred
                }

                msg1.textContent = name
                msg2.textContent = prop
                search.value = ''
            })
        })
    }
    else {
        msg1.appendChild(document.createTextNode("Please enter address"))
    }
})