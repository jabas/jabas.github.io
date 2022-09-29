var isPlaying = false;
var overlay = document.getElementById("overlay");

var player = new Vimeo.Player('lt-video', {
    url: 'https://player.vimeo.com/video/737661714?h=7132e50fc0',
    controls: false,
    texttrack: 'en-US',
});

player.setLoop(true);

overlay.onclick = PlayPauseVideo;

function PlayPauseVideo() {
    isPlaying = !isPlaying;
    if(isPlaying) {
        player.play();
        overlay.setAttribute('hidden', '');
    } else {
        player.pause();
        overlay.removeAttribute('hidden');
    }
}
