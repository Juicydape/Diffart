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
  const { audioIsMuted } = useContext(SoundContext);
  const [diffFound, setDiffFound] = useState({});
  const [hintedDiff, setHintedDiff] = useState(null);
  const [lights, setLights] = useState([]);
  const [showPaintingInfo, setShowPaintingInfo] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const navigate = useNavigate();
  const diffs = [1, 2, 3, 4, 5];


  const handleFindDiff = (num, navigate) => {
    setDiffFound({ ...diffFound, [num]: true });
    setLights((prevLights) => [...prevLights, 1]);

    const foundFirstFourDiffrences = lights.length <= 3;
    const foundLastDiffrence = lights.length === 4;
    const isOnFinalStage = painting.id === lastId;

    if (!audioIsMuted) {
      foundFirstFourDiffrences ? playDiffFoundSound() : playLastDiffFoundSound();
    }
    if (foundLastDiffrence) {
      shootConfetti();
    }
    if (foundLastDiffrence && isOnFinalStage) {
      setTimeout(() => {
        setIsGameOver(true);
      }, 3000);
    }
    if (foundLastDiffrence && !isOnFinalStage) {
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
    if (!audioIsMuted) {
      playHintSound();
    }
  };


  const handlePaintingInfoClick = () => {
    setShowPaintingInfo((prevState) => !prevState);
    if (!audioIsMuted) {
      playClickSound();
    }
  };

  const diffsCounter = diffs.map((num) => (
    <div
      className={`diffs-counter__light light-${num} ${
        num <= lights.length ? "turn-on" : ""
      }`}
      key={num}
    ></div>
  ));

  const infoButtonContents = showPaintingInfo ? (
    <i className="fa-solid fa-xmark"></i>
  ) : (
    <i className="fa-solid fa-question"></i>
  );

  const commonImgAttributes = {
    className: painting.orientation,
    alt: `"${painting.title}" by ${painting.author} - find the differences`,
  };

  const imgAttributes1 = {
    srcSet: `/img/${painting.className}/original-big.jpg ${
      painting.orientation === "vertical" ? "450w" : "650w"
    },
					/img/${painting.className}/original-small.jpg ${
      painting.orientation === "vertical" ? "375w" : "540w"
    }`,
    sizes: `(max-width: 768px) ${
      painting.orientation === "vertical" ? "375px" : "540px"
    }, ${painting.orientation === "vertical" ? "450px" : "650px"}`,
    src: `/img/${painting.className}/original-big.jpg`,
  };

  const imgAttributes2 = {
    src: `/img/${painting.className}/with-diffs-big.jpg`,
  };

  const functionBelowImg = diffs.map((num) => (
    <div
      onClick={() => !diffFound[num] && handleFindDiff(num, navigate)}
      key={num}
      className={`paintings-wrapper__diff diff-${num} ${
        diffFound[num] ? "found" : null
      } ${num === hintedDiff ? "hint" : null}`}
    ></div>
  ));

  return (
    <section className={`find-diffs-box ${painting.className}`}>
      <div className="top-bar">
        <div className="top-bar__wrapper">
          <VolumeBtn className="top-bar__btn top-bar__btn--left" />
          <ThemeBtn className="top-bar__btn top-bar__btn--left" />
          <button
            onClick={handleShowHint}
            className="top-bar__btn top-bar__btn--left"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <div className="diffs-counter">{diffsCounter}</div>
        </div>
        <button
          onClick={handlePaintingInfoClick}
          className="top-bar__btn top-bar__btn--info"
        >
          {infoButtonContents}
        </button>
        <div
          className={`painting-info ${showPaintingInfo ? "is-open" : null}`}
        >
          <p className="painting-info__text">
            The painting is "{painting.title}" by {painting.author}
          </p>
        </div>
      </div>
      <div className="paintings-wrapper done">
        <div className="paintings-wrapper__painting">
          <img {...commonImgAttributes} {...imgAttributes1} />
          {functionBelowImg}
        </div>
        <div className="paintings-wrapper__painting">
          <img {...commonImgAttributes} {...imgAttributes2} />
          {functionBelowImg}
        </div>
      </div>
      <WinningScreen isGameOver={isGameOver} />
    </section>
  );
}
