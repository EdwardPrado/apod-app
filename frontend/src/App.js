import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Likes from "./pages/Likes/Likes";
import Date from "./pages/Date/Date";

function App() {
	return (
		<>
			<Navbar />
			<main>
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/search" element={<Search />} />
						<Route exact path="/likes" element={<Likes />} />
						<Route exact path="/post" element={<Date />} />
					</Routes>
				</Router>
			</main>
		</>
	);
}

export default App;
