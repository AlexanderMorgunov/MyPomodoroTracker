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
  ShortBreakTimer: "05:00",
  LongBreakTimer: "15:00",
  PomodoroTimerInterval: null,
  ShortBreakTimerInterval: null,
  LongBreakTimerInterval: null,
  isCurrent: false,
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

  onAddTask = ({
    title = "Тестовая задача",
    PomodoroAllCount = 1,
    PomodoroTimer = "25:00",
    ShortBreakTimer = "05:00",
    LongBreakTimer = "15:00",
    id = 1,
  }) => {
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
        },
      ],
    });
  };

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

  OnGetTime = async (id, activeTimer, OldInterval) => {
    OldInterval ? clearInterval(OldInterval) : null;

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
              if (activeTimer === "Pomodoro") {
                return {
                  ...item,
                  PomodoroTimer: `${minutes}:${seconds}`,
                  PomodoroTimerInterval: interval,
                };
              } else if (activeTimer === "ShortBreak") {
                return {
                  ...item,
                  ShortBreakTimer: `${minutes}:${seconds}`,
                  ShortBreakTimerInterval: interval,
                };
              } else if (activeTimer === "LongBreak") {
                return {
                  ...item,
                  LongBreakTimer: `${minutes}:${seconds}`,
                  LongBreakTimerInterval: interval,
                };
              } else throw new Error(`wrong timer name - ${activeTimer}`);
            } else {
              return item;
            }
          }),
        ],
      });
      // }
    }, 1000);
  };

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
            return {
              ...item,
              isDone: !item.isDone,
              PomodoroDoneCount:
                item.PomodoroDoneCount === item.PomodoroAllCount
                  ? 0
                  : item.PomodoroAllCount,
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
