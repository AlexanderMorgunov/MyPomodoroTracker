import { createElement, getNumberFromStr } from "./../../utils.js";
import { getId } from "./../../utils.js";
import PopupSwitcher from "../PopupSwitcher/PopupSwitcher.js";
import incDecBtns from "../incDecBtns/incDecBtns.js";

const Popup = (
  isVisible,
  {
    onSwitchPopupVisible,
    onAddTask,
    onChangeCurrentTask,
    onChangeStatusAllBtnStart,
    onChangeTask,
  },
  i,
  item = null
) => {
  function formProcessing(e) {
    e.preventDefault();
    onSwitchPopupVisible(i);
    !item ? alert("Задача добавлена") : alert("Задача отредактирована");
    const id = getId();

    function getFormatTimer(e, order) {
      return +e.target[order].value < 10
        ? `0${e.target[order].value}:00`
        : `${e.target[order].value}:00`;
    }

    const newTAsk = {
      title: e.target[0].value,
      PomodoroAllCount: e.target[1].value,
      PomodoroTimer: getFormatTimer(e, 4),
      customPomodoroTimer:
        getFormatTimer(e, 4) == "25:00" ? null : getFormatTimer(e, 4),
      ShortBreakTimer: getFormatTimer(e, 7),
      customShortBreakTimer:
        getFormatTimer(e, 7) == "05:00" ? null : getFormatTimer(e, 7),
      LongBreakTimer: getFormatTimer(e, 10),
      customLongBreakTimer:
        getFormatTimer(e, 10) == "15:00" ? null : getFormatTimer(e, 10),
    };

    if (!item) {
      onAddTask({ ...newTAsk, id });
      onChangeCurrentTask(id);
    } else {
      onChangeTask({ ...newTAsk, id: item.id });
    }
  }

  return createElement(
    "div",
    {
      className: isVisible
        ? "Popup-wrapper-modal"
        : "Popup-wrapper-modal-hidden",
      onclick: (e) =>
        e.target.className === "Popup-wrapper-modal"
          ? onSwitchPopupVisible(i)
          : null,
    },
    createElement(
      "div",
      { className: "Popup-wrapper" },
      createElement(
        "div",
        { className: "Popup-header" },
        createElement(
          "div",
          { className: "Popup-btnCloseWindowWrapper" },
          PopupSwitcher({ onSwitchPopupVisible, onChangeStatusAllBtnStart }, i)
        )
      ),
      createElement(
        "form",
        {
          className: "Popup-form",
          id: "Popup-formID",
          onsubmit: "return false",
          onsubmit: (e) => formProcessing(e),
        },

        createElement(
          "div",
          { className: "Popup-body" },
          createElement("input", {
            type: "text",
            name: "title",
            placeholder: "Введите название задачи",
            className: "Popup-titleInput",
            value: item?.title || "",
            minlength: 2,
            required: "required",
          }),
          createElement("div", {
            className: "Popup-title",
            textContent: "Количество помидоров:",
          }),
          createElement("input", {
            className: "Popup-inputNum",
            type: "number",
            value: item?.PomodoroAllCount ? +item.PomodoroAllCount : 1,
            min: 1,
            max: 99,
            name: "countPomodoro",
            required: "required",
            id: `countPomodoro${i}`,
          }),
          incDecBtns(`countPomodoro${i}`),
          createElement("div", {
            className: "Popup-title",
            textContent: "Продолжительность таймера, минут:",
          }),
          createElement("input", {
            className: "Popup-inputNum",
            required: "required",
            name: "durationPomodoro",
            min: 1,
            max: 99,
            type: "number",
            id: `durationPomodoro${i}`,
            value: item?.PomodoroTimer
              ? getNumberFromStr(item.PomodoroTimer)
              : 25,
          }),
          incDecBtns(`durationPomodoro${i}`),

          createElement("div", {
            className: "Popup-title",
            textContent: "Продолжительность короткого перерыва, минут:",
          }),
          createElement("input", {
            className: "Popup-inputNum",
            required: "required",
            name: "durationShortBreak",
            min: 1,
            max: 15,
            type: "number",
            id: `durationShortBreak${i}`,
            value: item?.ShortBreakTimer
              ? getNumberFromStr(item.ShortBreakTimer)
              : 5,
          }),
          incDecBtns(`durationShortBreak${i}`),

          createElement("div", {
            className: "Popup-title",
            textContent: "Продолжительность длинного перерыва, минут:",
          }),
          createElement("input", {
            className: "Popup-inputNum",
            required: "required",
            name: "durationLongBreak",
            min: 1,
            max: 60,
            type: "number",
            id: `durationLongBreak${i}`,
            value: item?.LongBreakTimer
              ? getNumberFromStr(item.LongBreakTimer)
              : 15,
          }),
          incDecBtns(`durationLongBreak${i}`)
        ),

        createElement(
          "div",
          { className: "Popup-footer" },

          createElement(
            "div",
            { className: "Popup-btnContainer" },
            createElement("button", {
              className: "Popup-btn Popup-btnCancel",
              textContent: "Отмена",
              onclick: () => onSwitchPopupVisible(i),
            }),
            createElement("button", {
              className: "Popup-btn Popup-btnSave",
              textContent: "Сохранить",
              type: "submit",
            })
          )
        )
      )
    )
  );
  // }
};

export default Popup;
