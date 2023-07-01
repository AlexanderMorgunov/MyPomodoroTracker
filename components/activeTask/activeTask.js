import { createElement } from "../../utils.js";

const activeTask = (title, PomodoroCurrent, isDone) => {
  return createElement(
    "div",
    { className: "activeTask-wrapper" },
    createElement("div", {
      className: "activeTask",
      textContent: {
        false: `${title} #${PomodoroCurrent}`,
        true: `${title} #${PomodoroCurrent} / Выполнено
        `,
      }[isDone],
    })
  );
};

export default activeTask;
