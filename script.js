// constants from the DOM.
const music = document.querySelector('audio');
const playBtn = document.getElementById('play');
const nextSongBtn = document.getElementById('next');
const previousSongBtn = document.getElementById('previous');
const songTitle = document.querySelector('.title');
const songAartist = document.querySelector('.artist');
const songImage = document.querySelector('img');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const progressBarWrapper = document.querySelector('.progress-wrapper');
const progressBar = document.querySelector('.progress-bar');

// songs list.
const songs = [
    {
      name: "jacinto-1",
      displayName: "Electric Chill Machine",
      artist: "Maxine Sterling",
    },
    {
      name: "jacinto-2",
      displayName: "Seven Nation Army (Remix)",
      artist: "Jasper Quinn",
    },
    {
      name: "jacinto-3",
      displayName: "Seven Nation Army (Remix)",
      artist: "Jacinto Design",
    },
    {
      name: "metric-1",
      displayName: "Front Row (Remix)",
      artist: "Lila Evergreen",
    },
  ];

//Global variables
let isPlaying = false;
let currentSongIndex = 0;

//functions
function playMusic () {
  // if isPlaying true we wanna puase music otherwise play music
  // and change the style for the play button
  if(isPlaying) {
  music.pause();
  playBtn.classList.replace('fa-pause','fa-play')
  playBtn.attributes.title.textContent = 'play'
  }else {
    music.play();
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.attributes.title.textContent = 'pause'
  }
  // change the play state: play <==> pause
  isPlaying = !isPlaying;
}

function uploadSong () {
  //upload music info
    music.src = `music/${songs[currentSongIndex].name}.mp3`;
    songTitle.textContent = songs[currentSongIndex].displayName;
    songAartist.textContent = songs[currentSongIndex].artist;
    songImage.src = `img/${songs[currentSongIndex].name}.jpg`;
  // restart isPlaying  state to false then play the uploaded song
    isPlaying = false;
    playMusic();
}
function nextSong () {
  currentSongIndex<songs.length-1 ? currentSongIndex++
  : currentSongIndex = 0;
  uploadSong ();
}

function previousSong () {
  currentSongIndex>0 ? currentSongIndex--
  : currentSongIndex = songs.length-1;
  uploadSong ();
}

function updateTime (time, DOMelement) {
  // note that time is in seconds.
  // here we set the minutes.
  const minutes = Math.floor(time / 60);
  // here we set the rest of seconds after setting minutes (minutes:secondes).
  const secondes = Math.floor(time % 60);
  // update the DOM.
  DOMelement.textContent = `${String(minutes)}:${String(secondes).padStart(2,'0')}`;
}
function updateCurrentTime (event) {
  // update song time
  updateTime(event.srcElement.currentTime, currentTime);
  // update progress bar width
  const barPercentage = (event.srcElement.currentTime * 100) / music.duration;
  progressBar.style.width = `${barPercentage}%`;

}
function updateDurationTime () {
  updateTime(music.duration, duration);
}

function updateProgressBar (event) {
  // calculate the chosen width of the bar in percentage.
  const barPercentage = (event.offsetX * 100) / progressBarWrapper.clientWidth;
  // change the with of the bar.
  progressBar.style.width = `${barPercentage}%`;
  // change the song's current time based on the width of the bar. 
  const chosenTime = (barPercentage * music.duration) / 100;
  music.currentTime = chosenTime;
}

// Event listenrs
playBtn.addEventListener('click', playMusic);
nextSongBtn.addEventListener('click', nextSong);
previousSongBtn.addEventListener('click', previousSong);
music.addEventListener('loadeddata', updateDurationTime);
music.addEventListener('timeupdate', updateCurrentTime);
music.addEventListener('ended', nextSong);
progressBarWrapper.addEventListener('click', updateProgressBar);
