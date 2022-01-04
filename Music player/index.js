const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');

const app = {
    currentIndex: 0,
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
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
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
        $('.playlist').innerHTML = htmls.join('')
    },

    handleEvent: function() {
        const cdWidth = cd.offsetWidth;
        document.onscroll = () => {
                const scrollTop = window.scrollY;
                const newWidth = cdWidth - scrollTop;
                cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
                cd.style.opacity = newWidth / cdWidth;
            },

            playBtn.onclick = () => {
                app.isPlaying = true;
                if (app.isPlaying) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }

        audio.onPlay = () => {
            app.isPlaying = true;
            player.classList.add('playing');
        }
        audio.onPause = () => {
            app.isPlaying = false;
            player.classList.remove('playing');
        }
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    loadcurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    start: function() {
        this.defineProperties();
        this.loadcurrentSong();
        this.render();
    }

}
app.start();