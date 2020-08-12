import React, { useEffect } from "react";
import ProfileImage from "./ProfileImage";
import LanguageSwitch from "../LanguageSwitch";
import SliderItems from "./SliderItems";
import CloseButton from "./CloseButton";
import Footer from "./Footer";
import "./index.scss";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default function Slider(props) {
  const { closeMenu, showMenu } = props;

  useEffect(() => {
    if (showMenu) disableBodyScroll(document.body);
    return () => {
      enableBodyScroll(document.body);
    };
  }, [props]);

  return (
    <div className={`menu ${showMenu && "menu-active"}`}>
      <CloseButton closeMenu={closeMenu} />
      <ProfileImage />
      <SliderItems closeMenu={closeMenu} />
      <LanguageSwitch />
      <Footer />
    </div>
  );
}
