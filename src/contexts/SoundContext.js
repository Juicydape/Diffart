import React, { createContext, useState } from "react";

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
	const [audioIsMuted, setAudioIsMuted] = useState(false);
	function playClickSound() {
		new Audio("/audio/button-click.wav").play().currentTime = 0;
	}
	const handleToggleAudio = () => {
		setAudioIsMuted((prevState) => !prevState);
		if (audioIsMuted) {
			playClickSound();
		}
	};

	return (
		<SoundContext.Provider value={{ audioIsMuted, handleToggleAudio }}>
			{children}
		</SoundContext.Provider>
	);
};
