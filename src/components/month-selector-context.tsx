"use client";

import {
  createContext,
  type Dispatch,
  useState,
  type SetStateAction,
  type PropsWithChildren,
  useContext,
} from "react";

const MonthContext = createContext<{
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
}>(null!);

export function MonthContextProvider(props: PropsWithChildren<{}>) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <MonthContext.Provider value={{ month, setMonth, year, setYear }}>
      {props.children}
    </MonthContext.Provider>
  );
}

export function useMonthContext() {
  const state = useContext(MonthContext);

  return state;
}
