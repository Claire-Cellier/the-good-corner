import { Route, Routes } from "react-router";
import "./App.css";

import About from "./pages/About";
import Layout from "./pages/Layout";
import RecentAds from "./components/RecentAds";
import AdDetails from "./pages/AdDetails";
import NewAdForm from "./pages/NewAdForm";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<RecentAds />} />
				<Route path="about" element={<About />} />
				<Route path="ad/:id" element={<AdDetails />} />
				<Route path="ad/new" element={<NewAdForm />} />
			</Route>
		</Routes>
	);
}

export default App;
