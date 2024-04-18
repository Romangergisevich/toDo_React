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
    const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
    const seconds = String(Math.floor(diff % 60)).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
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
