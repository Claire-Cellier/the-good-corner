import type { RequestHandler } from "express";
import { Tag } from "../entities/Tag";

export const browse: RequestHandler = async (_req, res, next) => {
	try {
		const tags = await Tag.find();
		res.status(200).send(tags);
	} catch (err) {
		next(err);
	}
};

export const add: RequestHandler = async (req, res, next) => {
	const tags = req.body;
	if (!tags) res.status(400).send("Missing tags");

	const tagEntities = tags.map((tag: { title: string }) => {
		const newTag = new Tag();
		newTag.title = tag.title;
		return newTag;
	});

	try {
		await Tag.save(tagEntities);
		res.status(201).json(tagEntities);
	} catch (err) {
		next(err);
	}
};
