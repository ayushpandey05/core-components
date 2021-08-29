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

  let { transform } = style || {};
  let transformStyle = null;
  if (Array.isArray(transform)) {
    transformStyle = "";
    transform.forEach((item) => {
      let key = Object.keys(item)[0];
      transformStyle = transformStyle + `${key}(${item[key]})`;
    });
    transformStyle = { transform: transformStyle };
  } else {
    transformStyle = { transform };
  }

  let indicatorSize = size === "large" ? 36 : 20;
  return (
    <Indicicator
      fill={color}
      width={indicatorSize}
      height={indicatorSize}
      style={{ ...transformStyle, alignSelf: "center" }}
    />
  );
};

export default ActivityIndicator;
