export const m03_timer = (
  deadline = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
) => {
  class Timer {
    constructor(
      deadline,
      timerBlockSelector,
      timerContentSelector,
      dayBlockSelector,
      hoursBlockSelector,
      minutesBlockSelector,
      secondsBlockSelector
    ) {
      this.deadline = deadline;
      this.timerBlock = document.querySelector(timerBlockSelector);
      this.timerContent = this.timerBlock.querySelector(timerContentSelector);
      this.dayBlock = this.timerContent.querySelector(dayBlockSelector);
      this.hoursBlock = this.timerContent.querySelector(hoursBlockSelector);
      this.minutesBlock = this.timerContent.querySelector(minutesBlockSelector);
      this.secondsBlock = this.timerContent.querySelector(secondsBlockSelector);
      this.timerID = 0;
    }

    getTimeToDeadline() {
      let stopDate = new Date(deadline).getTime();
      let nowDate = new Date().getTime();
      let remTime = Math.floor((stopDate - nowDate) / 1000);
      let days = Math.floor(remTime / 60 / 60 / 24);
      let hours = Math.floor((remTime / 60 / 60) % 24);
      let minutes = Math.floor((remTime / 60) % 60);
      let seconds = Math.floor(remTime % 60);
      return { days, hours, minutes, seconds, remTime };
    }

    prop(n) {
      let res = String(n);
      if (res.length < 2) res = `0${res}`;
      return res;
    }

    stopMsg() {
      this.timerBlock.innerHTML = "Акция завершена!";
    }

    refreshTime() {
      let time = this.getTimeToDeadline();
      this.dayBlock.textContent = this.prop(time.days);
      this.hoursBlock.textContent = this.prop(time.hours);
      this.minutesBlock.textContent = this.prop(time.minutes);
      this.secondsBlock.textContent = this.prop(time.seconds);

      if (time.remTime <= 0) {
        clearInterval(this.timerID);
        setTimeout(stopMsg, 2000);
        this.dayBlock.textContent = "00";
        this.hoursBlock.textContent = "00";
        this.minutesBlock.textContent = "00";
        this.secondsBlock.textContent = "00";
      }
    }

    init() {
      this.refreshTime();
      this.timerID = setInterval(() => {
        this.refreshTime();
      }, 1000);
    }
  }

  const timer1 = new Timer(
    deadline,
    "#order_1",
    ".countdown-text",
    ".count-wrap > .count_1 > span",
    ".count-wrap > .count_2 > span",
    ".count-wrap > .count_3 > span",
    ".count-wrap > .count_4 > span"
  );

  const timer2 = new Timer(
    deadline,
    "#order_2",
    ".countdown-text",
    ".count-wrap > .count_1 > span",
    ".count-wrap > .count_2 > span",
    ".count-wrap > .count_3 > span",
    ".count-wrap > .count_4 > span"
  );

  timer1.init();
  timer2.init();

  //
};
