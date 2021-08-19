import React from "react";
import { defaultStyle, detectMob, runFunction } from "./Utility";

class TouchableOpacity extends React.Component {
  state = { active: false };
  onPress = (e) => {
    e.stopPropagation();
    const { onPress } = this.props;
    runFunction(onPress, e);
  };
  onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { onPressIn } = this.props;
    if (e?.button === 0) {
      !this.state.active && this.setState({ active: true });
    }
    runFunction(onPressIn, e);
  };
  onMouseUp = (e) => {
    const { onPressOut } = this.props;
    this.state.active && this.setState({ active: false });
    runFunction(onPressOut, e);
  };
  onMouseLeave = (e) => {
    const { onMouseLeave } = this.props;
    this.state.active && this.setState({ active: false });
    runFunction(onMouseLeave, e);
  };
  onLongPress = (e) => {
    const { onLongPress } = this.props;
    runFunction(onLongPress, e);
  };
  render() {
    const isMobile = detectMob();
    const {
      activeOpacity = 0.2,
      style,
      children = void 0,
      ...restProps
    } = this.props;
    const { active } = this.state;
    let mergeedStyle = style;
    if (active) {
      mergeedStyle = { ...mergeedStyle, opacity: activeOpacity };
    }
    let extraProps = {};
    if (isMobile) {
      extraProps.onPointerDown = this.onMouseDown;
      extraProps.onPointerUp = this.onMouseUp;
      extraProps.onPointerLeave = this.onMouseLeave;
    } else {
      extraProps.onMouseDown = this.onMouseDown;
      extraProps.onMouseUp = this.onMouseUp;
      extraProps.onMouseLeave = this.onMouseLeave;
    }
    return (
      <div
        style={{ cursor: "pointer", ...defaultStyle, ...mergeedStyle }}
        {...restProps}
        onClick={this.onPress}
        onContextMenu={this.onLongPress}
        {...extraProps}
      >
        {children}
      </div>
    );
  }
}

export default TouchableOpacity;
