import moment from 'moment'
export const showTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;

  return (minutes < 10 ? '0' + minutes : minutes) + ' : ' + (seconds < 10 ? '0' + seconds : seconds);
}

export const showTime2 = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;

  return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

export const timeConverter = (s) => {
  return moment.unix(s).format("HH:mm:ss DD-MM-YYYY");
}

export const dateConverter = (s) => {
  return moment(s).format("DD-MM-YYYY");
}