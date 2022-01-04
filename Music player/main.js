const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PlAYER_STORAGE_KEY = "F8_PLAYER";
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $("#progress");
const nextBtn = $('.btn-next');
const PreBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playlist');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    songs: [{
            name: 'Từ chối nhẹ nhàng thôi',
            singer: 'Bích Phương',
            path: './assets/music/TuChoiNheNahngThoi.mp3',
            image: './assets/img/BP.jpg'

        },
        {
            name: 'Chân ái',
            singer: 'Organge',
            path: './assets/music/ChanAi-OrangeKhoi-6225088.mp3',
            image: './assets/img/chanai.jpg'

        },
        {
            name: 'Một cú lừa',
            singer: 'Bích Phương',
            path: './assets/music/MotCuLua-BichPhuong-6288019.mp3',
            image: './assets/img/BP2.jpg'

        },
        {
            name: 'Sài Gòn đau lòng quá',
            singer: 'Bích Phương',
            path: './assets/music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3',
            image: './assets/img/saigon.jpg'

        },
        {
            name: 'Sài Gòn đau lòng quá',
            singer: 'Bích Phương',
            path: './assets/music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3',
            image: './assets/img/saigon.jpg'

        },

        {
            name: 'Sài Gòn đau lòng quá',
            singer: 'Bích Phương',
            path: './assets/music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3',
            image: './assets/img/saigon.jpg'

        },

        {
            name: 'Sài Gòn đau lòng quá',
            singer: 'Bích Phương',
            path: './assets/music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3',
            image: './assets/img/saigon.jpg'

        },



    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
`
        })
        playList.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, "currentSong", {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        //xử lý phóng to, thu nhỏ cd
        document.onscroll = () => {
            const scrollY = document.documentElement.scrollTop || window.scrollY;
            const newcdWidth = cdWidth - scrollY;
            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
            cd.style.opacity = newcdWidth / cdWidth;
        }

        //cd rotate
        const cdAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            interaction: 'infinite',
        })
        cdAnimate.pause();

        //Xử lý khi click play
        playBtn.onclick = function() {
            if (app.isPlaying) {
                audio.pause();

            } else {
                audio.play();
            }
        }


        //khi song đc play
        audio.onplay = function() {
            app.isPlaying = true;
            player.classList.add('playing');
            cdAnimate.play();
        }

        audio.onpause = function() {
            app.isPlaying = false;
            player.classList.remove('playing');
            cdAnimate.pause();
        }

        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const currentpercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = currentpercent;
            }
        }

        //xuwr lys tua nhacj
        progress.oninput = (e) => {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        // progress.oninput = (e) => {
        //         audio.pause();
        //         setTimeout(() => {
        //             audio.play();
        //         }, 1);

        //         const seekTime = e.target.value * (audio.duration / 100);
        //         audio.currentTime = seekTime;
        //     }
        //khi next bài hát
        nextBtn.onclick = function() {
                if (_this.isRandom) {
                    _this.playRandomSong();
                } else {
                    _this.nextSong();
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
            }
            //khi prev bài hát
        PreBtn.onclick = function() {
                if (_this.isRandom) {
                    _this.playRandomSong();
                } else {
                    _this.PrevSong();
                }
                audio.play();
                _this.render();
            }
            //play again
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle("active", _this.isRepeat);
        }

        //khi click random
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active", _this.isRandom);
        }

        //next song khi end
        audio.onended = function() {
                if (_this.isRandom) {
                    _this.playRandomSong();
                } else if (_this.isRepeat) {
                    audio.play();
                } else {
                    _this.nextSong();
                }
                audio.play();

            },


            playList.onclick = function(e) {
                const songNode = e.target.closest('.song:not(.active)');
                if (songNode || e.target.closest('.option')) {
                    if (songNode) {
                        _this.currentIndex = Number(songNode.dataset.index);
                        _this.loadCurrentSong();
                        _this.render();
                        audio.play();
                    }
                }
            }


        //phát khi click

    },
    // scrollToActiveSong: function() {
    //     setTimeout(function() {
    //         $('.song.active').scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'start',
    //         });
    //     }, 300);
    // },

    scrollToActiveSong: function() {
        if (this.currentIndex === 0) {
            document.documentElement.scrollTop = 0
        };
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        })
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (this.currentIndex === newIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    PrevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    start: function() {
        //Định nghĩa các thuộc tính cho object
        this.defineProperties();
        this.handleEvents();
        //tải thông tin bài hát đầu tiên vào ui khi chạy
        this.loadCurrentSong();
        this.render();
    }
}
app.start();