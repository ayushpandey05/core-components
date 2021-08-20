import React from "react";

const defaultStyle = {
  alignItems: "stretch",
  borderWidth: 0,
  borderStyle: "solid",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  margin: 0,
  padding: 0,
  flexShrink: 0,
  position: "relative",
  overflow: "hidden",
};

const detectMob = () => {
  if (
    // Platform.OS !== "web" ||
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
};

const runFunction = (func, e) => {
  if (typeof func === "function") {
    return func(e);
  }
};

const getNumberOfLineStyle = ({ numberOfLines }) => {
  let ellipsesStyle = {};
  if (numberOfLines === 1) {
    ellipsesStyle = {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  } else if (numberOfLines) {
    ellipsesStyle = {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: numberOfLines,
    };
  }
  return ellipsesStyle;
};

const getRenderComponent = (Component, props) => {
  if (React.isValidElement(Component)) {
    return React.cloneElement(Component, props);
  } else if (typeof Component === "function") {
    if (Component.prototype && Component.prototype.isReactComponent) {
      return <Component {...props} />;
    } else {
      return Component(props);
    }
  }
  return Component;
};

const create_UUID = () => {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

export {
  defaultStyle,
  detectMob,
  runFunction,
  getNumberOfLineStyle,
  getRenderComponent,
  create_UUID,
};
