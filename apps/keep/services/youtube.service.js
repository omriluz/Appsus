var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let playerIds = []
    // that is supposed to be players = []
var player;

var players = document.querySelectorAll(".video-player");
players.forEach(function(player) {
    playerIds.push(player.id);
});

console.log('this is player ids', playerIds);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('RQUNgo', {
        height: '175',
        width: '180',
        videoId: 'tgbNymZ7vqY',
        // if other videos pop up use 'rel':0 in player vars otherwise delete this comment
        playerVars: {
            'rel': 0,
            'playsinline': 1
        },
    });
}