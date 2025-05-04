import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Calculate the initial total seconds
  const calculateTotalTime = () => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(() => {
    let interval;
    const totalTime = calculateTotalTime();
    if (isRunning && totalTime > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }
          return prevSeconds;
        });
      }, 1000);
    } else if (totalTime === 0) {
      clearInterval(interval);
      setIsRunning(false); // Stop the timer when it reaches 0
    }
    return () => clearInterval(interval); // Cleanup the interval when the component unmounts or stops
  }, [isRunning, hours, minutes, seconds]);

  const handleStartStop = () => {
    if (calculateTotalTime() > 0) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0); // Reset all time
  };

  const handleInputChange = (e, type) => {
    const value = Math.max(0, parseInt(e.target.value, 10)); // Ensure value is a non-negative integer
    if (type === "hours") setHours(value);
    if (type === "minutes") setMinutes(value);
    if (type === "seconds") setSeconds(value);
  };

  const formatTime = () => {
    const totalSeconds = calculateTotalTime();
    const hoursLeft = Math.floor(totalSeconds / 3600);
    const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
    const secondsLeft = totalSeconds % 60;
    return `${hoursLeft.toString().padStart(2, "0")}:${minutesLeft
      .toString()
      .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  const radius = 50; // Radius of the circular progress
  const circumference = 2 * Math.PI * radius;
  const totalTime = calculateTotalTime();
  const remainingTime = totalTime - (hours * 3600 + minutes * 60 + seconds);

  // Calculate the strokeDashoffset for the remaining and passed time
  const strokeDasharray = circumference;
  const strokeDashoffsetRemaining = (remainingTime / totalTime) * circumference;
  const strokeDashoffsetPassed =
    ((totalTime - remainingTime) / totalTime) * circumference;

  return (
    <div className="flex flex-col items-center space-y-4">
      {!isRunning && (
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={hours}
            onChange={(e) => handleInputChange(e, "hours")}
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="HH"
            max="99"
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => handleInputChange(e, "minutes")}
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="MM"
            max="59"
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => handleInputChange(e, "seconds")}
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="SS"
            max="59"
          />
          <button
            onClick={handleStartStop}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Start
          </button>
        </div>
      )}

      {isRunning && (
        <div className="relative">
          <svg width={120} height={120} viewBox="0 0 120 120">
            {/* Background circle (Passed Time - Gray to Red) */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="gray"
              strokeWidth="10"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffsetPassed}
              transform="rotate(-90 60 60)"
            />
            {/* Foreground circle (Remaining Time - Green to Blue) */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="blue"
              strokeWidth="10"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffsetRemaining}
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span className="text-lg font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {formatTime()}
          </span>
        </div>
      )}

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Reset
      </button>
    </div>
  );
};

export default CountdownTimer;
