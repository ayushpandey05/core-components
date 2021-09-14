import React from "react";
import TouchableOpacity from "../TouchableOpacity";
import { runFunction } from "../Utility";
import View from "../View";
// import "./Pressable.css";
class Pressable extends React.PureComponent {
  state = { isPressed: false };

  startRipple = () => {
    this.setState({ isPressed: true });
  };
  stopRipple = () => {
    setTimeout(() => {
      this.setState({ isPressed: false });
    }, 300);
  };

  onMouseDown = (e) => {
    const { onPressIn, android_ripple } = this.props;
    if (android_ripple) {
      this.startRipple();
      this.stopRipple();
    }
    runFunction(onPressIn, e);
  };
  render() {
    const {
      children = null,
      android_ripple: { color = "transparent" },
      ...restProps
    } = this.props;
    const { isPressed } = this.state;
    const RenderChildren = () => {
      return children;
    };
    return (
      <TouchableOpacity
        {...restProps}
        onPressIn={this.onMouseDown}
        activeOpacity={1}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: `${isPressed ? "2" : "20"}%`,
              width: `${isPressed ? "100" : "0"}%`,
              height: `${isPressed ? "100" : "0"}%`,
              transition: isPressed ? "all 0.3s" : "",
              backgroundColor: color,
              opacity: 0.7
            }}
          ></View>
        </View>
        <RenderChildren />
      </TouchableOpacity>
    );
  }
}

export default Pressable;
