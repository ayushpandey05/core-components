import React from "react";
import StyleSheet from "./StyleSheet";
import { detectMob, runFunction } from "./Utility";

class TextInput extends React.Component {
  onChange = (e) => {
    const value = e?.target?.value;
    const { onChange, onChangeText } = this.props;
    runFunction(onChange, e);
    runFunction(onChangeText, value);
  };
  onKeyDown = (e) => {
    const { onKeyDown } = this.props;
    if (e?.key === "Enter") {
      this.inputRef.blur();
    }
    runFunction(onKeyDown, e);
  };
  onMouseDown = (e) => {
    e.stopPropagation();
    const { onMouseDown } = this.props;
    runFunction(onMouseDown, e);
  };
  render() {
    const isMobile = detectMob();
    const { value, style, getRef, ...restProps } = this.props;
    const mergedStyle = { ...StyleSheet.flatten(style) };
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
        ref={(ref) => {
          this.inputRef = ref;
          runFunction(getRef, ref);
        }}
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          ...mergedStyle,
        }}
        type="text"
        value={value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        {...restProps}
        {...extraProps}
      />
    );
  }
}

export default TextInput;
