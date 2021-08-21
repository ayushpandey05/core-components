import React from "react";
import { defaultStyle, runFunction } from "./Utility";

class View extends React.Component {
  constructor(props) {
    super(props);
    if (props?.innerRef && typeof props.innerRef !== "function") {
      this.viewRef = props.innerRef;
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
    if (typeof this.props?.innerRef === "function") {
      this.viewRef = this.viewRef.current;
      this.props.innerRef(this.viewRef);
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
    return (
      <div
        style={{ ...defaultStyle, ...style }}
        {...restProps}
        ref={this.viewRef}
      >
        {children}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <View {...props} innerRef={ref} />
));
