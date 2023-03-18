import { Link } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";
import VolumeBtn from "./VolumeBtn";
import { SoundContext } from "../contexts/SoundContext";
import { useContext } from "react";
import { playClickSound } from "../utils/audioUtils";

export default function StartBox() {
	const { isMuted } = useContext(SoundContext);
	return (
		<section className="start-box">
			<div className="start-box__content-wrapper">
				<h1 className="start-box__app-name">Diffart</h1>
				<p className="start-box__app-description">
					Find the differences in famous paintings!
				</p>

				<div className="start-box__paintings-wrapper">
					<img
						src="img/start-box/sunflowers.jpg"
						alt={`"Sunflowers" by Vincent van Gogh - spot the differences`}
					/>
					<img
						src="img/start-box/sunflowers-with-diffs.jpg"
						alt={`"Sunflowers" by Vincent van Gogh - spot the differences`}
					/>
				</div>

				<div className="btns-box">
					<VolumeBtn className="btns-box__btn btns-box__btn--volume" />
					<Link to="/1">
						<button
							onClick={isMuted ? null : playClickSound}
							className="btns-box__btn btns-box__btn--play open-box-btn">
							play
							<i className="fa-solid fa-play"></i>
						</button>
					</Link>
					<ThemeBtn className="btns-box__btn btns-box__btn--theme theme-btn light-theme" />
				</div>
			</div>
		</section>
	);
}
