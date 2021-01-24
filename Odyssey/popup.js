//  This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player, play, pause, stop, volume, time;

play = document.getElementById("play");
pause = document.getElementById("pause");
stop = document.getElementById("stop");
volume = document.getElementById("volume");
time = document.getElementById("time");

//  This function creates an <iframe> (and YouTube player)
//  after the API code downloads.
function onYouTubeIframeAPIReady() {
	player = new YT.Player('youtube-player', {
		height: '0',
		width: '0',
		videoId: 'tAGnKpE4NCI',
		playerVars: { 'controls': 2 },
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		},
	});
}

//  The API will call this function when the video player is ready.
function onPlayerReady(event) {
	player.playVideo();
}
//  The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
	time.max = player.getDuration();
	player.addEventListener("onStateChange", updateTime);
}

function updateTime() {
	if (YT.PlayerState.PLAYING) {
		time.value = player.getCurrentTime();
		setTimeout(updateTime, 2000);
	}
}

play.onclick = function () {
	player.playVideo();
}

pause.onclick = function () {
	player.pauseVideo();
}

stop.onclick = function () {
	player.stopVideo();
}

volume.onclick = function (e) {
	player.setVolume(e.target.value);
}

time.onclick = function (e) {
	player.seekTo(e.target.value, true);
}

