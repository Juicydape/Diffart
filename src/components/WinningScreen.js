export default function WinningScreen({ isGameOver }) {
  const handlePlayAgain = () => {
    window.location.href = "/1";
  };

  const winningScreenStyles = { display: isGameOver ? "flex" : "none" };
  const winningScreenImage = {
    srcSet: "img/mona-lisa-600.png 600w, img/mona-lisa-850.png 850w",
    sizes: "(max-height: 650px) 600px, 850px",
    src: "img/mona-lisa-850.png",
    alt: "Mona Lisa",
  };

  return (
    <div className="winning-screen" style={winningScreenStyles}>
      <div className="winning-screen__wrapper--left">
        <p>You win!</p>
        <button onClick={handlePlayAgain} className="winning-screen__btn">
          play again
        </button>
      </div>
      <div className="winning-screen__wrapper--right">
        <img {...winningScreenImage}/>
      </div>
    </div>
  );
}