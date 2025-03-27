import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { fetchCategories } from "../services/categories";
import { fetchTags } from "../services/tags";

type categoryOrTag = {
	id: number;
	title: string;
};

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

function NewAdForm() {
	const { register, handleSubmit } = useForm<Inputs>();

	const [categories, setCategories] = useState<categoryOrTag[]>();
	const [tags, setTags] = useState<categoryOrTag[]>();

	useEffect(() => {
		const getCategories = async () => {
			const data = await fetchCategories();
			setCategories(data);
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
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const postAd = async () => {
			try {
				await axios.post("http://localhost:3000/ads", {
					...data,
					img_url:
						"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExanN5bWcycjlwbHBvbzdnNWNqNGU5amlnb2VheXAyZWVlbHRzczBneCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tXL4FHPSnVJ0A/giphy.gif",
				});
				return console.log("bravo !");
			} catch (err) {
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
					{categories?.slice(1).map((cat) => (
						<option value={cat.id} key={cat.id}>
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
						<input type="checkbox" value={tag.id} {...register("tags")} />
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

export default NewAdForm;
