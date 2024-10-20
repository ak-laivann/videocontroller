import { useEffect, useRef, useState } from "react";
// import "./App.css";
import { Typography, Row, Col, message } from "antd";
import {
  FullScreenElement,
  PausePlayElement,
  PIPElement,
  SpeedController,
} from "./Functions";

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  // since the ref wont be updated on the first render, using useeffect to force rerender for the first time so that the ref will be updated with html video element and can be passed to the components
  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === "VIDEO_FOUND") {
        message.success("Video found!");
        const videoElement = document.querySelector(
          "video"
        ) as HTMLVideoElement;
        if (videoElement) {
          videoRef.current = videoElement;
        }
      } else if (request.type === "VIDEO_NOT_FOUND") {
        message.error("No video found");
      }
    });
  }, []);

  return (
    <div
      className="App"
      // style={
      //   {
      // width: "300px",
      // height: "70vh",
      // position: "fixed",
      // the below will be used for repositioning this as widget so that this may be used anywhere on the website.
      // For reference, https://github.com/PaulleDemon/font-tester-chrome
      // top: "20px",
      // left: "70%",
      // right: "auto",
      // bottom: "auto",
      //   }
      // }
    >
      {/* for testing purposes */}
      {/* <video
        ref={videoRef}
        width="100%"
        height="240px"
        controls
        src="https://www.w3schools.com/html/mov_bbb.mp4" // Replace with your video URL
        style={{ marginBottom: "20px" }}
      >
        Your browser does not support the video tag.
      </video> */}
      <Typography.Title color="#01579b" italic={true} level={2}>
        Video Controller
      </Typography.Title>
      <Row gutter={[12, 48]}>
        <Col span={8}>
          <FullScreenElement videoRef={videoRef} />
        </Col>
        <Col span={8}>
          <PIPElement videoRef={videoRef} />
        </Col>
        <Col span={8}>
          <PausePlayElement videoRef={videoRef} speed={playbackRate} />
        </Col>
        <Col span={24}>
          <SpeedController
            videoRef={videoRef}
            setPlaybackRate={setPlaybackRate}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
