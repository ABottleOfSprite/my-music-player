const audioElements = []; // Array to store audio elements
const pauseBtn = document.getElementById('pause');
const playBtn = document.getElementById('play');
const seekScreen = document.getElementById('seekScreen');
const seekLine = document.getElementById('seekLine');
const viewportWidth = window.innerWidth;

let currentAudioIndex = 0; // Index of the currently playing audio
let isPlaying = false; // Declare that audio is not initially playing
let startTime;
let endTime;
let duration;
let timeElapsed;
let songPosition;
let seekPos;
let cursorPos;
let cursorPercentage;
let toPlayFrom = 0;



// Function to import audio elements into the array
function importAudioElements() {
  const audioTags = document.querySelectorAll('audio');
  audioTags.forEach(audioTag => {
      audioElements.push(audioTag);
  });
  duration = audioElements[currentAudioIndex].duration; //initialise the duration upon loading
  console.log(audioElements);
}

// Function to play audio
function playAudio() {
  if (toPlayFrom > 0) {
    audioElements[currentAudioIndex].currentTime = toPlayFrom;audioElements[currentAudioIndex].play();
    isPlaying = true;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-flex";
    startTime = Date.now();
    duration = audioElements[currentAudioIndex].duration;
  } else {
    audioElements[currentAudioIndex].play();
    isPlaying = true;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-flex";
    startTime = Date.now();
    duration = audioElements[currentAudioIndex].duration;
  }
  

  return startTime;
}

// Function to pause audio
function pauseAudio() {
  audioElements[currentAudioIndex].pause();
  isPlaying = false;
  playBtn.style.display = "inline-flex";
  pauseBtn.style.display = "none";
}

// Function to play next audio
function playNextAudio() {
  if (isPlaying) {
    pauseAudio();
    currentAudioIndex = (currentAudioIndex + 1) % audioElements.length;
    playAudio();
    startTime = Date.now();
    duration = audioElements[currentAudioIndex].duration;
    return startTime;
  } else {
    currentAudioIndex = (currentAudioIndex + 1) % audioElements.length;
  }
}

// Function to play previous audio
function playPrevAudio() {
  if (isPlaying) {
    pauseAudio();
    currentAudioIndex = (currentAudioIndex - 1 + audioElements.length) % audioElements.length;
    playAudio();
    startTime = Date.now();
    duration = audioElements[currentAudioIndex].duration;
    return startTime;
  } else {
    currentAudioIndex = (currentAudioIndex - 1 + audioElements.length) % audioElements.length;
  }
}

function seek() {
  if (isPlaying) {
    endTime = Date.now();
    timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
    songPosition = timeElapsed / duration;
    seekPos = (songPosition * 100);
    seekScreen.style.width = `${seekPos}vw`;
    seekLine.style.left = `${seekPos}vw`;
  }
  else {
    
  }
  toPlayFrom = timeElapsed;
}

importAudioElements();

setInterval(seek, 100)
// Add event listeners to control buttons
playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);
document.getElementById('forward').addEventListener('click', playNextAudio);
document.getElementById('back').addEventListener('click', playPrevAudio);
// Event listener for space key press
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) { // Check if spacebar is pressed
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }
});
