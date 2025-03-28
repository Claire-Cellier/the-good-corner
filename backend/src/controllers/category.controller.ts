import type { RequestHandler } from "express";
import { Category } from "../entities/Category";

export const browse: RequestHandler = async (_req, res, next) => {
	try {
		const categories = await Category.find();
		res.send(categories);
	} catch (err) {
		next(err);
	}
};

export const read: RequestHandler = async (req, res, next) => {
	const id = Number.parseInt(req.params.id);
	if (!id) res.status(400).send("Missing id");

	try {
		const category = await Category.findOneBy({ id });
		res.status(200).send(category);
	} catch (err) {
		next(err);
	}
};

export const add: RequestHandler = async (req, res, next) => {
	const categories = req.body;
	if (!categories) res.status(400).send("Missing categories");

	const categoryEntities = categories.map((category: { title: string }) => {
		const newCategory = new Category();
		newCategory.title = category.title;
		return newCategory;
	});

	try {
		await Category.save(categoryEntities);
		res.status(201).json(categoryEntities);
	} catch (err) {
		next(err);
	}
};
