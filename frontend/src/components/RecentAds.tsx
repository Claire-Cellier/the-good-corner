import AdCard from "./AdCard";

import "./RecentAds.module.css";

function RecentAds() {
	const recentAds = [
		{
			id: 1,
			image: "/images/table.webp",
			title: "Table",
			price: 100,
			link: "/ads/table",
		},
		{
			id: 2,
			image: "/images/dame-jeanne.webp",
			title: "Dame-Jeanne",
			price: 75,
			link: "/ads/dame-jeanne",
		},
		{
			id: 3,
			image: "/images/vide-poche.webp",
			title: "Vide poche",
			price: 4,
			link: "/ads/vide-poche",
		},
		{
			id: 4,
			image: "/images/vaisselier.webp",
			title: "Vaisselier",
			price: 900,
			link: "/ads/vaisselier",
		},
		{
			id: 5,
			image: "/images/bougie.webp",
			title: "Bougie",
			price: 8,
			link: "/ads/bougie",
		},
		{
			id: 6,
			image: "/images/porte-magazine.webp",
			title: "Porte-magazine",
			price: 45,
			link: "/ads/porte-magazine",
		},
	];
	return (
		<main className="main-content">
			<h2>Annonces récentes</h2>
			<section className="recent-ads">
				{recentAds.map((ad) => (
					<AdCard
						key={ad.id}
						image={ad.image}
						title={ad.title}
						price={ad.price}
						link={ad.link}
					/>
				))}
			</section>
		</main>
	);
}

export default RecentAds;
