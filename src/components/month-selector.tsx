import { useState } from "react";
import { ScribbleButton } from "./scribble-button";
import { useMonthContext } from "./month-selector-context";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
export function MonthSelector() {
  const { month, setMonth, year, setYear } = useMonthContext();

  function incrementMonth() {
    let newYear = year;
    let newMonth = month + 1;
    if (newMonth === 12) {
      newYear++;

      newMonth = 0;
    }

    setMonth(newMonth);
    setYear(newYear);
  }
  function decrementMonth() {
    let newYear = year;
    let newMonth = month - 1;
    if (newMonth === -1) {
      newYear--;
      newMonth = 11;
    }

    setMonth(newMonth);
    setYear(newYear);
  }

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <ScribbleButton onClick={decrementMonth}> Left </ScribbleButton>
        <div className="flex flex-col items-center">
          <span className="text-4xl">{months[month]}</span>
          <span className="text-2xl">{year}</span>
        </div>
        <ScribbleButton onClick={incrementMonth}> Right</ScribbleButton>
      </div>
    </div>
  );
}
