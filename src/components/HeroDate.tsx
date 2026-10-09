"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => { };

function getDate() {
    return new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Dhaka",
    });
}

export default function HeroDate() {
    const date = useSyncExternalStore(subscribe, getDate, () => "");

    return (
        <span className="inline-block min-h-[26px] rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            {date}
        </span>
    );
}