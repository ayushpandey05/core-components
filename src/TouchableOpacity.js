import React from "react";
import { defaultStyle, detectMob, runFunction } from "./Utility";

class TouchableOpacity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    if (props?.innerRef && typeof props.innerRef !== "function") {
      this.touchableOpacityRef = props.innerRef;
    } else {
      this.touchableOpacityRef = React.createRef();
    }
  }

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
    const { onMouseLeave, onPointerLeave } = this.props;
    this.state.active && this.setState({ active: false });
    if (this.isMobile) {
      runFunction(onPointerLeave, e);
    } else {
      runFunction(onMouseLeave, e);
    }
  };
  onLongPress = (e) => {
    const { onLongPress } = this.props;
    runFunction(onLongPress, e);
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
    if (typeof this.props?.innerRef === "function") {
      this.touchableOpacityRef = this.touchableOpacityRef.current;
      this.props.innerRef(this.touchableOpacityRef);
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
    } else {
      extraProps.onMouseDown = this.onMouseDown;
      extraProps.onMouseUp = this.onMouseUp;
      extraProps.onMouseLeave = this.onMouseLeave;
    }
    return (
      <div
      {...restProps}
        style={{ cursor: "pointer", ...defaultStyle, ...mergeedStyle }}
        onClick={this.onPress}
        onContextMenu={this.onLongPress}
        {...extraProps}
        ref={this.touchableOpacityRef}
      >
        {children}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <TouchableOpacity {...props} innerRef={ref} />
));
