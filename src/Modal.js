import React from "react";
import reactDom from "react-dom";
import { runFunction } from "./Utility";
class Modal extends React.Component {
  showModal = () => {
    const { transparent, children, onShow } = this.props;
    this.modalWrapper = document.createElement("div");
    this.modalWrapper.setAttribute(
      "style",
      `width: 100%; height: 100%; position: absolute; display: flex; flex-direction: column; overflow: hidden; background-color: ${
        transparent ? "transparent;" : "white;"
      }`
    );
    document.body.appendChild(this.modalWrapper);
    reactDom.render(children, this.modalWrapper);
    runFunction(onShow);
  };
  hideModal = () => {
    this.modalWrapper && document.body.removeChild(this.modalWrapper);
    this.modalWrapper = null;
  };

  componentWillUnmount() {
    this.hideModal();
  }

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.showModal();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps?.visible && this.props?.visible) {
      this.showModal();
    } else if (prevProps?.visible && !this.props?.visible) {
      this.hideModal();
    }
  }

  render() {
    return null;
  }
}

export default Modal;

Modal.defaultProps = {
  visible: true,
  transparent: false,
};
