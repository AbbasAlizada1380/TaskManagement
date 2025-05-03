import React, { useState, useEffect, useRef } from "react";
// import {
//   FaBell,
//   FaSearch,
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
//   FaUser,
// } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { signOutSuccess } from "../../state/userSlice/userSlice"; // Adjust path if needed
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import ProfileModal from "./ProfileModal"; // Adjust path if needed
import moment from "moment-jalaali"; // <<<--- IMPORT moment-jalaali
// import { shamsiMonths } from "../../utils/dateConvert"; // <<<--- IMPORT your month array (Adjust path)

moment.loadPersian({ usePersianDigits: true, dialect: "persian-modern" });

const Navbar = () => {
  // const [dateInfo, setDateInfo] = useState({
  //   day: "",
  //   month: "",
  //   dateNumber: "",
  //   year: "",
  // });
  // const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  // const profileDropdownRef = useRef(null);
  // const { currentUser } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const updateDate = () => {
  //     const now = moment();
  //     const jMonthIndex = now.jMonth();
  //     const shamsiMonthName = shamsiMonths[jMonthIndex];

  //     const newDateInfo = {
  //       day: now.format("dddd"),
  //       year: now.format("jYYYY"),
  //       month: shamsiMonthName,
  //       dateNumber: now.format("jD"),
  //     };

  //     setDateInfo(newDateInfo);
  //   };

  //   updateDate();
  //   const timer = setInterval(updateDate, 60000);
  //   return () => clearInterval(timer);
  // }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       profileDropdownRef.current &&
  //       !profileDropdownRef.current.contains(event.target)
  //     ) {
  //       setIsProfileDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // const handleLogout = () => {
  //   dispatch(signOutSuccess());
  //   setIsProfileDropdownOpen(false);
  //   navigate("/sign-in");
  // };

  // const handleOpenProfileModal = () => {
  //   setIsProfileModalOpen(true);
  //   setIsProfileDropdownOpen(false);
  // };

  // const handleCloseProfileModal = () => {
  //   setIsProfileModalOpen(false);
  // };

  return (
    <>
      <nav className="bg-white text-gray-800 py-2 shadow-sm px-6 grid grid-cols-3 border-b border-gray-200 font-[IRANSans]">
      

        <div className="flex items-center justify-end gap-6">
          <div  className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              
            >
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
