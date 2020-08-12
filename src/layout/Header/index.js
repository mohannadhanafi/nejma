import React, { useState, useRef, useEffect } from "react";
import HeaderLeftSide from "./HeaderLeftSide";
import Slider from "./Slider";
import "./index.scss";
import HeaderRightSide from "./HeaderRightSide";
import { useDispatch } from "react-redux";
import { setAllAsRead } from "../../store/actions/notifications";

function Header() {
  const profileMenuRef = useRef();
  const notificationMenuRef = useRef();
  const [showSlider, setShowSlider] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const closeProfileSettings = (event) => {
      const triggerElement = document.getElementsByClassName("")[0];
      if (
        notificationMenuRef.current &&
        notificationMenuRef.current.isEqualNode(event.target)
      )
        return;
      if (
        profileMenuRef.current &&
        profileMenuRef.current.isEqualNode(event.target)
      )
        return;
      if (triggerElement && triggerElement.isEqualNode(event.target)) return;
      setShowProfileMenu(false);
      setShowNotifications(false);
    };
    document.addEventListener("click", closeProfileSettings);
    return () => {
      document.removeEventListener("click", closeProfileSettings);
    };
  }, []);

  const openSlider = () => setShowSlider(true);
  const closeSlider = () => setShowSlider(false);
  const toggleProfileMenu = () => {
    if (showNotifications) {
      setShowNotifications(false);
    }
    setShowProfileMenu(!showProfileMenu);
  };
  const toggleNotifications = () => {
    dispatch(setAllAsRead());
    if (showProfileMenu) {
      setShowProfileMenu(false);
    }
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="header container">
      <Slider closeMenu={closeSlider} showMenu={showSlider} />
      <HeaderLeftSide openSlider={openSlider} />
      <HeaderRightSide
        isMenuVisible={showProfileMenu}
        toggleProfileMenu={toggleProfileMenu}
        toggleNotifications={toggleNotifications}
        profileMenuRef={profileMenuRef}
        showNotifications={showNotifications}
        isNotificaionsVisible={showNotifications}
        notificationMenuRef={notificationMenuRef}
      />
    </div>
  );
}

export default Header;
