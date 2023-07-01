import { createElement } from "../utils.js";
import {
  getCurrentActiveTimer,
  getCurrentElement,
  getStatusActiveTimer,
  GetEditeObject,
  getCurrentInterval,
} from "../utils.js";
import Item from "../components/item/item.js";
import Task from "../components/task/task.js";
import Popup from "../components/popup/popup.js";
import PopupSwitcher from "../components/PopupSwitcher/PopupSwitcher.js";
import clearOrNextPomodoro from "../components/clearOrNextPomodoro/clearOrNextPomodoro.js";

export function App({ store }) {
  const list = store.getState().list;

  // console.log(list);

  const callbacks = {
    onChangeStatusBtnStart: () => store.onChangeStatusBtnStart(),

    onChangeActiveTimer: (id, status) => store.onChangeActiveTimer(id, status),
    onStartTimer: (id) => store.onStartTimer(id),
    OnGetTime: (id) => store.OnGetTime(id),
    onSwitchPopupVisible: (i) => store.onSwitchPopupVisible(i),
    onAddTask: (title, PomodoroAllCount, PomodoroTimer) =>
      store.onAddTask(title, PomodoroAllCount, PomodoroTimer),
    onChangeCurrentTask: (id) => store.onChangeCurrentTask(id),
    onDelete: (id) => store.onDelete(id),
    onChangeStatusAllBtnStart: (status) =>
      store.onChangeStatusAllBtnStart(status),
    onChangeTask: (item) => store.onChangeTask(item),
    onSwitchTaskIsDone: () => store.onSwitchTaskIsDone(),
    onResetTimer: () => store.onResetTimer(),
  };

  const GetitemCurrentElement = () => {
    if (list.length > 0 && list.filter((item) => item.isCurrent).length === 0) {
      callbacks.onChangeCurrentTask(list[0].id);
      return Item(list[0], callbacks);
    } else if (list.length > 0) {
      return Item(list.filter((item) => item.isCurrent)[0], callbacks);
    } else {
      store.onAddTask({});
    }
  };

  return createElement(
    "div",
    { className: `App App-${getCurrentActiveTimer()}` },

    GetitemCurrentElement(),

    createElement(
      "div",
      { className: "PopupSwitcher-wrapper" },
      PopupSwitcher(callbacks, 0)
    ),
    //
    createElement(
      "div",
      { className: "clearOrNextPomodoro-container" },
      clearOrNextPomodoro({
        className: "clearOrNextPomodoro-clear",
        clearOrNextPomodoroFunc: () => {
          clearInterval(getCurrentInterval());
          callbacks.onChangeStatusAllBtnStart("start");
          callbacks.onResetTimer();
        },
        isVisible: getStatusActiveTimer() == "pause",
      }),
      clearOrNextPomodoro({
        className: "clearOrNextPomodoro-next",
        clearOrNextPomodoroFunc: () => {
          clearInterval(getCurrentInterval());
          callbacks.onChangeStatusAllBtnStart("start");
          callbacks.onChangeTask(GetEditeObject());
        },
        isVisible: getStatusActiveTimer() == "pause",
      })
    ),
    createElement(
      "div",
      {
        className: "Item-wrapper item-task-wrapper",
      },
      ...list.map((task) => Task(task, callbacks))
    ),
    createElement(
      "div",
      { className: "Popup" },
      Popup(store.state.isVisiblePopup[0], callbacks, 0)
    ),
    createElement(
      "div",
      { className: "Popup" },
      Popup(store.state.isVisiblePopup[1], callbacks, 1, getCurrentElement())
    )
  );
}
