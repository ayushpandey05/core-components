import React from "react";
import { defaultStyle, detectMob, runFunction } from "./Utility";
import "./ScrollView.css";
class ScrollView extends React.Component {
  constructor(props) {
    super(props);
    if (props?.innerRef && typeof props.innerRef !== "function") {
      this.scrollViewRef = props?.innerRef;
    } else {
      this.scrollViewRef = React.createRef();
    }
  }
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
    this.scrollViewRef.current.measure = (callback) => {
      if (this.scrollViewRef) {
        let { x, y, top, left, width, height } =
          this.scrollViewRef.getBoundingClientRect();
        return runFunction(callback, x, y, width, height, x, y);
      }
    };
    if (typeof this.props?.innerRef === "function") {
      this.scrollViewRef = this.scrollViewRef.current;
      this.props.innerRef(this.scrollViewRef);
    }
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
        ref={this.scrollViewRef}
      >
        <div style={{ ...defaultStyle, ...containerStyle }}>{children}</div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <ScrollView {...props} innerRef={ref} />
));
