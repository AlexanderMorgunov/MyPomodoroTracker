import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";
import { store } from "./index.js";

const propNames = new Set([
  "id",
  "className",
  "textContent",
  "onclick",
  "onsubmit",
]);
/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов

  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else if (props[name]) {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }
  return element;
}
// генератор Id
export function getId() {
  return nanoid();
}

export function getTimer() {
  const timer = getCurrentElement()[`${getCurrentActiveTimer()}Timer`];
  const res = timer.slice(0, 2) * 60 + timer.slice(-2);
  return res;
}

export function getCurrentActiveTimer(list = store.state.list) {
  return list.filter((el) => el.isCurrent)[0]?.activeTimer || "Pomodoro";
}

export function onPauseTimer(interval) {
  clearInterval(interval);
}

export function onPauseAllTimer() {
  store.state.list.forEach((item) => {
    if (item.isCurrent) {
      item.activeTimer === "Pomodoro"
        ? clearInterval(item.PomodoroTimerInterval)
        : null;
      item.activeTimer === "ShortBreak"
        ? clearInterval(item.ShortBreakTimerInterval)
        : null;
      item.activeTimer === "LongBreak"
        ? clearInterval(item.LongBreakTimerInterval)
        : null;
    }
  });
}

export function getCurrentElement() {
  return store.state.list.filter((el) => el.isCurrent === true)[0];
}

export function getNumberFromStr(str) {
  return +str.split(":")[0];
}

export function GetEditeObject() {
  const item = getCurrentElement();
  const {
    activeTimer,
    PomodoroAllCount,
    PomodoroDoneCount,
    PomodoroCurrent,
    customPomodoroTimer,
    customShortBreakTimer,
    customLongBreakTimer,
  } = item;

  let editeObj = {
    ...item,
    statusBtnPomodoro: "start",
    statusBtnShortBreak: "start",
    statusBtnLongBreak: "start",
  };

  switch (activeTimer) {
    case "Pomodoro":
      if (PomodoroCurrent < PomodoroAllCount) {
        editeObj = {
          ...editeObj,
          PomodoroCurrent: PomodoroCurrent + 1,
          PomodoroDoneCount: PomodoroDoneCount + 1,
          PomodoroTimer: customPomodoroTimer ? customPomodoroTimer : "25:00",
        };
        if (+PomodoroCurrent % 4 === 0) {
          editeObj = { ...editeObj, activeTimer: "LongBreak" };
        } else {
          editeObj = { ...editeObj, activeTimer: "ShortBreak" };
        }
      } else {
        editeObj = {
          ...editeObj,
          PomodoroDoneCount: PomodoroDoneCount + 1,
          PomodoroTimer: customPomodoroTimer ? customPomodoroTimer : "25:00",
          isDone: true,
        };
      }
      break;
    case "ShortBreak":
      editeObj = {
        ...editeObj,
        activeTimer: "Pomodoro",
        ShortBreakTimer: customShortBreakTimer
          ? customShortBreakTimer
          : "05:00",
      };
      break;
    case "LongBreak":
      editeObj = {
        ...editeObj,
        activeTimer: "Pomodoro",
        LongBreakTimer: customLongBreakTimer ? customLongBreakTimer : "05:00",
      };
      break;
    default:
      break;
  }
  return editeObj;
}

export function getStatusActiveTimer() {
  return getCurrentElement()["statusBtn" + getCurrentActiveTimer()];
}

export function getCurrentInterval() {
  return getCurrentElement()[getCurrentActiveTimer() + "TimerInterval"];
}
