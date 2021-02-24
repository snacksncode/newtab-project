import { FunctionComponent, useEffect, useState } from "react";

interface TimeOptions {
  hour: string;
  minute: string;
  hour12: boolean;
  second?: string;
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
  return <div>{dateObject.toLocaleTimeString("pl-PL", timeOptions)}</div>;
};

export default Clock;
