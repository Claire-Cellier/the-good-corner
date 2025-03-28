import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { useBasket } from "../context/basket";

import AdCard from "../components/AdCard";

import type { AdCardProps } from "../components/AdCard";
import type { Category } from "../types/Category";

function Ads() {
	const { total, setTotal } = useBasket();
	const [searchParams] = useSearchParams();

	const title = searchParams.get("title");
	const categoryId = searchParams.get("category");

	const [ads, setAds] = useState<AdCardProps[]>([]);
	const [category, setCategory] = useState<Category>();

	useEffect(() => {
		if (!categoryId) return;

		const getCategory = async () => {
			try {
				const { data } = await axios.get(
					`http://localhost:3000/categories/${categoryId}`,
				);
				setCategory(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des catégories :", error);
			}
		};

		getCategory();
	}, [categoryId]);

	useEffect(() => {
		const fetchData = async () => {
			const queryParams = new URLSearchParams();
			if (title) queryParams.append("title", title);
			if (categoryId) queryParams.append("category", categoryId);

			const url = `http://localhost:3000/ads?${queryParams.toString()}`;
			const result = await axios.get(url);
			setAds(result.data);
		};
		fetchData();
	}, [categoryId, title]);

	return (
		<main className="main-content">
			<h3>Basket total = {total} € </h3>
			<h2>
				{category
					? category.title
					: title
						? "Résultat de la recherche"
						: "Annonces récentes"}
			</h2>
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

export default Ads;
