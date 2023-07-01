import { getId, getTimer, onPauseAllTimer } from "./utils.js";

export const initialItem = {
  id: getId(),
  title: "Заголовок",
  statusBtnPomodoro: "start",
  statusBtnShortBreak: "start",
  statusBtnLongBreak: "start",
  activeTimer: "Pomodoro",
  PomodoroAllCount: 2,
  PomodoroDoneCount: 0,
  PomodoroCurrent: 1,
  PomodoroTimer: "25:00",
  customPomodoroTimer: null,
  ShortBreakTimer: "05:00",
  customShortBreakTimer: null,
  LongBreakTimer: "15:00",
  customLongBreakTimer: null,
  PomodoroTimerInterval: null,
  ShortBreakTimerInterval: null,
  LongBreakTimerInterval: null,
  isCurrent: false,
  isDone: false,
};

class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  onAddTask({
    title = "Тестовая задача",
    PomodoroAllCount = 1,
    PomodoroTimer = "25:00",
    ShortBreakTimer = "05:00",
    LongBreakTimer = "15:00",
    customPomodoroTimer,
    customShortBreakTimer,
    customLongBreakTimer,
    id = 1,
  }) {
    this.setState({
      ...this.getState(),
      list: [
        ...this.state.list,
        {
          ...initialItem,
          id,
          title,
          PomodoroAllCount,
          PomodoroTimer,
          ShortBreakTimer,
          LongBreakTimer,
          customPomodoroTimer,
          customShortBreakTimer,
          customLongBreakTimer,
        },
      ],
    });
  }

  onChangeTask(item) {
    this.setState({
      ...this.getState(),
      list: [
        ...this.state.list.map((el) => {
          if (el.id === item.id) {
            return {
              ...el,
              ...item,
            };
          } else return el;
        }),
      ],
    });
  }

  onDelete = (id) => {
    this.setState({
      ...this.getState(),
      list: [...this.state.list.filter((item) => item.id !== id)],
    });
  };

  onChangeActiveTimer = (id, status) => {
    this.setState({
      ...this.getState(),
      list: [
        ...this.state.list.map((item) => {
          if (item.id === id) {
            return { ...item, activeTimer: status.replace(/ /g, "") };
          } else {
            return item;
          }
        }),
      ],
    });
  };

  onChangeStatusBtnStart = () => {
    this.setState({
      ...this.getState(),
      list: [
        ...this.state.list.map((item) => {
          if (!item.isCurrent) return item;
          else {
            return {
              ...item,
              ["statusBtn" + item.activeTimer]:
                item["statusBtn" + item.activeTimer] === "start"
                  ? "pause"
                  : "start",
            };
          }
        }),
      ],
    });
  };

  onChangeStatusAllBtnStart = (status) => {
    this.setState({
      ...this.getState(),
      list: [
        ...this.state.list.map((item) => {
          if (item.isCurrent) {
            return {
              ...item,
              statusBtnPomodoro: status,
              statusBtnShortBreak: status,
              statusBtnLongBreak: status,
            };
          } else return item;
        }),
      ],
    });
  };

  OnGetTime = async (id) => {
    let interval = setInterval(() => {
      let time = Number(getTimer()) - 1;
      let minutes = Math.floor(time / 60 / 100);
      let seconds = time % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      this.setState({
        ...this.getState(),
        list: [
          ...this.state.list.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                [item.activeTimer + "Timer"]: `${minutes}:${seconds}`,
              };
            } else {
              return item;
            }
          }),
        ],
      });
    }, 1000);
    this.setState({
      ...this.getState(),
      list: [
        ...this.state.list.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              [item.activeTimer + "TimerInterval"]: interval,
            };
          } else {
            return item;
          }
        }),
      ],
    });
  };

  onResetTimer() {
    this.setState({
      ...this.getState(),
      list: [
        ...this.state.list.map((item) => {
          if (item.isCurrent) {
            return {
              ...item,
              PomodoroTimer: item.customPomodoroTimer || "25:00",
              ShortBreakTimer: item.customShortBreakTimer || "05:00",
              LongBreakTimer: item.customLongBreakTimer || "15:00",
            };
          } else {
            return item;
          }
        }),
      ],
    });
  }

  onSwitchPopupVisible(i) {
    this.setState({
      ...this.getState(),
      isVisiblePopup: [
        ...this.state.isVisiblePopup.map((item, index) => {
          if (i === index) {
            return !item;
          } else return item;
        }),
      ],
    });
  }

  onSwitchTaskIsDone() {
    this.setState({
      ...this.getState(),
      list: [
        ...this.state.list.map((item) => {
          if (item.isCurrent) {
            const count = {
              true: 0,
              false: item.PomodoroAllCount,
            }[item.isDone];

            const current = {
              true: 1,
              false: item.PomodoroAllCount,
            }[item.isDone];

            return {
              ...item,
              PomodoroDoneCount: count,
              PomodoroCurrent: current,
              isDone: !item.isDone,
            };
          } else {
            return item;
          }
        }),
      ],
    });
  }

  onChangeCurrentTask(id) {
    onPauseAllTimer();
    this.setState({
      ...this.getState(),
      list: [
        ...this.state.list.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isCurrent: true,
            };
          }
          return {
            ...item,
            isCurrent: false,
            statusBtnLongBreak: "start",
            statusBtnPomodoro: "start",
            statusBtnShortBreak: "start",
          };
        }),
      ],
    });
  }
}

export default Store;
