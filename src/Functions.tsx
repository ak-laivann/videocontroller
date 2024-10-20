import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
  PictureTwoTone,
} from "@ant-design/icons";
import { Tag, Tooltip, Slider } from "antd";
import React, { useReducer } from "react";
import {
  Action,
  CustomIcon,
  IconAndTooltipTitle,
  getSpeedValueBasedOnSliderValue,
  sliderMarks,
} from "./Utilities";

// although the full screen element doesnt need a state, since if you go full screen, you cannot view in the ui about the changes made in the tooltip title and icon
export const FullScreenElement = (props: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const initialState: IconAndTooltipTitle = {
    icon: FullscreenOutlined,
    title: "Full Screen",
  };

  const reducerFunction = (
    state: IconAndTooltipTitle,
    action: Action
  ): IconAndTooltipTitle => {
    switch (action.type) {
      case "default":
        return { ...state, icon: FullscreenOutlined, title: "Full Screen" };
      case "modified":
        return {
          ...state,
          icon: FullscreenExitOutlined,
          title: "Exit Full Screen",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialState);

  // the async await is added since the state will not be updated and be available immediately, so modified the normal function to async function to ensure that the rerenders happen first and then the state will be updated
  const handleFullScreenFunctionalities = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      dispatch({ type: "modified" });
    } else if (props.videoRef.current) {
      dispatch({ type: "default" });
      await props.videoRef.current.requestFullscreen();
    }
  };

  return (
    <Tooltip title={state.title}>
      <Tag
        icon={<CustomIcon icon={state.icon} />}
        onClick={handleFullScreenFunctionalities}
      />
    </Tooltip>
  );
};

export const PIPElement = (props: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const initialState: IconAndTooltipTitle = {
    icon: PictureTwoTone,
    title: "PIP",
  };

  const reducerFunction = (
    state: IconAndTooltipTitle,
    action: Action
  ): IconAndTooltipTitle => {
    switch (action.type) {
      case "default":
        return { ...state, icon: PictureTwoTone, title: "PIP" };
      case "modified":
        return {
          ...state,
          icon: PictureTwoTone,
          title: "Exit PIP",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const handlePIPFunctionalities = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      dispatch({ type: "default" });
    } else if (props.videoRef.current) {
      dispatch({ type: "modified" });
      await props.videoRef.current.requestPictureInPicture();
    }
  };

  return (
    <Tooltip title={state.title}>
      <Tag
        icon={<CustomIcon icon={state.icon} />}
        onClick={handlePIPFunctionalities}
      />
    </Tooltip>
  );
};

export const PausePlayElement = (props: {
  videoRef: React.RefObject<HTMLVideoElement>;
  speed: number;
}) => {
  const initialState: IconAndTooltipTitle & { playbackRate: number } = {
    icon: PlayCircleTwoTone,
    title: "Play",
    playbackRate: props.speed,
  };

  const reducerFunction = (
    state: IconAndTooltipTitle & { playbackRate: number },
    action: Action
  ): IconAndTooltipTitle & { playbackRate: number } => {
    switch (action.type) {
      case "default":
        return {
          ...state,
          icon: PlayCircleTwoTone,
          title: "Play",
          playbackRate: 1.0,
        };
      case "modified":
        return {
          ...state,
          icon: PauseCircleTwoTone,
          title: "Pause",
          playbackRate: 0.0,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const handlePausePlayFunctionalities = async () => {
    if (props.videoRef.current) {
      if (props.videoRef.current.paused) {
        props.videoRef.current.playbackRate = props.speed;
        await props.videoRef.current.play();
        dispatch({ type: "modified" });
      } else {
        dispatch({ type: "default" });
        await props.videoRef.current.pause();
      }
    }
  };

  return (
    <Tooltip title={state.title}>
      <Tag
        icon={<CustomIcon icon={state.icon} />}
        onClick={handlePausePlayFunctionalities}
      />
    </Tooltip>
  );
};

export const SpeedController = (props: {
  videoRef: React.RefObject<HTMLVideoElement>;
  setPlaybackRate: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleSpeedChange = (value: number) => {
    let newRate = getSpeedValueBasedOnSliderValue(value);

    props.setPlaybackRate(newRate);
    if (props.videoRef.current) {
      props.videoRef.current.playbackRate = newRate;
    }
  };

  return (
    <>
      Speed
      <Slider
        defaultValue={30}
        marks={sliderMarks}
        tooltip={{ open: false }}
        step={20}
        onChange={handleSpeedChange}
      />
    </>
  );
};
