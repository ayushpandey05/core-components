class Dimensions {}

Dimensions.get = (space) => {
  if (space === "window") {
    return { height: window.innerHeight, width: window.innerWidth };
  }
  return {};
};

Dimensions.addEventListener = (listener, callback) => {
  if (listener === "change") {
    window.addEventListener("resize", callback);
  }
};

Dimensions.removeEventListener = (listener, callback) => {
  if (listener === "change") {
    window.removeEventListener("resize", callback);
  }
};

export default Dimensions;
