import React from "react";
import { ActivityIndicator } from "react-native";

const ActivityIndicatorComponent = (props) => {
  return (
    <ActivityIndicator {...props} color={props?.color || "rgb(29, 161, 242)"} />
  );
};

export default ActivityIndicatorComponent;
