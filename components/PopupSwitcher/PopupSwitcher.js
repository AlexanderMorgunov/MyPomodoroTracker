import { createElement, onPauseAllTimer } from "../../utils.js";
// import { createElement } from "../../utils.js";

const PopupSwitcher = (
  { onSwitchPopupVisible, onChangeStatusAllBtnStart },
  i
) => {
  return createElement("div", {
    className: "PopupSwitcher",
    onclick: () => {
      onPauseAllTimer();
      onSwitchPopupVisible(i);
      onChangeStatusAllBtnStart("start");
    },
  });
};

export default PopupSwitcher;
