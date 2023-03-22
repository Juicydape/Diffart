import React, { createContext, useState, useContext } from "react";
import { SoundContext } from "./SoundContext";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light-theme");
	const { isMuted } = useContext(SoundContext);
	function playClickSound() {
		new Audio("/audio/button-click.wav").play().currentTime = 0;
	}
	const handleToggleTheme = () => {
		const newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
		document.body.className = newTheme;
		setTheme(newTheme);
		if (!isMuted) {
			playClickSound();
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, handleToggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
