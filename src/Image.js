import React from "react";
class Image extends React.Component {
  render() {
    const { source, style } = this.props;
    let modifiedStyle = { ...style };
    let modifiedSource = null;

    if (source?.svg) {
      let Component = source.svg;
      let svgProps = {};
      if (style?.width) {
        svgProps.width = style.width;
      }
      if (style?.height) {
        svgProps.height = style.height;
      }
      if (style?.color) {
        svgProps.fill = style.color;
      }
      return <Component {...svgProps} />;
    }

    if (source?.uri) {
      if (!style?.flex && !style?.width && !style?.height) {
        modifiedSource = "null";
      } else {
        modifiedSource = source.uri;
      }
    } else {
      modifiedSource = source;
      if (!style?.flex || !style.width || !style?.height) {
        modifiedStyle = {
          width: "100%",
          height: "100%",
          // objectFit: "contain",
          ...modifiedStyle,
        };
      }
    }

    return <img style={modifiedStyle} src={modifiedSource} />;
  }
}

export default Image;
