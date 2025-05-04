import React, { useState, useEffect } from "react";
import moment from "moment";
import { Timer } from "lucide-react";
import CountdownTimer from "./pages/Timer";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval); // Clean up interval
  }, []);

  const formattedTime = currentTime.format("HH:mm:ss");
  const formattedDate = currentTime.format("YYYY/MM/DD");
  const formattedDay = currentTime.format("dddd");

  return (
    <>
      <nav className="bg-white text-gray-800 py-2 shadow-sm px-6 grid grid-cols-3 border-b border-gray-200 font-[IRANSans]">
        <div className="flex items-center justify-center gap-6 col-span-3">
          <div className="relative">
            <div className="flex flex-col text-xl items-center justify-center leading-tight">
              <span>{formattedTime}</span>
              <span>
                <span className="text-blue-600 ">{formattedDay}</span>{" "}
                {formattedDate}
              </span>
            </div>
            {/* <div className="flex flex-col text-xl items-center justify-center leading-tight">
              <CountdownTimer />
            </div> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
