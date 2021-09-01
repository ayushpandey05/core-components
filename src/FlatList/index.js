import React from "react";
import ScrollView from "../ScrollView";
import { runFunction } from "../Utility";

const FlatList = (props) => {
  const { data, renderItem, innerref, ...restProps } = props || {};
  let component = void 0;
  if (Array.isArray(data) && data?.length) {
    component = data.map((item, index) => {
      return runFunction(renderItem, { item, index });
    });
  }
  return (
    <ScrollView ref={innerref} {...restProps}>
      {component}
    </ScrollView>
  );
};

export default React.forwardRef((props, ref) => (
  <FlatList {...props} innerref={ref} />
));
