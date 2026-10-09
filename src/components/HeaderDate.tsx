"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getDate() {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HeaderDate() {
  const date = useSyncExternalStore(subscribe, getDate, () => "");

  return (
    <span className="mt-1.5 block min-h-[14px] text-[11px] font-medium leading-none text-slate-400">
      {date}
    </span>
  );
}