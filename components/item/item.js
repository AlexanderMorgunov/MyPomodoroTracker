import {
  createElement,
  getCurrentActiveTimer,
  onPauseTimer,
  GetEditeObject,
} from "../../utils.js";
import activeTask from "./../activeTask/activeTask.js";

const Item = (item, callbacks) => {
  const {
    id,
    title,
    statusBtnPomodoro,
    statusBtnShortBreak,
    statusBtnLongBreak,
    activeTimer,
    PomodoroCurrent,
    PomodoroTimer,
    ShortBreakTimer,
    LongBreakTimer,
    PomodoroTimerInterval,
    ShortBreakTimerInterval,
    LongBreakTimerInterval,
    isDone = false,
  } = item;

  console.log(isDone);

  const interval =
    activeTimer == "Pomodoro"
      ? PomodoroTimerInterval
      : activeTimer == "ShortBreak"
      ? ShortBreakTimerInterval
      : LongBreakTimerInterval;

  const statusBtnStart =
    activeTimer == "Pomodoro"
      ? statusBtnPomodoro
      : activeTimer == "ShortBreak"
      ? statusBtnShortBreak
      : statusBtnLongBreak;

  if (item[`${getCurrentActiveTimer()}Timer`] === "00:00") {
    clearInterval(interval);
    console.log(GetEditeObject());
    callbacks.onChangeTask(GetEditeObject());
  }

  return createElement(
    "div",
    { className: "Item" },
    createElement(
      "div",
      { className: "Item-wrapper Item-timer-wrapper" },
      createElement(
        "div",
        { className: "Item-btnContainer" },
        ...["Pomodoro", "Short Break", "Long Break"].map((item) =>
          createElement("button", {
            className: `${
              item.replace(/ /g, "") === activeTimer
                ? "Item-btn Item-btn-active"
                : "Item-btn"
            }`,

            textContent: item,
            onclick: () => {
              callbacks.onChangeActiveTimer(id, item);
              onPauseTimer(interval);
              statusBtnStart === "pause"
                ? callbacks.onChangeStatusAllBtnStart("start")
                : null;
            },
          })
        )
      ),
      createElement("div", {
        className: "Item-timer",
        textContent:
          activeTimer == "Pomodoro"
            ? PomodoroTimer
            : activeTimer == "ShortBreak"
            ? ShortBreakTimer
            : LongBreakTimer,
      }),
      createElement("button", {
        className: `Item-timer-btn Item-timer-btn-${activeTimer}`,
        textContent: statusBtnStart,
        onclick: () => {
          callbacks.onChangeStatusBtnStart();
          if (statusBtnStart === "start") {
            callbacks.OnGetTime(id, activeTimer, interval);
          } else {
            onPauseTimer(interval);
          }
        },
        disabled: isDone,
      }),
      activeTask(title, PomodoroCurrent)
    )
  );
};

export default Item;
