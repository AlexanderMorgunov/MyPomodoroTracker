import { createElement, onPauseAllTimer } from "../../utils.js";

const PopupSwitcher = (
  { onSwitchPopupVisible, onChangeStatusAllBtnStart },
  i
) => {
  return createElement("div", {
    className: "PopupSwitcher",
    onclick: () => {
      onPauseAllTimer();
      // let i = 0;
      console.log(i);
      onSwitchPopupVisible(i);
      onChangeStatusAllBtnStart("start");
    },
  });
};

export default PopupSwitcher;
