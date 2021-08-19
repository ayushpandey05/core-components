import { ReactComponent as Indicicator } from "./ActivityIndicator.svg";
const ActivityIndicator = (props) => {
  const { animating = true, color = "rgb(29, 161, 242)", size } = props || {};
  if (!animating) {
    return null;
  }

  let indicatorSize = size === "large" ? 80 : 40;
  return (
    <Indicicator width={indicatorSize} height={indicatorSize} fill={color} />
  );
};

export default ActivityIndicator;
