const cron = require('cron');
const https = require('https');

const url = 'https://soyummy-h1wx.onrender.com/avatars/basic_avatar.png';
const job = new cron.CronJob('*/14 * * * *', function () {

    console.log('Restarting server');

    https.get(url, (res) => {
        if (res.statusCode === 200) {
            console.log('Server restarted');
        } else {
            console.error(`Failed to restart the server with status: ${res.statusCode}`);
        }
    })
    .on('error', (error) => {
        console.error("Error during restart:", error.message);
    });
});

module.exports = { job: job }