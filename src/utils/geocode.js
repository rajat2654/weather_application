const request = require('request')

const geocode = (address, handle_data) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFqYXQ5NzUzMyIsImEiOiJjazdwMGx4N2YwMmd3M2lqeTU5cmlkZjNkIn0.PM6A2tscnv207nsKCe5poA&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            handle_data("Unable to access Map API", undefined)
        }
        else if (body.features.length === 0 || !body.features) {
            handle_data("Unable to find the location", undefined)
        }
        else {
            handle_data(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode