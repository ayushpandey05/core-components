import React from "react";
import { detectMob, runFunction } from "./Utility";

class TextInput extends React.Component {
  onChange = (e) => {
    const value = e?.target?.value;
    const { onChange, onChangeText } = this.props;
    runFunction(onChange, e);
    runFunction(onChangeText, value);
  };
  onMouseDown = (e) => {
    e.stopPropagation();
    const { onMouseDown } = this.props;
    runFunction(onMouseDown, e);
  };
  render() {
    const isMobile = detectMob();
    const { value, style } = this.props;
    const mergedStyle = { ...style };
    let extraProps = {};
    if (isMobile) {
      extraProps.onPointerDown = this.onMouseDown;
    } else {
      extraProps.onMouseDown = this.onMouseDown;
    }

    if (
      mergedStyle?.paddingTop !== null &&
      mergedStyle?.paddingTop !== undefined
    ) {
      mergedStyle.paddingTop = mergedStyle.paddingTop + 6;
    } else if (
      mergedStyle?.padding !== null &&
      mergedStyle?.padding !== undefined
    ) {
      mergedStyle.paddingTop = mergedStyle.padding + 6;
    } else {
      mergedStyle.paddingTop = 16;
    }

    if (
      mergedStyle?.paddingBottom !== null &&
      mergedStyle?.paddingBottom !== undefined
    ) {
      mergedStyle.paddingBottom = mergedStyle.paddingBottom + 6;
    } else if (
      mergedStyle?.padding !== null &&
      mergedStyle?.padding !== undefined
    ) {
      mergedStyle.paddingBottom = mergedStyle.padding + 6;
    } else {
      mergedStyle.paddingBottom = 16;
    }
    return (
      <input
        style={{ border: "none", outline: "none", ...mergedStyle }}
        type="text"
        value={value}
        onChange={this.onChange}
        {...extraProps}
      />
    );
  }
}

export default TextInput;
