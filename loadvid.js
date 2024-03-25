// Function to check if localStorage is available and usable
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0);
    }
}

// Constants: Number of videos and DOM elements for video and source tags.
const VIDEO_COUNT = 34;
const videoElement = document.getElementById('clip');
const mp4Source = document.getElementById('mp4');
const webmSource = document.getElementById('webm');
const bodyContent = document.getElementById('body-content');

// Function to generate a random integer between min and max, inclusive.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get URL parameters
function getVideoIndexFromURL() {
  const params = new URLSearchParams(window.location.search);
  const vid = params.get('vid');
  return vid && !isNaN(vid) && vid >= 1 && vid <= VIDEO_COUNT ? parseInt(vid, 10) : null;
}

// Function to create and insert the permalink below the video
function insertPermalink(videoIndex) {
    const permalinkContainer = document.createElement('div');
    permalinkContainer.setAttribute('class',"permalink")
  
    const permalink = document.createElement('a');
    permalink.href = `?vid=${videoIndex}`;
    permalink.title = 'Permalink to this reaction.'
    permalink.tabIndex = 1;
    permalink.accessKey = 'p';
    permalink.textContent = 'permalink';

    permalinkContainer.appendChild(permalink);
    bodyContent.appendChild(permalinkContainer);
}
  
// Main function to load the video
function loadVideo() {
  let videoIndex = getVideoIndexFromURL();

  if (!videoIndex) {
    let lastVideoIndex = null;
    if (storageAvailable('localStorage')) {
      lastVideoIndex = parseInt(localStorage.getItem('lastVideoIndex'), 10);
    }

    do {
      videoIndex = getRandomInt(1, VIDEO_COUNT);
    } while (videoIndex === lastVideoIndex);

    if (storageAvailable('localStorage')) {
      localStorage.setItem('lastVideoIndex', videoIndex.toString());
    }
  }

  // Update the video sources
  mp4Source.src = `images/${videoIndex}.mp4`;
  webmSource.src = `images/${videoIndex}.webm`;
  
  // Load the new video source into the video element
  videoElement.load();

  // Insert the permalink
  insertPermalink(videoIndex);
}

// Initialize the page by loading the video.
loadVideo();

// Set attributes to maintain consistent user experience.
videoElement.setAttribute('disableRemotePlayback', '');
videoElement.setAttribute('disablePictureInPicture', '');
