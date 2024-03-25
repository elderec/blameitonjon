// Constants: Number of videos and DOM elements for video and source tags.
const VIDEO_COUNT = 34;
const videoElement = document.getElementById('clip');
const mp4Source = document.getElementById('mp4');
const webmSource = document.getElementById('webm');

// Function to generate a random integer between min and max, inclusive.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to load a random video that hasn't been played last.
function loadRandomVideo() {
  let lastVideoIndex = parseInt(localStorage.getItem('lastVideoIndex'));
  let videoIndex;

  // Ensure we pick a different video if there's a last video index saved
  do {
    videoIndex = getRandomInt(1, VIDEO_COUNT);
  } while (videoIndex === lastVideoIndex);

  // Update the video sources
  mp4Source.src = `images/${videoIndex}.mp4`;
  webmSource.src = `images/${videoIndex}.webm`;
  
  // Load the new video source into the video element and save the index
  videoElement.load();
  localStorage.setItem('lastVideoIndex', videoIndex.toString());
}

// Initialize the page by loading a random video.
loadRandomVideo();

// Set attributes to maintain consistent user experience.
videoElement.setAttribute('disableRemotePlayback', '');
videoElement.setAttribute('disablePictureInPicture', '');