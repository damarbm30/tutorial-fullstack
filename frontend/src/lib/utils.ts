import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getDays = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDayOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDayOfMonth = dayjs().year(year).month(month).endOf("month");
  const date = [];

  // get previous month days
  for (let i = 0; i < firstDayOfMonth.day(); i++) {
    date.push({ date: firstDayOfMonth.day(i), currentMonth: false });
  }

  // get current month days
  for (let i = 0; i < lastDayOfMonth.day(); i++) {
    const currentDate = firstDayOfMonth.date(i);

    date.push({
      date: currentDate,
      currentMonth: true,
      today:
        currentDate.toDate().toDateString() === dayjs().toDate().toDateString(),
    });
  }

  // get next month days
  // 42 comes from 7 columns * 6 rows on ui calendar
  const upcomingDays = 42 - date.length;
  for (
    // get first day of next month
    let i = lastDayOfMonth.date() + 1;
    i <= lastDayOfMonth.date() + upcomingDays;
    i++
  ) {
    date.push({ date: lastDayOfMonth.date(i), currentMonth: false });
  }

  return date;
};
