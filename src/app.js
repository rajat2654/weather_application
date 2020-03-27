const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 5000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, "../public")))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "Please provide an address"
        })
    }
    geocode(address, (error, data) => {
        if (error) {
            res.send({
                error
            })
        }
        else {
            forecast(data, (error, pred) => {
                if (pred) {
                    res.send({
                        pred
                    })
                }
                else {
                    res.send({
                        error
                    })
                }
            })
        }
    })
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('*', (req, res) => {
    res.render('notfound', {
        message: "Page not found"
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
