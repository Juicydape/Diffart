import { useContext } from "react";
import { SoundContext } from "../contexts/SoundContext";

export default function VolumeBtn(props) {
  const { isMuted, handleToggleMute } = useContext(SoundContext);
  const buttonTransformationClasses = isMuted ? (
    <i className="fa-solid fa-volume-xmark"></i>
  ) : (
    <i className="fa-solid fa-volume-high"></i>
  );
  
  return (
    <button onClick={handleToggleMute} className={props.className}>
      {buttonTransformationClasses}
    </button>
  );
}
