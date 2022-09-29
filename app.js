const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const deadline = document.querySelector('.deadline');
const giveaway = document.querySelector('.giveaway');
const items = document.querySelectorAll('.deadline-format h4');

// Month starts indexing from 0
let futureDate = new Date(2022, 11, 26, 22, 12, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const month = futureDate.getMonth();
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${year} 
${months[month]} ${date} ${hours}:${minutes}`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime - today;

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1d = 24hr

  const oneMinute = 60 * 1000;
  const oneHour = 60 * 60 * 1000
  const oneDay = 24 * 60 * 60 * 1000;

  //calculating
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item){
    if(item < 10)
      return item = `0${item}`;
    return item;
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  })

  if(t < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">*.*</h4>`;
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);