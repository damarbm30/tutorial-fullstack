import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import axios from "axios";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getDays = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDayOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDayOfMonth = dayjs().year(year).month(month).endOf("month");
  const dateArr = [];

  // get previous month days
  for (let i = 0; i < firstDayOfMonth.day(); i++) {
    dateArr.push({ date: firstDayOfMonth.day(i), currentMonth: false });
  }

  // get current month days
  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    const currentDate = firstDayOfMonth.date(i);

    dateArr.push({
      date: currentDate,
      currentMonth: true,
      today:
        currentDate.toDate().toDateString() === dayjs().toDate().toDateString(),
    });
  }

  // get next month days
  // 42 comes from 7 columns * 6 rows on ui calendar
  const upcomingDays = 42 - dateArr.length;
  for (
    // get first day of next month
    let i = lastDayOfMonth.date() + 1;
    i <= lastDayOfMonth.date() + upcomingDays;
    i++
  ) {
    dateArr.push({ date: lastDayOfMonth.date(i), currentMonth: false });
  }

  return dateArr;
};

export const handleAxiosError = (error: unknown) => {
  return {
    data: null!,
    status: axios.isAxiosError(error) ? error.response?.status || 500 : 500,
  };
};
