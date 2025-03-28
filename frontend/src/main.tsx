import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";

import { BasketProvider } from "./context/basket.tsx";

import App from "./App.tsx";

import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<BasketProvider>
				<App />
				<ToastContainer />
			</BasketProvider>
		</BrowserRouter>
	</StrictMode>,
);
