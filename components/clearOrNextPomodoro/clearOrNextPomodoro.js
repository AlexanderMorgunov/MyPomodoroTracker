import { createElement } from "../../utils.js";

const clearOrNextPomodoro = (props) => {
  const { className, clearOrNextPomodoroFunc, isVisible } = props;

  return createElement("div", {
    className: "clearOrNextPomodoro " + className,
    onclick: () => clearOrNextPomodoroFunc(),
    style: {
      false: `display: none`,
      true: "",
    }[isVisible],
    // isVisible ? style: `display: none` ? '',
    // style: isVisible
    // style: `bottom: ${verticalPosition}px`,
    // display: false,
  });
};

export default clearOrNextPomodoro;
