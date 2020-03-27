const request = require('request')

const forecast = (data, handle_data) => {
    const url = `https://api.darksky.net/forecast/0ed76c33df079cd19044828f2d42f4e0/${data.lat},${data.long}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            handle_data("Unable to access weather API", undefined)
        }
        else if (body.code) {
            handle_data("Unable to find location", undefined)
        }
        else {
            var curr_data = body.currently
            var daily_data = body.daily.data[0]
            // fs.writeFileSync("data.json", JSON.stringify(data))
            handle_data(undefined, `It is currently ${curr_data.temperature} degrees out in ${data.place}. There is a ${curr_data.precipProbability * 100}% chance of rain. Maximum temperature will be ${daily_data.temperatureHigh} and minimum temperature will be ${daily_data.temperatureLow} today.`)
        }
    })
}

module.exports = forecast