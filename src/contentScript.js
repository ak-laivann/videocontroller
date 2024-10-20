chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get_video") {
    const video = document.querySelector("video");
    if (video) {
      sendResponse({ videoFound: true });
    } else {
      sendResponse({ videoFound: false });
    }
  }
});

function findVideo() {
  const videoElement = document.querySelector("video");

  if (videoElement) {
    console.log("Video element found:", videoElement);
    videoElement.pause();
    chrome.runtime.sendMessage({ type: "VIDEO_FOUND" });
  } else {
    console.log("No video element found.");
    chrome.runtime.sendMessage({ type: "VIDEO_NOT_FOUND" });
  }
}

const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      findVideo();
    }
  }
});

window.onload = () => {
  findVideo();
  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
};
