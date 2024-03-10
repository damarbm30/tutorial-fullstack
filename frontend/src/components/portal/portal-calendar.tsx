"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { cn, getDays } from "@/lib/utils";
import { DAYS_OF_THE_WEEK, MONTHS } from "@/lib/constants";
import { MoveLeft, MoveRight } from "lucide-react";

const CURRENT_DATE = dayjs();

export default function PortalCalendar() {
  const [today, setToday] = useState(CURRENT_DATE);

  const handleIncrementMonth = (increment: boolean) => {
    const newMonth = increment
      ? today.month(today.month() + 1)
      : today.month(today.month() - 1);
    setToday(newMonth);
  };

  return (
    <div className="mt-4 w-full">
      <div className="flex flex-col items-center justify-between rounded-t-md bg-slate-400 px-10 py-5 sm:flex-row">
        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer text-white transition-all hover:scale-105"
            onClick={() => handleIncrementMonth(false)}
          >
            <MoveLeft />
          </button>
          <p className="font-semibold text-white">
            {MONTHS[today.month()]}, {today.year()}
          </p>
          <button
            className="cursor-pointer text-white transition-all hover:scale-105"
            onClick={() => handleIncrementMonth(true)}
          >
            <MoveRight />
          </button>
        </div>
        <p
          className=" cursor-pointer font-semibold text-white transition-all hover:scale-105"
          onClick={() => {
            setToday(CURRENT_DATE);
          }}
        >
          Today
        </p>
      </div>
      <div className="rounded-b-md bg-slate-100 py-5 dark:border dark:bg-black">
        <div className="grid grid-cols-7">
          {DAYS_OF_THE_WEEK.map((day, index) => {
            return (
              <p
                key={index}
                className="grid h-10 place-content-center font-bold"
              >
                {day}
              </p>
            );
          })}
        </div>
        <div className="grid grid-cols-7">
          {getDays(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div key={index} className="grid h-10 place-content-center">
                  <span
                    className={cn(
                      !currentMonth && "opacity-50",
                      today && "bg-slate-400 text-white",
                      "grid h-8 w-8 cursor-pointer place-content-center rounded-full p-1 hover:bg-slate-400 hover:text-white dark:hover:bg-slate-800",
                    )}
                  >
                    {date.date()}
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
