import { Route, Routes } from "react-router";
import "./App.css";

import About from "./pages/About";
import Layout from "./pages/Layout";
import AdDetails from "./pages/AdDetails";
import Ads from "./pages/Ads";
import AdForm from "./pages/AdForm";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Ads />} />
				<Route path="about" element={<About />} />
				<Route path="ads" element={<Ads />} />
				<Route path="ads/:id" element={<AdDetails />} />
				<Route path="ads/new" element={<AdForm />} />
				<Route path="ads/edit/:id" element={<AdForm />} />
			</Route>
		</Routes>
	);
}

export default App;
