import React from "react";
import StyleSheet from "./StyleSheet";
import { getNumberOfLineStyle } from "./Utility";

const Text = (props) => {
  let { style = {}, numberOfLines: propsNumberOfLines, ...rest } = props;

  if (Array.isArray(style)) {
    style = StyleSheet.flatten(style);
  }

  let { numberOfLines, whiteSpace, lineHeight, ...restStyle } = style;
  if (numberOfLines === undefined && propsNumberOfLines !== undefined) {
    numberOfLines = propsNumberOfLines;
  }
  if (numberOfLines) {
    restStyle = { ...restStyle, ...getNumberOfLineStyle({ numberOfLines }) };
  }
  if (whiteSpace) {
    restStyle["whiteSpace"] = whiteSpace; //rohit bansal 20-12-18 to override whiteSpace:pre if given
  }
  if (lineHeight) {
    if (typeof lineHeight === "number") {
      lineHeight = lineHeight + "px";
    }
    restStyle["lineHeight"] = lineHeight;
  }
  return <div {...rest} style={restStyle} />;
};

export default Text;
