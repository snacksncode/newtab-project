import { FunctionComponent, useEffect, useState } from "react";

interface TimeOptions {
  hour: "2-digit" | "numeric";
  minute: "2-digit" | "numeric";
  hour12: boolean;
  second?: "2-digit" | "numeric";
}

interface ClockProps {
  showSeconds: boolean;
  force12hour: boolean;
}

const Clock: FunctionComponent<ClockProps> = ({ showSeconds, force12hour }) => {
  const [dateObject, setDateObject] = useState<Date>(new Date());
  const timeOptions: TimeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: force12hour,
  };
  if (showSeconds) {
    timeOptions.second = "2-digit";
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      setDateObject(currentDate);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const getTimeString = (date: Date, options: TimeOptions): string => {
    let timeString = "";
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const [formattedHours, formattedMinutes, formattedSeconds] = formatTime(
      hours,
      minutes,
      seconds,
      options
    );
    timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    return timeString;
  };
  const getPeriodString = (date: Date): string => {
    const hours = date.getHours();
    return hours >= 12 ? "PM" : "AM";
  };
  const formatTime = (
    hours: number,
    minutes: number,
    seconds: number,
    options: TimeOptions
  ): [string, string, string] => {
    let formatedData: [string, string, string] = ["0", "0", "0"];
    formatedData[0] = `0${options.hour12 ? hours % 12 : hours}`.substr(-2);
    [minutes, seconds].forEach((value, index) => {
      formatedData[index + 1] = `0${value}`.substr(-2);
    });
    return formatedData;
  };
  return (
    <div className="time-container">
      <span className="time">{getTimeString(dateObject, timeOptions)}</span>
      {timeOptions.hour12 && <span className="period">{getPeriodString(dateObject)}</span>}
    </div>
  );
};

export default Clock;
