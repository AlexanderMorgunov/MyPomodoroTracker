import { createElement } from "../../utils.js";

const incDecBtns = (id, verticalPosition = 31) => {
  function onChangeInputNum(id, num, e) {
    const minValueInput =
        e.target.parentElement.previousElementSibling.attributes.min.value,
      maxValueInput =
        e.target.parentElement.previousElementSibling.attributes.max.value;
    const value = document.querySelector(`#${id}`).value;

    num == 1
      ? +value + num <= +maxValueInput
        ? (document.querySelector(`#${id}`).value =
            +document.querySelector(`#${id}`).value + num)
        : null
      : +value + num >= +minValueInput
      ? (document.querySelector(`#${id}`).value =
          +document.querySelector(`#${id}`).value + num)
      : null;
  }

  return createElement(
    "div",
    {
      className: "Popup-countPomodoro-btnGroup",
      style: `bottom: ${verticalPosition}px`,
    },
    createElement("button", {
      className: "Popup-countPomodoro-btn Popup-countPomodoro-btn-inc",
      textContent: "+",
      type: "button",
      onclick: (e) => onChangeInputNum(id, 1, e),
    }),
    createElement("button", {
      className: "Popup-countPomodoro-btn Popup-countPomodoro-btn-dec",
      textContent: "-",
      type: "button",
      onclick: (e) => onChangeInputNum(id, -1, e),
    })
  );
};

export default incDecBtns;
