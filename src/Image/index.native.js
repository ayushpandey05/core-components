import React from "react";
import { Image } from "react-native";
import { getModifiedSvgProps } from "./Utility";
const ImageNative = (props) => {
  if (props?.source?.svg) {
    const { source: { svg: Component } = {}, style } = props || {};
    let svgProps = getModifiedSvgProps(style);
    return <Component {...svgProps} />;
  }

  return <Image {...props} />;
};

export default ImageNative;
