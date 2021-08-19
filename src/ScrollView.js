import React from "react";
import { defaultStyle } from "./Utility";
import "./ScrollView.css";
class ScrollView extends React.Component {
  render() {
    const {
      children = void 0,
      style,
      contentContainerStyle,
      horizontal,
      className,
      showsVerticalScrollIndicator = true,
      showsHorizontalScrollIndicator = true,
    } = this.props;

    let modifiedClassName = className || "";

    let topViewStyle = { ...style };
    let containerStyle = { ...contentContainerStyle };
    delete topViewStyle?.overflow;
    delete containerStyle?.overflow;
    delete containerStyle?.overflowX;
    delete containerStyle?.overflowY;
    if (horizontal) {
      topViewStyle.flexDirection = "row";
      topViewStyle.overflowX = "auto";
      topViewStyle.overflowY = "hidden";
      containerStyle.flexDirection = "row";
      if (!showsHorizontalScrollIndicator) {
        modifiedClassName = `${className} hide-scroll-indicator`;
      }
    } else {
      topViewStyle.flexDirection = "column";
      topViewStyle.overflowX = "hidden";
      topViewStyle.overflowY = "auto";
      containerStyle.flexDirection = "column";
      if (!showsVerticalScrollIndicator) {
        modifiedClassName = `${className} hide-scroll-indicator`;
      }
    }
    return (
      <div
        className={modifiedClassName}
        style={{ flex: 1, ...defaultStyle, ...topViewStyle }}
      >
        <div style={{ ...defaultStyle, ...containerStyle }}>{children}</div>
      </div>
    );
  }
}

export default ScrollView;
