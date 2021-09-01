import React from "react";
import { TextInput as RNTextInput } from "react-native";
import { runFunction } from "./Utility";

const TextInput = (props) => {
  return (
    <RNTextInput
      {...props}
      ref={(ref) => {
        runFunction(props?.getRef, ref);
      }}
    />
  );
};

export default TextInput;
