import React from "react";
import "./App.css";
import {
  Tag,
  Typography,
  Tooltip,
  Flex,
  Slider,
  SliderSingleProps,
  Row,
  Col,
} from "antd";
import {
  PauseCircleTwoTone,
  PlayCircleTwoTone,
  FullscreenOutlined,
  PictureTwoTone,
  DashboardTwoTone,
} from "@ant-design/icons";

const marks: SliderSingleProps["marks"] = {
  0: "0x",
  20: "1x",
  40: "2x",
  60: "3x",
  80: "4x",
  100: {
    style: {
      color: "#f50",
    },
    label: <strong>5x</strong>,
  },
};

function App() {
  return (
    <div
      // className="App"
      style={{
        width: "300px",
        height: "70vh",
        position: "fixed",
        // the below will be used for repositioning this as widget so that this may be used anywhere on the website.
        // For reference, https://github.com/PaulleDemon/font-tester-chrome
        top: "20px",
        left: "70%",
        right: "auto",
        bottom: "auto",
      }}
    >
      <Typography.Title color="#01579b" italic={true} level={2}>
        Video Controller
      </Typography.Title>
      <Row gutter={[12, 48]}>
        <Col span={6}>
          <Tooltip title="Pause">
            <Tag
              icon={
                <PauseCircleTwoTone
                  style={{ fontSize: "30px", margin: "7px" }}
                />
              }
            />
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title="Play">
            <Tag
              icon={
                <PlayCircleTwoTone
                  style={{ fontSize: "30px", margin: "7px" }}
                />
              }
            />
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title="Full Screen">
            <Tag
              icon={
                <FullscreenOutlined
                  style={{ fontSize: "30px", margin: "7px" }}
                />
              }
            />
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title="PIP">
            <Tag
              icon={
                <PictureTwoTone style={{ fontSize: "30px", margin: "7px" }} />
              }
            />
          </Tooltip>
        </Col>
        <Col span={24}>
          <Tag
            children={<Typography.Paragraph strong>Speed</Typography.Paragraph>}
            icon={
              <DashboardTwoTone style={{ fontSize: "30px", margin: "7px" }} />
            }
          />
          <Slider marks={marks} tooltip={{ open: false }} step={20} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
