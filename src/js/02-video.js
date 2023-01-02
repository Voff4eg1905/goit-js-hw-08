let throttle = require('lodash.throttle');

// import throttle from 'lodash.throttle';
const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);
const timeToPlay = localStorage.getItem("videoplayer-current-time");


player.on('timeupdate', throttle ((function(data) {
    console.log(data.seconds);
    localStorage.setItem("videoplayer-current-time", data.seconds);
}), 1000));

player.setCurrentTime(timeToPlay).then( function(seconds) {
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            console.log("The time was less than 0 or greater than the video’s duration");
            break;

        default:
            console.log("Some  error occurred, please reload the page");
            break;
    }
});