import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

export interface IconAndTooltipTitle {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>
  >;
}

export interface Action {
  type: "default" | "modified";
}

export const getSpeedValueBasedOnSliderValue = (
  sliderValue: number
): number => {
  let newRate = 1.0;
  switch (sliderValue) {
    case 0:
      newRate = 0.25;
      break;
    case 10:
      newRate = 0.5;
      break;
    case 20:
      newRate = 0.75;
      break;
    case 30:
      newRate = 1;
      break;
    case 40:
      newRate = 1.5;
      break;
    case 50:
      newRate = 2;
      break;
    case 60:
      newRate = 5;
      break;
    case 70:
      newRate = 10;
      break;
    case 80:
      newRate = 15;
      break;
    default:
      newRate = 1;
  }

  return newRate;
};

export const sliderMarks = {
  0: "0.25x",
  10: "0.5x",
  20: "0.75x",
  30: "1x",
  40: "1.5x",
  50: "2x",
  60: "5x",
  70: "10x",
  80: {
    style: { color: "#f50" },
    label: <strong>15x</strong>,
  },
};

export const CustomIcon = (props: {
  icon: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>
  >;
}) => {
  return <props.icon style={{ fontSize: "30px", margin: "7px" }} />;
};
