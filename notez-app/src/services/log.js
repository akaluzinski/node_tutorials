const process = require('process');

function log(...msg) {
    const isLogEnabled = process.env.IS_LOG_ENABLED === 'true';
    if (isLogEnabled) {
        console.log(...msg);
    }
}

module.exports = {
    log
}
