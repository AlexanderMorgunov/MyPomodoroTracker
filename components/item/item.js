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

  const interval = {
    Pomodoro: PomodoroTimerInterval,
    ShortBreak: ShortBreakTimerInterval,
    LongBreak: LongBreakTimerInterval,
  }[activeTimer];

  const statusBtnStart = {
    Pomodoro: statusBtnPomodoro,
    ShortBreak: statusBtnShortBreak,
    LongBreak: statusBtnLongBreak,
  }[activeTimer];

  if (item[`${getCurrentActiveTimer()}Timer`] === "00:00") {
    clearInterval(interval);
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
              callbacks.onChangeStatusAllBtnStart("start");
              onPauseTimer(interval);
            },
          })
        )
      ),
      createElement("div", {
        className: "Item-timer",
        textContent: {
          Pomodoro: PomodoroTimer,
          ShortBreak: ShortBreakTimer,
          LongBreak: LongBreakTimer,
        }[activeTimer],
      }),
      createElement("button", {
        className: `Item-timer-btn Item-timer-btn-${activeTimer}`,
        textContent: statusBtnStart,
        onclick: () => {
          callbacks.onChangeStatusBtnStart();
          clearInterval(interval);
          if (statusBtnStart === "start") {
            callbacks.OnGetTime(id);
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
