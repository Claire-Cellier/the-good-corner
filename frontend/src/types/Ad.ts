import type { Tag } from "./Tag";
import type { Category } from "./Category";

export type Ad = {
	title: string;
	category: Category;
	description: string;
	owner: string;
	price: number;
	location: string;
	tags: Tag[];
	img_url: string;
	createdAt: string;
};
