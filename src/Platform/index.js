class Platform {
  static OS = "web";
  static select = (config) => {
    if (config) {
      return config.web;
    }
  };
}

export default Platform;
