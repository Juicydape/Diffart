import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeBtn = (props) => {
	const { toggleTheme, theme } = useContext(ThemeContext);
	return (
		<button onClick={toggleTheme} className={props.className}>
			{theme === "light-theme" ? (
				<i className="fa-solid fa-moon"></i>
			) : (
				<i className="fa-solid fa-sun"></i>
			)}
		</button>
	);
};

export default ThemeBtn;
