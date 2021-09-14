import React from "react";
import { defaultStyle, detectMob, runFunction } from "../Utility";
import StyleSheet from "../StyleSheet";
import "./ScrollView.css";
class ScrollView extends React.Component {
  constructor(props) {
    super(props);
    if (props?.innerref && typeof props.innerref !== "function") {
      this.scrollViewRef = props?.innerref;
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
    if (typeof this.props?.innerref === "function") {
      this.scrollViewRef = this.scrollViewRef.current;
      this.props.innerref(this.scrollViewRef);
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
      <scrollview
        className={modifiedClassName}
        style={{
          flex: 1,
          ...defaultStyle,
          ...StyleSheet.flatten(topViewStyle),
        }}
        {...extraProps}
        ref={this.scrollViewRef}
      >
        <container style={{ ...defaultStyle, ...StyleSheet.flatten(containerStyle) }}>
          {children}
        </container>
      </scrollview>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <ScrollView {...props} innerref={ref} />
));
