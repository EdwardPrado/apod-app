import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Likes from "./pages/Likes/Likes";
import Post from "./pages/Post/Post";
import Search from "./pages/Search/Search";

function App() {
	return (
		<>
			<Navbar />
			<main>
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/likes" element={<Likes />} />
						<Route exact path="/post" element={<Post />} />
						<Route exact path="/search" element={<Search />} />
					</Routes>
				</Router>
			</main>
		</>
	);
}

export default App;
