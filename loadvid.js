    <!-- Load the video(s) -->
      // Constants: Number of videos and DOM elements for video and source tags.
      const VIDEO_COUNT = 34;
      const videoElement = document.getElementById('clip');
      const mp4Source = document.getElementById('mp4');
      const webmSource = document.getElementById('webm');

      // Function to generate a random integer between min and max, inclusive.
      // Used to select a random video index.
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // Function to load a random video.
      // It selects a random index and updates the source elements' src attributes.
      function loadRandomVideo() {
        const videoIndex = getRandomInt(1, VIDEO_COUNT);
        mp4Source.src = `images/${videoIndex}.mp4`;
        webmSource.src = `images/${videoIndex}.webm`;
        videoElement.load();  // Loads the new video source into the video element.
      }

      // Initialize the page by loading a random video.
      loadRandomVideo();

      // Set attributes to disable remote playback and picture-in-picture
      // to maintain consistent user experience across different browsers and devices.
      videoElement.setAttribute('disableRemotePlayback', '');
      videoElement.setAttribute('disablePictureInPicture', '');