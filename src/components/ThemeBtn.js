import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeBtn = (props) => {
  const { handleToggleTheme, theme } = useContext(ThemeContext);
  const themeTransformationClasses =
    theme === "light-theme" ? (
      <i className="fa-solid fa-moon"></i>
    ) : (
      <i className="fa-solid fa-sun"></i>
    );

  return (
    <button onClick={handleToggleTheme} className={props.className}>
      {themeTransformationClasses}
    </button>
  );
};

export default ThemeBtn;
