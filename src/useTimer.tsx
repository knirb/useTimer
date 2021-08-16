import { useState, useRef } from "react";

interface Props {
  length: number;
  onComplete?: () => void;
}

const tick = 200;

const format = (date: number): string => {
  const secCeil = Math.ceil(date / 1000)
  const min = Math.floor(secCeil / 60)
  const sec = secCeil % 60;

  const minFormatted = min < 10 ? `0${min}` : `${min}`;
  const secondsFormatted = sec < 10 ? `0${sec}` : `${sec}`;

  return `${minFormatted}:${secondsFormatted}`;
};

const useTimer = ({ length, onComplete }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(format(length));
  const timer = useRef<NodeJS.Timer | null>(null);
  const endTime = useRef(0);
  const startTime = useRef(0);
  const elapsed = useRef(0);

  const start = () => {
    if (!isActive) {
      startTime.current = Date.now();
      endTime.current = Date.now() + length - elapsed.current;
      setIsActive(true);
      timer.current = setInterval(() => {
        updateTimer();
      }, tick);
    }
  };

  const updateTimer = () => {
    if (endTime.current - Date.now() > 0) {
      setValue(format(endTime.current - Date.now()));
    } else {
      skip();
    }
  };

  const stop = () => {
    if (isActive) {
      setIsActive(false);
      elapsed.current = Date.now() - startTime.current + elapsed.current;
      if (timer.current) clearInterval(timer.current);
    }
  };

  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    setIsActive(false);
    elapsed.current = 0;
    setValue(format(length));
  };

  const skip = () => {
    if (onComplete) onComplete();
    reset();
  };

  return { value, start, stop, reset, skip };
};

export default useTimer;
