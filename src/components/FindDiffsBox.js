import { useContext, useState } from "react";
import ThemeBtn from "./ThemeBtn";
import VolumeBtn from "./VolumeBtn";
import { SoundContext } from "../contexts/SoundContext";
import { useNavigate } from "react-router-dom";
import {
	playDiffFoundSound,
	playLastDiffFoundSound,
	playClickSound,
	playHintSound,
} from "../utils/audioUtils";
import { shootConfetti } from "../utils/confetti";
import WinningScreen from "./WinningScreen";

export default function FindDiffsBox({ painting, lastId }) {
	const { isMuted } = useContext(SoundContext);

	const diffs = [1, 2, 3, 4, 5];
	const [diffFound, setDiffFound] = useState({});
	const [lights, setLights] = useState([]);
	const [hintedDiff, setHintedDiff] = useState(null);

	const navigate = useNavigate();
	const [isGameOver, setGameOver] = useState(false);

	const handleFindDiff = (num, navigate) => {
		setDiffFound({ ...diffFound, [num]: true });
		setLights((prevLights) => [...prevLights, 1]);

		if (!isMuted) {
			lights.length <= 3 ? playDiffFoundSound() : playLastDiffFoundSound();
		}
		if (lights.length === 4) {
			shootConfetti();
		}
		if (lights.length === 4 && painting.id === lastId) {
			setTimeout(() => {
				setGameOver(true);
			}, 3000);
		} else if (lights.length === 4) {
			setTimeout(() => {
				let nextId = painting.id + 1;
				let nextBoxPath = `/${nextId}`;
				navigate(nextBoxPath);
			}, 3000);
		}
	};

	const handleShowHint = () => {
		const nonFoundDiffs = diffs.filter((diff) => !diffFound[diff]);
		if (nonFoundDiffs.length > 0) {
			const randomDiff =
				nonFoundDiffs[Math.floor(Math.random() * nonFoundDiffs.length)];
			setHintedDiff(randomDiff);
			setTimeout(() => {
				setHintedDiff(null);
			}, 1200);
		}
		if (!isMuted) {
			playHintSound();
		}
	};

	const [isPaintingInfoOpen, togglePaintingInfo] = useState(false);
	const handlePaintingInfoClick = () => {
		togglePaintingInfo((prevState) => !prevState);
		if (!isMuted) {
			playClickSound();
		}
	};

	return (
		<section className={`find-diffs-box ${painting.className}`}>
			<div className="top-bar">
				<div className="top-bar__wrapper">
					<VolumeBtn className="top-bar__btn top-bar__btn--left" />
					<ThemeBtn className="top-bar__btn top-bar__btn--left" />
					<button
						onClick={handleShowHint}
						className="top-bar__btn top-bar__btn--left">
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
					<div className="diffs-counter">
						{[1, 2, 3, 4, 5].map((num) => (
							<div
								className={`diffs-counter__light light-${num} ${
									num <= lights.length ? "turn-on" : ""
								}`}
								key={num}></div>
						))}
					</div>
				</div>
				<button
					onClick={handlePaintingInfoClick}
					className="top-bar__btn top-bar__btn--info">
					{isPaintingInfoOpen ? (
						<i className="fa-solid fa-xmark"></i>
					) : (
						<i className="fa-solid fa-question"></i>
					)}
				</button>
				<div className={`painting-info ${isPaintingInfoOpen ? "is-open" : ""}`}>
					<p className="painting-info__text">
						The painting is "{painting.title}" by {painting.author}
					</p>
				</div>
			</div>
			<div className="paintings-wrapper done">
				<div className="paintings-wrapper__painting">
					<img
						className={painting.orientation}
						srcSet={`/img/${painting.className}/original-big.jpg ${
							painting.orientation === "vertical" ? "450w" : "650w"
						},
						  /img/${painting.className}/original-small.jpg ${
							painting.orientation === "vertical" ? "375w" : "540w"
						}`}
						sizes={`(max-width: 768px) ${
							painting.orientation === "vertical" ? "375px" : "540px"
						}, ${painting.orientation === "vertical" ? "450px" : "650px"}`}
						src={`/img/${painting.className}/original-big.jpg`}
						alt={`"${painting.title}" by ${painting.author} - find the differences`}
					/>

					{[1, 2, 3, 4, 5].map((num) => (
						<div
							onClick={() => !diffFound[num] && handleFindDiff(num, navigate)}
							key={num}
							className={`paintings-wrapper__diff diff-${num} ${
								diffFound[num] ? "found" : ""
							} ${num === hintedDiff ? "hint" : ""}`}></div>
					))}
				</div>

				<div className="paintings-wrapper__painting">
					<img
						className={painting.orientation}
						src={`/img/${painting.className}/with-diffs-big.jpg`}
						alt={`"${painting.title}" by ${painting.author} - find the differences`}
					/>
					{[1, 2, 3, 4, 5].map((num) => (
						<div
							onClick={() => !diffFound[num] && handleFindDiff(num, navigate)}
							key={num}
							className={`paintings-wrapper__diff diff-${num} ${
								diffFound[num] ? "found" : ""
							} ${num === hintedDiff ? "hint" : ""}`}></div>
					))}
				</div>
			</div>
			<WinningScreen isGameOver={isGameOver} />
		</section>
	);
}
