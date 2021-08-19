import { ReactComponent as Indicicator } from "./ActivityIndicator.svg";
import View from "./View";
import "./ActivityIndicator.css";
const ActivityIndicator = (props) => {
  const { animating = true, color = "rgb(29, 161, 242)", size } = props || {};
  if (!animating) {
    return null;
  }

  let indicatorSize = size === "large" ? 40 : 20;
  let borderWidth = size === "large" ? 4 : 3;
  return (
    <View>
      <Indicicator width={indicatorSize} height={indicatorSize} fill={color} />
    </View>
  );

  return (
    <div
      style={{
        width: indicatorSize,
        height: indicatorSize,
        borderStyle: "solid",
        borderColor: "transparent",
        borderLeftColor: color,
        borderWidth,
        borderRadius: "50%",
        background: "transparent",
        animationIterationCount: "infinite",
        animationDuration: "1s",
        animationTimingFunction: "linear",
        position: "relative",
        animationName: "default-loader-for-web",
      }}
    ></div>
  );
};

export default ActivityIndicator;
