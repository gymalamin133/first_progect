const songs = [
        {
                songName: 'abcd',
                song: 'https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg',
        },
        {
                songName: 'xyz',
                song: 'http://codeskulptor-demos.commondatastorage.googleapis.com/descent/Zombie.mp3',

        },
        {
                songName: 'lkj',
                song: 'http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.ogg',
        },
        {
                songName: 'abcd',
                song: 'https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg',
        },
        {
                songName: 'xyz',
                song: 'http://codeskulptor-demos.commondatastorage.googleapis.com/descent/Zombie.mp3',

        },
        {
                songName: 'lkj',
                song: 'http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.ogg',
        }
]


const audio = document.querySelector('.audio');
const play_pause = document.querySelector('.play_pause');
const currentTime= document.querySelector('.player span');
const endTime= document.querySelector('.player span:last-child');
const volume = document.querySelector('.volume');
const progress = document.querySelector('.progress');
const progressRange = document.querySelector('.player input')
const song_list = document.querySelector('.song_list');


(()=>{
        let html = ""
        songs.forEach(song =>{
                html += `
                <div class="song" data-song=${song.song}>
    <h4>${song.songName}</h4>
  </div>
                `
        })
        song_list.innerHTML = html;
})();

const allSong = document.querySelectorAll('.song')


allSong.forEach(song =>{
        song.addEventListener('click', (e) =>{
                allSong.forEach(song => song.classList.remove('selected_song'))
                song.classList.add('selected_song')
                changeSong(song.getAttribute('data-song'));
        })
})

const changeSong = (src) =>{
        audio.src = src;
        isPlay = false;
        playPause();
}


let isPlay = false;

const playPause = () =>{
        if(isPlay){
                isPlay = false;
                audio.pause();
                play_pause.innerHTML = 'play'
        }else{
                isPlay = true;
                audio.play();
                play_pause.innerHTML = 'pause'
        }
}

play_pause.addEventListener('click', playPause)

// format current/duration time
function convertHMS(value) {
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours   = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
    }
    
//     set current and duration
    audio.addEventListener('loadedmetadata' ,() =>{
        currentTime.innerHTML = convertHMS(audio.currentTime)
        endTime.innerHTML = convertHMS(audio.duration)
        console.log(audio.duration)
        progressRange.setAttribute('max', audio.duration)
    })



volume.addEventListener('change', (e) =>{
        audio.volume = e.target.value / 100
}) 
//update progress 
const updateProgress = () =>{
        progress.style.left = `
        ${(audio.currentTime / audio.duration)* 100}%

        `
}
        
//update current time
audio.addEventListener('timeupdate', () =>{
        currentTime.innerHTML = convertHMS(audio.currentTime)
        updateProgress()
 
})

//seek video
progressRange.addEventListener('change', (e) =>{
        audio.currentTime = e.target.value}) 

        
        
