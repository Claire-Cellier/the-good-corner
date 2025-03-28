import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import { fetchCategories } from "../services/categories";
import { fetchTags } from "../services/tags";

import type { Ad } from "../types/Ad";
import type { Category } from "../types/Category";
import type { Tag } from "../types/Tag";
import { fetchAd } from "../services/ads";
import { toast } from "react-toastify";

type Inputs = {
	title: string;
	category: string;
	description: string;
	owner: string;
	price: number;
	location: string;
	tags: string[];
	img_url: string;
};

function AdForm() {
	const navigate = useNavigate();
	const { id } = useParams();

	const { register, handleSubmit, reset } = useForm<Inputs>();

	const [ad, setAd] = useState<Ad>();
	const [categories, setCategories] = useState<Category[]>();
	const [tags, setTags] = useState<Tag[]>();

	const edit = !!id;

	useEffect(() => {
		const getCategories = async () => {
			const data = await fetchCategories();
			setCategories(data.slice(1));
		};

		getCategories();
	}, []);

	useEffect(() => {
		const getTags = async () => {
			const data = await fetchTags();
			setTags(data);
		};

		getTags();
	}, []);

	useEffect(() => {
		const getCategories = async () => {
			const data = await fetchCategories();
			setCategories(data.slice(1));
		};

		getCategories();
	}, []);

	useEffect(() => {
		if (!edit) return;
		const getAd = async () => {
			const data = await fetchAd(id);
			setAd(data);
		};
		getAd();
	}, [id, edit]);

	useEffect(() => {
		if (ad) {
			reset({
				title: ad.title,
				category: ad.category.id.toString(),
				description: ad.description,
				owner: ad.owner,
				price: ad.price,
				location: ad.location,
				tags: ad.tags.map((tag) => tag.id.toString()) || [],
				img_url: ad.img_url,
			});
		}
	}, [ad, reset]);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const postAd = async () => {
			try {
				if (edit && ad) {
					await axios.put(`http://localhost:3000/ads/${id}`, {
						...data,
						img_url: ad.img_url,
					});
					toast.success("Annonce mise à jour");
					navigate(`/ads/${id}`);
				} else {
					const response = await axios.post("http://localhost:3000/ads", {
						...data,
						img_url:
							"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExanN5bWcycjlwbHBvbzdnNWNqNGU5amlnb2VheXAyZWVlbHRzczBneCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tXL4FHPSnVJ0A/giphy.gif",
					});
					const newId = response.data.id;
					toast.success("Annonce ajoutée");
					navigate(`/ads/${newId}`);
				}
				return console.log("bravo !");
			} catch (err) {
				toast.error("Oops, something went wrong");
				console.log(err);
			}
		};
		postAd();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="main-form">
			<label>
				Titre de l'annonce <input type="text" {...register("title")} />
			</label>

			<label>
				Catégorie
				<select {...register("category")}>
					{categories?.sort().map((cat) => (
						<option
							value={cat.id}
							key={cat.id}
							selected={ad && cat.id === Number(ad.category)}
						>
							{cat.title}
						</option>
					))}
				</select>
			</label>

			<div>
				Tags :{" "}
				{tags?.map((tag) => (
					<label key={tag.id}>
						{tag.title}
						<input
							type="checkbox"
							value={tag.id}
							defaultChecked={ad?.tags.some((adTag) => adTag.id === tag.id)}
							{...register("tags")}
						/>
					</label>
				))}
			</div>

			<label>
				Description <input type="text" {...register("description")} />
			</label>

			<label>
				Auteur <input type="text" {...register("owner")} />
			</label>

			<label>
				Prix <input type="number" {...register("price")} />
			</label>

			<label>
				Lieu <input type="text" {...register("location")} />
			</label>

			<button className="button" type="submit">
				Enregistrer
			</button>
		</form>
	);
}

export default AdForm;
