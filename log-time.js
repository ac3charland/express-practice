var moment = require('moment')

module.exports = options => (
    (req, res, next) => {
        let displayTime
        if (req.requestTime && options.format) {
            displayTime = moment(req.requestTime).format(options.format)
        }
        if (displayTime) {
            console.log(`Request received ${displayTime}`)
        }
    }
)