import { Route, Routes } from "react-router";
import "./App.css";

import About from "./pages/About";
import Layout from "./pages/Layout";
import RecentAds from "./components/RecentAds";
import AdDetails from "./pages/AdDetails";
import NewAdForm from "./pages/NewAdForm";
import Category from "./components/Category";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<RecentAds />} />
				<Route path="about" element={<About />} />
				<Route path="ads/:id" element={<AdDetails />} />
				<Route path="ads/new" element={<NewAdForm />} />
				<Route path="category/:id" element={<Category />} />
			</Route>
		</Routes>
	);
}

export default App;
