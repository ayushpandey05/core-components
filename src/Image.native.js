import React from "react";
import { Image } from "react-native";
const ImageNative = (props) => {
  if (props?.source?.svg) {
    const { source: { svg: Component } = {}, style } = props || {};
    let svgProps = {};
    if (style?.width) {
      svgProps.width = style.width;
    }
    if (style?.height) {
      svgProps.height = style.height;
    }
    if (style?.color) {
      svgProps.fill = style.color;
    }
    return <Component {...svgProps} />;
  }

  return <Image {...props} />;
};

export default ImageNative;
