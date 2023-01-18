import moment from 'moment';
import {useState, useEffect, useCallback, useMemo, useRef} from 'react';

const countDown = () => {
  const date = new Date();
  const hours = 23 - date.getHours();
  const minute = 59 - date.getMinutes();
  const second = 59 - date.getSeconds();
  if (hours === 0 && minute === 0 && second === 0) {
    return {
      hours: '00',
      minute: '00',
      second: '00',
    };
  }
  return {
    hours: hours < 10 ? '0' + hours : hours.toString(),
    minute: minute < 10 ? '0' + minute : minute.toString(),
    second: second < 10 ? '0' + second : second.toString(),
  };
};

export const useCountDown = (endTime: moment.Moment) => {
  const [time, setTime] = useState({
    day: '0',
    hour: '00',
    minute: '00',
    second: '00',
  });

  const startCount = useCallback(() => {
    const interval = setInterval(() => {
      const {second, minute} = countDown();
      const days = endTime.diff(moment(), 'day');
      const hours = endTime.diff(moment(), 'hours') - days * 24;
      const sc = endTime.diff(moment(), 'second');
      if (sc <= 0) {
        clearInterval(interval);
      } else {
        setTime({
          day: days.toString(),
          hour: hours < 10 ? '0' + hours : hours.toString(),
          minute,
          second,
        });
      }
    }, 998);
    return interval;
  }, [setTime]);

  useEffect(() => {
    const interval = startCount();
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startCount]);
  return time;
};

export const timeToDateString = (
  num = 0,
  select: 'date' | 'month' | 'year' | 'all' = 'all',
) => {
  const date = new Date();
  if (num) {
    date.setTime(num);
  }
  let dd: number | string = date.getDate();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (select === 'date') return dd;
  let mm: number | string = date.getMonth() + 1;
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (select === 'month') return mm;

  const yyyy = date.getFullYear();
  if (select === 'year') return yyyy;

  return `${dd}/${mm}/${yyyy}`;
};

export const createdToString = (num: number) => {
  const date = new Date();
  // const date2 = new Date(num);
  // const time = moment(date2).format("HH:mm");//date2.toLocaleTimeString();
  const tmpTime = date.getTime();
  const diff = tmpTime - num;
  const numberDate = diff / (86400 * 1000);
  // if (numberDate >= 1 && numberDate < 2) return `${time} Hôm qua`;
  if (numberDate >= 30) {
    return `${Math.floor(numberDate / 30)} tháng trước`;
  }
  if (numberDate >= 7) {
    return `${Math.floor(numberDate / 7)} tuần trước`;
  }
  if (numberDate >= 1) {
    return `${Math.floor(numberDate)} ngày trước`;
  }
  const hours = diff / (3600 * 1000);
  if (hours >= 1) return `${Math.floor(hours)} giờ trước`;
  const min = diff / (60 * 1000);
  if (min >= 1) return `${Math.floor(min)} phút trước`;
  const s = diff / 1000;
  if (s >= 20) return `${Math.floor(s)} giây trước`;
  return 'Vừa đăng';
};

export const getWeek = (nextWeek = 0) => {
  if (nextWeek < 0) return [];
  const weekData: any = [];
  let dayOfWeek = new Date().getDay() + 1;
  const dayToAdd = 7 * nextWeek;
  if (nextWeek > 0) {
    dayOfWeek = 6;
  }
  for (let i = 2; i < 7; i++) {
    const dif = i - dayOfWeek;
    const tmp = moment()
      .add(dif + dayToAdd, 'days')
      .format('DD/MM/YYYY');
    weekData.push({thu: i, ngay: tmp});
  }
  return weekData;
};

export const convertRangeTime = (time = 8) => `${time}:00-${time + 1}:00`;

export const useTimerCountDown = (onEnded?: () => void) => {
  const [timeLeft, setTimeLeft] = useState<number>(-1);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0 && onEnded) {
        onEnded();
        clearInterval(interval);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const getResult = useCallback(() => {
    const minutes = Math.floor(timeLeft / 60);
    const second = timeLeft - minutes * 60;
    return timeLeft >= 0
      ? `${minutes < 10 ? '0' : ''}${minutes}:${
          second < 10 ? '0' : ''
        }${second}`
      : '';
  }, [timeLeft]);

  const onStart = (initSeconds: number) => {
    setTimeLeft(initSeconds);
  };

  return {
    timeLeft: timeLeft,
    resultDisplay: getResult(),
    onStart,
  };
};
