import React, { createContext, useState } from "react";

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
	const [isMuted, setIsMuted] = useState(false);
	function playClickSound() {
		new Audio("/audio/button-click.wav").play().currentTime = 0;
	}
	const toggleMute = () => {
		setIsMuted((prevState) => !prevState);
		if (isMuted) {
			playClickSound();
		}
	};

	return (
		<SoundContext.Provider value={{ isMuted, toggleMute }}>
			{children}
		</SoundContext.Provider>
	);
};
