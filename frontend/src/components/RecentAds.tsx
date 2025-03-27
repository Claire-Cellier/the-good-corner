import { useEffect, useState } from "react";
import axios from "axios";

import AdCard from "./AdCard";

import type { AdCardProps } from "./AdCard";

import "./RecentAds.module.css";

function RecentAds() {
	// const recentAds = [
	// 	{
	// 		id: 1,
	// 		img_url: "/images/table.webp",
	// 		title: "Table",
	// 		price: 100,
	// 		link: "/ads/table",
	// 	},
	// 	{
	// 		id: 2,
	// 		img_url: "/images/dame-jeanne.webp",
	// 		title: "Dame-Jeanne",
	// 		price: 75,
	// 		link: "/ads/dame-jeanne",
	// 	},
	// 	{
	// 		id: 3,
	// 		img_url: "/images/vide-poche.webp",
	// 		title: "Vide poche",
	// 		price: 4,
	// 		link: "/ads/vide-poche",
	// 	},
	// 	{
	// 		id: 4,
	// 		img_url: "/images/vaisselier.webp",
	// 		title: "Vaisselier",
	// 		price: 900,
	// 		link: "/ads/vaisselier",
	// 	},
	// 	{
	// 		id: 5,
	// 		img_url: "/images/bougie.webp",
	// 		title: "Bougie",
	// 		price: 8,
	// 		link: "/ads/bougie",
	// 	},
	// 	{
	// 		id: 6,
	// 		img_url: "/images/porte-magazine.webp",
	// 		title: "Porte-magazine",
	// 		price: 45,
	// 		link: "/ads/porte-magazine",
	// 	},
	// ];

	const [ads, setAds] = useState<AdCardProps[]>([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get("http://localhost:3000/ads");
			setAds(result.data);
		};
		fetchData();
	}, []);

	return (
		<main className="main-content">
			<h3>Basket total = {total} € </h3>
			<h2>Annonces récentes</h2>
			<section className="recent-ads">
				{ads?.map((ad) => (
					<article key={ad.id}>
						<AdCard
							img_url={ad.img_url}
							title={ad.title}
							price={ad.price}
							id={ad.id}
						/>
						<button
							type="button"
							className="button"
							onClick={() => setTotal(total + ad.price)}
						>
							Add to basket
						</button>
					</article>
				))}
			</section>
		</main>
	);
}

export default RecentAds;
