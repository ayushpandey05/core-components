import React from "react";
import { defaultStyle, runFunction } from "./Utility";

class View extends React.Component {
  onLayout = () => {
    const { onLayout } = this.props;
    this.viewRef &&
      onLayout &&
      onLayout({
        nativeEvent: { layout: this.viewRef.getBoundingClientRect() },
      });
  };

  componentDidMount() {
    this.onLayout();
  }
  componentDidUpdate() {
    this.onLayout();
  }
  render() {
    const {
      style,
      children = void 0,
      onMouseDown,
      onMouseUp,
      onPointerDown,
      onPointerUp,
      getRef,
      ...restProps
    } = this.props;
    return (
      <div
        style={{ ...defaultStyle, ...style }}
        {...restProps}
        ref={(e) => {
          this.viewRef = e;
          runFunction(getRef, e);
        }}
      >
        {children}
      </div>
    );
  }
}

export default View;
