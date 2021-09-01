import React from "react";
import { defaultStyle, runFunction } from "../Utility";
import StyleSheet from "../StyleSheet";
class View extends React.Component {
  constructor(props) {
    super(props);
    if (props?.innerref && typeof props.innerref !== "function") {
      this.viewRef = props.innerref;
    } else {
      this.viewRef = React.createRef();
    }
  }

  onLayout = () => {
    const { onLayout } = this.props;
    this.viewRef &&
      onLayout &&
      onLayout({
        nativeEvent: { layout: this.viewRef.getBoundingClientRect() },
      });
  };

  componentDidMount() {
    this.viewRef.current.measure = (callback) => {
      if (this.viewRef) {
        let { x, y, top, left, width, height } =
          this.viewRef.getBoundingClientRect();
        return runFunction(callback, x, y, width, height, x, y);
      }
    };
    if (typeof this.props?.innerref === "function") {
      this.viewRef = this.viewRef.current;
      this.props.innerref(this.viewRef);
    }
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
      ...restProps
    } = this.props;
    const flattenStyle = StyleSheet.flatten(style);
    return (
      <div
        style={{ ...defaultStyle, ...flattenStyle }}
        {...restProps}
        ref={this.viewRef}
      >
        {children}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <View {...props} innerref={ref} />
));
