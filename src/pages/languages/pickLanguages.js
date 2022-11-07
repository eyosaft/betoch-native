import { useTranslation } from "react-i18next";
import backArrow from "../../Assets/back_arrow_icon.png";
import { useNavigate } from "react-router-dom";

import "./pickLanguages.css";

import ukFlag_icon from "../../Assets/uk_flag_icon.png";
import usFlag_icon from "../../Assets/us_flag_icon.png";
import ethiopia_flag_icon from "../../Assets/ethiopia_flag_icon.png";

const LanguageMenu = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  function ChooseLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <div className="language-menu-container">
        <div className="language-menu-item">
          <button
            className="exit-edit-user-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            <img alt="" src={backArrow} />
          </button>

          <div className="language-menu-item-title">
            <h2> {t("Choose Language.1")} </h2>
          </div>
          <div className="language-menu">
            <label
              className="select-language"
              name="en"
              for="english"
            >
              English
              <div className="flags">
                <img className="flag-us" src={usFlag_icon} />
                <img className="flag-uk" src={ukFlag_icon} />
              </div>
              <input onClick={() => ChooseLanguage("en")} name="active" id="english" type="radio"  />
            </label>

            <label
              className="select-language"
              name="am"
              for="amharic"
            >
              Amharic
              <div className="flags">
                <img className="flag-et" src={ethiopia_flag_icon} />
              </div>
              <input onClick={() => ChooseLanguage("am")} name="active" id="amharic" type="radio" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageMenu;
