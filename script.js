const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

const audio = document.getElementById("audio")
const s1 = document.getElementById("s1")
const s2 = document.getElementById("s2")
const s3 = document.getElementById("s3")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const title = document.getElementById("title")
const musicCover = document.getElementById("music-cover")

const slides = ["https://s3.ax1x.com/2021/02/22/y7wLge.jpg", "https://s3.ax1x.com/2021/02/22/y7whu9.jpg", "https://s3.ax1x.com/2021/02/22/y7w6hT.jpg", "https://s3.ax1x.com/2021/02/22/y7wyNV.jpg",
    "https://s3.ax1x.com/2021/02/22/y7wD7q.jpg", "https://s3.ax1x.com/2021/02/22/y7wBBn.jpg", "https://s3.ax1x.com/2021/02/22/y7wATx.jpg", "https://s3.ax1x.com/2021/02/22/y7dvkV.jpg",
    "https://s3.ax1x.com/2021/02/22/y7dOwq.jpg", "https://s3.ax1x.com/2021/02/22/y7dbOs.jpg", "https://s3.ax1x.com/2021/02/22/y7dTSg.jpg", "https://s3.ax1x.com/2021/02/21/yTsT8f.jpg",
    "https://s3.ax1x.com/2021/02/21/yTsoPP.jpg", "https://s3.ax1x.com/2021/02/21/yTs55t.jpg"
]

// 音乐信息

const songs = ["交响梦", "复杂人生", "幸运大门", "I Think There's Something You Should Know", "You're Not Sorry", "回忆录", "安静了"]
const images = ["https://s3.ax1x.com/2021/02/22/yHnqYt.png", "https://s3.ax1x.com/2021/02/22/yHnLfP.jpg", "https://s3.ax1x.com/2021/02/22/yHuSmQ.jpg", "https://s3.ax1x.com/2021/02/22/yHnbFI.png",
    "https://s3.ax1x.com/2021/02/22/yHnXSf.jpg", "https://s3.ax1x.com/2021/02/22/yHnjl8.jpg", "https://s3.ax1x.com/2021/02/22/yHu9Ts.png"
]
const songslink = ["https://zihol.studio/sp/music/1.mp3",
        "https://zihol.studio/sp/music/2.mp3",
        "https://zihol.studio/sp/music/3.mp3",
        "https://zihol.studio/sp/music/4.mp3",
        "https://zihol.studio/sp/music/5.mp3",
        "https://zihol.studio/sp/music/6.mp3",
        "https://zihol.studio/sp/music/7.mp3"
    ]
    // 默认从第一首开始
var date_today = new Date();
random_num = date_today.getDate();
randsong = random_num % 7;

snum = random_num % 14;
s1.src = slides[snum];
s2.src = slides[snum];
s3.src = slides[snum];

let songIndex = randsong;
// 将歌曲细节加载到DOM
loadSong(songs[songIndex])
    // 更新歌曲细节
function loadSong(song) {
    title.innerHTML = song
    audio.src = songslink[songIndex];
    musicCover.src = images[songIndex];
}

// 播放歌曲
function playSong() {
    // 元素添加类名
    musicContainer.classList.add("play")
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

// 停止播放
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// 上一首
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    // 加载歌曲信息并播放
    loadSong(songs[songIndex])
    playSong()
}
// 下一首
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// 进度条更新
function updateProgress(e) {
    // audio.duration: 音频长度
    // audio.currentTime: 音频播放位置
    // 对象解构操作
    const {
        duration,
        currentTime
    } = e.target;
    // e.target = {
    //     duration: 225,  // 当前音频时间长度 
    //     currentTime:0  // 当前播放时间
    // }
    const progressPercent = (currentTime / duration) * 100
        // 进度条
    progress.style.width = `${progressPercent}%`
}
// 设置进度条
function setProgress(e) {
    // progressContainer代理视图宽度
    const width = this.clientWidth
        // 鼠标点击时处于progressContainer里的水平偏移量
    const clickX = e.offsetX

    // audio.duration: 音频长度
    const duration = audio.duration

    // audio.currentTime: 音频播放位置
    audio.currentTime = (clickX / width) * duration
}
// 事件监听
// 1.播放歌曲
playBtn.onclick = function() {
        // 判断当前是否是正在播放

        // const isPlaying = musicContainer.classList.contains('play')
        // if (isPlaying) {
        //     pauseSong()
        // } else {
        //     playSong()
        // }
        musicContainer.classList.contains('play') ? pauseSong() : playSong()
    }
    // 2.切换歌曲
prevBtn.onclick = prevSong
nextBtn.onclick = nextSong

// 3.播放器进度条相关
// 3.1 设置播放进度
progressContainer.onclick = setProgress
    // 3.2 进度条更新
audio.ontimeupdate = updateProgress
    // 3.3 歌曲结束后自动下一首
audio.onended = nextSong