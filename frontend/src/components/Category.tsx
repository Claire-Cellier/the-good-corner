import axios from "axios";
import { useState, useEffect } from "react";
import AdCard, { type AdCardProps } from "./AdCard";
import { useParams } from "react-router";

type categoryOrTag = {
	id: number;
	title: string;
};

function Category() {
	const { id } = useParams<{ id: string }>();

	const [ads, setAds] = useState<AdCardProps[]>([]);
	const [total, setTotal] = useState(0);
	const [category, setCategory] = useState<categoryOrTag>();

	useEffect(() => {
		if (!id) return;

		const getCategory = async () => {
			try {
				const { data } = await axios.get(
					`http://localhost:3000/categories/${id}`,
				);
				setCategory(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des catégories :", error);
			}
		};

		getCategory();
	}, [id]);

	if (!id || !category) return <>Erreur, impossible de trouver la catégorie.</>;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(
					`http://localhost:3000/ads?category=${id}`,
				);
				setAds(result.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des annonces :", error);
			}
		};

		if (id) fetchData();
	}, [id]);

	if (!category) return <>Catégorie introuvable.</>;

	return (
		<main className="main-content">
			<h3>Basket total = {total} € </h3>
			<h2>{category?.title}</h2>
			<section className="recent-ads">
				{ads?.map((ad) => (
					<article key={ad.id}>
						<AdCard
							id={ad.id}
							img_url={ad.img_url}
							title={ad.title}
							price={ad.price}
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

export default Category;
