import React from "react";
import { defaultStyle, detectMob, runFunction } from "./Utility";
import "./ScrollView.css";
class ScrollView extends React.Component {
  onMouseDown = (e) => {
    const { onMouseDown } = this.props;
    e.stopPropagation();
    runFunction(onMouseDown, e);
  };
  onLayout = () => {
    const { onLayout } = this.props;
    this.scrollViewRef &&
      onLayout &&
      onLayout({
        nativeEvent: { layout: this.scrollViewRef.getBoundingClientRect() },
      });
  };

  componentDidMount() {
    this.onLayout();
  }
  componentDidUpdate() {
    this.onLayout();
  }
  render() {
    const isMobile = detectMob();
    const {
      children = void 0,
      style,
      contentContainerStyle,
      horizontal,
      className,
      showsVerticalScrollIndicator = true,
      showsHorizontalScrollIndicator = true,
      getRef,
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

    let extraProps = {};
    if (isMobile) {
      extraProps.onPointerDown = this.onMouseDown;
    } else {
      extraProps.onMouseDown = this.onMouseDown;
    }
    return (
      <div
        className={modifiedClassName}
        style={{ flex: 1, ...defaultStyle, ...topViewStyle }}
        {...extraProps}
        ref={(e) => {
          this.scrollViewRef = e;
          runFunction(getRef, e);
        }}
      >
        <div style={{ ...defaultStyle, ...containerStyle }}>{children}</div>
      </div>
    );
  }
}

export default ScrollView;
