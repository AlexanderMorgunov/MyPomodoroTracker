import { App } from "./app/app.js";
const body = document.querySelector("body");
import Store from "./store.js";
import { initialItem } from "./store.js";

export const store = new Store({
  backgroundColor: "Pomodoro",
  isVisiblePopup: [false, false],
  list: [initialItem, { ...initialItem, id: 2, isCurrent: true }],
});

store.subscribe(() => {
  while (document.body.lastElementChild)
    document.body.removeChild(body.lastElementChild);
  document.body.append(App({ store }));
});

body.append(App({ store }));
