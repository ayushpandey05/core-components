const flatten = (style) => {
  if (Array.isArray(style)) {
    let newStyle = {};
    for (let index = 0; index < style.length; index++) {
      let styleDoc = style[index];
      for (let key in styleDoc) {
        newStyle[key] = styleDoc[key];
      }
    }
    return newStyle;
  } else {
    return style;
  }
};
const create = (stylesheet) => {
  return stylesheet;
};
const StyleSheet = {
  create,
  flatten,
  hairlineWidth: 0,
};

export default StyleSheet;
