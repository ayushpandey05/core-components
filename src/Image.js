import React from "react";
import { getModifiedSvgProps } from "./Utility";

class Image extends React.Component {
  render() {
    const { source, style } = this.props;
    let modifiedStyle = { ...style };
    let modifiedSource = null;

    if (source?.svg) {
      let Component = source.svg;
      let svgProps = getModifiedSvgProps(style);
      return <Component {...svgProps} />;
    }

    if (source?.uri) {
      if (!style?.flex && !style?.width && !style?.height) {
        modifiedSource = "null";
      } else {
        modifiedSource = source.uri;
      }
    } else {
      modifiedSource = source;
      if (!style?.flex || !style.width || !style?.height) {
        modifiedStyle = {
          width: "100%",
          height: "100%",
          // objectFit: "contain",
          ...modifiedStyle,
        };
      }
    }

    return <img style={modifiedStyle} src={modifiedSource} alt="" />;
  }
}

export default Image;
