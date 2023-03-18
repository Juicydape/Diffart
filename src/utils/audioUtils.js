export const playSound = (audioPath) =>
	(new Audio(audioPath).play().currentTime = 0);

export const playDiffFoundSound = () => playSound("/audio/diff-found.wav");
export const playLastDiffFoundSound = () => playSound("/audio/fanfare.wav");
export const playClickSound = () => playSound("/audio/button-click.wav");
export const playHintSound = () => playSound("/audio/hint.wav");
