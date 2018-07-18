const moment = require('moment')

let now = () => {
    return moment.utc().format()
}
module.exprts = {
    now: now
}