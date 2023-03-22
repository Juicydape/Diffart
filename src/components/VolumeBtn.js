import { useContext } from "react";
import { SoundContext } from "../contexts/SoundContext";

export default function VolumeBtn(props) {
	const { isMuted, handleToggleMute } = useContext(SoundContext);
	return (
		<button onClick={handleToggleMute} className={props.className}>
			{isMuted ? (
				<i className="fa-solid fa-volume-xmark"></i>
			) : (
				<i className="fa-solid fa-volume-high"></i>
			)}
		</button>
	);
}
