import { ReactComponent as Indicicator } from "./ActivityIndicator.svg";
const ActivityIndicator = (props) => {
  const {
    animating = true,
    style,
    color = "rgb(29, 161, 242)",
    size,
  } = props || {};
  if (!animating) {
    return null;
  }

  const { transform } = style || {};

  let indicatorSize = size === "large" ? 36 : 20;
  return (
    <Indicicator
      fill={color}
      width={indicatorSize}
      height={indicatorSize}
      style={{ transform, margin: "auto" }}
    />
  );
};

export default ActivityIndicator;
