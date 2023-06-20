import { createElement } from "../../utils.js";

const activeTask = (title, PomodoroCurrent) => {
  return createElement(
    "div",
    { className: "activeTask-wrapper" },
    createElement("div", {
      className: "activeTask",
      textContent: `${title} #${PomodoroCurrent} `,
    })
  );
};

export default activeTask;
