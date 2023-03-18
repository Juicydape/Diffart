import "./App.css";
import "./paintings.css";
import FindDiffsBox from "./components/FindDiffsBox";
import StartBox from "./components/StartBox";
import paintingsData from "./paintingsData";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
				<BrowserRouter>
					<Routes>
						<Route exact path="/" Component={StartBox} />
						{paintings}
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</SoundProvider>
	);
}

export default App;
