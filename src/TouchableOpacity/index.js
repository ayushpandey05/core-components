import React from "react";
import { defaultStyle, detectMob, runFunction } from "../Utility";

class TouchableOpacity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    if (props?.innerref && typeof props.innerref !== "function") {
      this.touchableOpacityRef = props.innerref;
    } else {
      this.touchableOpacityRef = React.createRef();
    }
  }

  onPress = (e) => {
    e.stopPropagation();
    const { onPress, disabled } = this.props;
    !disabled && runFunction(onPress, e);
  };
  onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { onPressIn, disabled } = this.props;
    if (disabled) {
      return;
    }
    if (e?.button === 0) {
      !this.state.active && this.setState({ active: true });
    }
    runFunction(onPressIn, e);
  };
  onMouseUp = (e) => {
    const { onPressOut, disabled } = this.props;
    if (disabled) {
      return;
    }
    this.state.active && this.setState({ active: false });
    runFunction(onPressOut, e);
  };
  onMouseLeave = (e) => {
    const { onMouseLeave, onPointerLeave, disabled } = this.props;
    if (disabled) {
      return;
    }
    this.state.active && this.setState({ active: false });
    if (this.isMobile) {
      runFunction(onPointerLeave, e);
    } else {
      runFunction(onMouseLeave, e);
    }
  };
  onContextMenu = (e) => {
    const { onContextMenu, disabled } = this.props;
    !disabled && runFunction(onContextMenu, e);
  };
  onLongPress = (e) => {
    const { onLongPress, disabled } = this.props;
    !disabled && runFunction(onLongPress, e);
  };
  onLayout = () => {
    const { onLayout } = this.props;
    this.touchableOpacityRef &&
      onLayout &&
      onLayout({
        nativeEvent: {
          layout: this.touchableOpacityRef.getBoundingClientRect(),
        },
      });
  };

  componentDidMount() {
    this.touchableOpacityRef.current.measure = (callback) => {
      if (this.touchableOpacityRef) {
        let { x, y, top, left, width, height } =
          this.touchableOpacityRef.getBoundingClientRect();
        return runFunction(callback, x, y, width, height, x, y);
      }
    };
    if (typeof this.props?.innerref === "function") {
      this.touchableOpacityRef = this.touchableOpacityRef.current;
      this.props.innerref(this.touchableOpacityRef);
    }
    this.onLayout();
  }
  componentDidUpdate() {
    this.onLayout();
  }
  render() {
    this.isMobile = detectMob();
    const {
      activeOpacity = 0.2,
      style,
      children = void 0,
      onPress,
      ...restProps
    } = this.props;
    const { active } = this.state;
    let mergeedStyle = style;
    if (active) {
      mergeedStyle = { ...mergeedStyle, opacity: activeOpacity };
    }
    let extraProps = {};
    if (this.isMobile) {
      extraProps.onPointerDown = this.onMouseDown;
      extraProps.onPointerUp = this.onMouseUp;
      extraProps.onPointerLeave = this.onMouseLeave;
      extraProps.onContextMenu = this.onContextMenu;
    } else {
      extraProps.onMouseDown = this.onMouseDown;
      extraProps.onMouseUp = this.onMouseUp;
      extraProps.onMouseLeave = this.onMouseLeave;
    }
    return (
      <touchableopacity
        {...restProps}
        style={{ cursor: "pointer", ...defaultStyle, ...mergeedStyle }}
        onClick={this.onPress}
        onContextMenu={this.onLongPress}
        {...extraProps}
        ref={this.touchableOpacityRef}
      >
        {children}
      </touchableopacity>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <TouchableOpacity {...props} innerref={ref} />
));
