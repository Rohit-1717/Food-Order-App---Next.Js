"use client";
import { useEffect, useState } from "react";

const TARGET_TIME = new Date().getTime() + 6 * 60 * 60 * 1000; // 6hr offer

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 justify-center text-white text-center font-bold text-xl sm:text-2xl">
      <TimerBox label="HR" value={pad(timeLeft.hours)} />
      <span className="text-2xl">:</span>
      <TimerBox label="Min" value={pad(timeLeft.minutes)} />
      <span className="text-2xl">:</span>
      <TimerBox label="Sec" value={pad(timeLeft.seconds)} />
    </div>
  );
}

function TimerBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/70 px-4 py-2 rounded-md shadow text-white flex flex-col items-center">
      <span className="text-2xl sm:text-3xl leading-none">{value}</span>
      <span className="text-[10px] tracking-wider">{label}</span>
    </div>
  );
}

function pad(num: number): string {
  return num.toString().padStart(2, "0");
}

function getRemainingTime() {
  const total = TARGET_TIME - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor(total / 1000 / 60 / 60);
  return { total, hours, minutes, seconds };
}
