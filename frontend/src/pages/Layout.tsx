import { Outlet } from "react-router";

import Header from "../components/Header";

function Layout() {
	return (
		<main className="main-content">
			<Header />
			<Outlet />
		</main>
	);
}

export default Layout;
