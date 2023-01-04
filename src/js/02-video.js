let throttle = require('lodash.throttle');

// import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const timeToPlay = localStorage.getItem('videoplayer-current-time');

player.on(
  'timeupdate',
  throttle(function (data) {
    console.log(data.seconds);
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000)
);

if (timeToPlay !== null) {
  player.setCurrentTime(timeToPlay);
}
