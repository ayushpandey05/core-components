class Dimensions {}

Dimensions.get = (space) => {
  if (space === "window") {
    return { height: window.innerHeight, width: window.innerWidth };
  }
  return {};
};

export default Dimensions;
