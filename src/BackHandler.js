const BackHandler = {};

BackHandler.exitApp = () => {
  return void 0;
};
BackHandler.addEventListener = (eventName, callback) => {
  if (eventName === "hardwareBackPress") {
    window.addEventListener("popstate", callback);
    return {
      remove: () => {
        window.removeEventListener("popstate", callback);
      },
    };
  }
  return void 0;
};

BackHandler.removeEventListener = (eventName, callback) => {
  return void 0;
};

export default BackHandler;
