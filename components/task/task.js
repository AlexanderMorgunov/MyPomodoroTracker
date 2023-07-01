import { createElement } from "../../utils.js";

const Task = (
  item,
  { onChangeCurrentTask, onDelete, onSwitchPopupVisible, onSwitchTaskIsDone }
) => {
  let { id, title, PomodoroAllCount, PomodoroDoneCount, isCurrent, isDone } =
    item;

  return createElement(
    "div",
    {
      className: isCurrent
        ? "task-wrapper task-wrapper-active"
        : "task-wrapper",
      onclick: (e) => {
        if (
          e.target.className !== "gg-trash" &&
          e.target.className !== "task-checkMark"
        ) {
          onChangeCurrentTask(id);
        }
      },
    },
    createElement("div", {
      className: `${
        !isDone ? "task-checkMark" : "task-checkMark task-checkMark-done"
      }`,
      onclick: () => {
        onChangeCurrentTask(id);
        onSwitchTaskIsDone();
      },
    }),
    createElement("div", {
      className: `${!isDone ? "task-title" : "task-title task-title-done"}`,
      textContent: title,
    }),
    createElement("div", {
      className: "task-countTask",
      textContent: `${PomodoroDoneCount} / ${PomodoroAllCount}`,
    }),
    createElement("button", {
      className: "gg-clipboard",
      onclick: () => onSwitchPopupVisible(1),
      disabled: isDone,
    }),
    createElement("button", {
      className: "gg-trash",
      onclick: () => {
        onDelete(id);
      },
    })
  );
};

export default Task;
