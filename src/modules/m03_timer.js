export const m03_timer = (deadline) => {
  const timer = document.querySelector(".countdown-text");
  const timerDays = document.querySelector(".count_1 > span");
  const timerHours = document.querySelector(".count_2 > span");
  const timerMinutes = document.querySelector(".count_3 > span");
  const timerSeconds = document.querySelector(".count_4 > span");

  const getTimeToDeadline = (deadline) => {
    let stopDate = new Date(deadline).getTime();
    let nowDate = new Date().getTime();
    let remTime = Math.floor((stopDate - nowDate) / 1000);
    let days = Math.floor(remTime / 60 / 60 / 24);
    let hours = Math.floor((remTime / 60 / 60) % 24);
    let minutes = Math.floor((remTime / 60) % 60);
    let seconds = Math.floor(remTime % 60);
    return { days, hours, minutes, seconds, remTime };
  };

  const refreshTime = () => {
    let time = getTimeToDeadline(deadline);
    timerDays.textContent = prop(time.days);
    timerHours.textContent = prop(time.hours);
    timerMinutes.textContent = prop(time.minutes);
    timerSeconds.textContent = prop(time.seconds);

    if (time.remTime <= 0) {
      clearInterval(timerID);
      setInterval(stopMsg, 2000);
      timerDays.textContent = "00";
      timerHours.textContent = "00";
      timerMinutes.textContent = "00";
      timerSeconds.textContent = "00";
    }
  };

  const prop = (num) => {
    let res = String(num);
    if (res.length < 2) res = `0${res}`;
    return res;
  };
  const stopMsg = () => {
    timer.innerHTML = "Акция завершена!";
  };
  refreshTime();
  let timerID = setInterval(refreshTime, 1000);
};
