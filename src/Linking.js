const Linking = {
  openURL: (url, target) => {
    if (target) {
      return window.open(`${url}`, target);
    } else {
      return window.open(`${url}`, "_self");
    }
  },
};

export default Linking;
