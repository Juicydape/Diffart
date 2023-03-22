import "./App.css";
import "./paintings.css";
import FindDiffsBox from "./components/FindDiffsBox";
import StartBox from "./components/StartBox";
import paintingsData from "./paintingsData";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SoundProvider } from "./contexts/SoundContext";

function App() {
	const lastPainting = paintingsData[paintingsData.length - 1];
	const lastId = lastPainting.id;
	const paintings = paintingsData.map((painting) => {
		return (
			<Route
				key={painting.id}
				path={`/${painting.id}`}
				Component={() => <FindDiffsBox lastId={lastId} painting={painting} />}
			/>
		);
	});

	return (
		<SoundProvider>
			<ThemeProvider>
				<Routes>
					<Route exact path="/" Component={StartBox} />
					{paintings}
				</Routes>
			</ThemeProvider>
		</SoundProvider>
	);
}

export default App;
