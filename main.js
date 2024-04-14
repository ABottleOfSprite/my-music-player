const background = document.getElementById("backgroundImg");
const nextBtn = document.getElementById("forward");
const previousBtn = document.getElementById("back");
const artist = document.getElementById("artist");
const songTitle = document.getElementById("songTitle");
const pause = document.getElementById("pause");
const play = document.getElementById("play");
const backgroundList = ["background-1.jpg", "background-2.jpg", "background-3.jpg", "background-4.jpg", "background-5.jpg"];
const artistList = ["Kelvin Momo & Stixx", "Adekunle Gold", "JID", "Xander & Brillion", "Kelvin Momo & Sjava"];
const songTitleList = ["Uku Khanya", "Okay", "Stars", "Everlasting", "Uthando"];

function nextSong() {
  // Get the current image source
  let currentImage = background.src.split('/').pop();

  // Get the index of the current image in the backgroundList array
  let currentIndex = backgroundList.indexOf(currentImage);

  //if the index of the current image is the last, loop back to the first song
  if (currentIndex === backgroundList.length - 1) {
    currentIndex = 0; 
  } else {
    currentIndex ++ //otherwise, move to the next song
  }

  background.src = "images/" + backgroundList[currentIndex];
  artist.innerText = artistList[currentIndex];
  songTitle.innerText = songTitleList[currentIndex];
}

function previousSong() {
  // Get the current image source
  let currentImage = background.src.split('/').pop();

  // Get the index of the current image in the backgroundList array
  let currentIndex = backgroundList.indexOf(currentImage);

  //if the index of the current song is the first, loop back to the last song
  if (currentIndex === 0) {
    currentIndex = backgroundList.length - 1; 
    
  } else {
    currentIndex -- //otherwise, move to the previous song
  }

  //set the src attribute of the image to the next song in the array
  background.src = "images/" + backgroundList[currentIndex];
  artist.innerText = artistList[currentIndex];
  songTitle.innerHTML = songTitleList[currentIndex];
}




nextBtn.addEventListener('click', nextSong);
previousBtn.addEventListener('click', previousSong);