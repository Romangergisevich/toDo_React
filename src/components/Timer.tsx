import React, { useState, useEffect } from "react";

interface TimerProps {
  createDate: number;
}

const Timer: React.FC<TimerProps> = (props) => {
  const [difference, setDefference] = useState<string>(
    getDateTimeDifference(props.createDate, Date.now())
  );

  function getDateTimeDifference(date1: number, date2: number): string {
    const diff = Math.abs(date1 - date2) / 1000;
    const days = Math.floor(diff / (3600 * 24));
    const remainingSeconds = diff % (3600 * 24);
    const hours = String(Math.floor(remainingSeconds / 3600) % 24).padStart(
      2,
      "0"
    );
    const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(Math.floor(remainingSeconds % 60)).padStart(2, "0");

    if (days > 0) {
      return `${days} d : ${hours} h : ${minutes} m  : ${seconds} s`;
    } else {
      return `${hours} h : ${minutes} m : ${seconds} s`;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDefference(
        (prev) => (prev = getDateTimeDifference(props.createDate, Date.now()))
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <span className="post-timer">{difference}</span>
    </>
  );
};

export default Timer;
