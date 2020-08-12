import React from "react";
import { Row } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import instagramIcon from "assets/instagramIcon.png";
import facebookIcon from "assets/facebookIcon.png";
import twitterIcon from "assets/twitterIcon.png";
import nejmaLogo from "assets/nejmaLogo.png";
import { Form } from "components";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import "./index.scss";

const { Button } = Form;

export default function Footer() {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const history = useHistory();
  const pushToTalentRegister = () => history.push("/register/talent");
  const pushToHome = () => {
    window.scrollTo(0, 0);
    history.push("/");
  };
  return (
    <footer>
      <Row className="container footer-wrapper">
        <div>
          <img
            src={nejmaLogo}
            alt="logo"
            className="footer-logo"
            onClick={pushToHome}
          />
        </div>
        <div>
          <p className="footer-text">{t("footer.enrollPara")}</p>
          {!user.id && (
            <Link style={{ color: "#FFF" }} to="/register/talent">
              <Button
                className="footer-btn main-btn"
                onClick={pushToTalentRegister}
              >
                {t("register.enrollAsTalent")}
              </Button>
            </Link>
          )}
        </div>
        <div>
          <Link to="/privacy-policy" className="footer-link">
            {t("footer.privacy")}
          </Link>
          <Link to="/terms-and-conditions" className="footer-link">
            {t("footer.terms")}
          </Link>
          <a href="mailto:support@nejma.co" className="footer-link">
            {t("footer.support")}
          </a>
          <div className="social-media-links">
            <a href="#">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/nejmaapp/" target="_blank">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="#">
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </div>
        </div>
      </Row>
    </footer>
  );
}
