import type { RequestHandler } from "express";
import { type FindOptionsWhere, Like } from "typeorm";

import { Ad } from "../entities/Ad";

export const browse: RequestHandler = async (req, res, next) => {
	const { category, tag, title } = req.query;

	const where: FindOptionsWhere<Ad> = {};

	if (category) where.category = { id: Number(category) };
	if (tag) where.tags = { id: Number(tag) };
	if (title) where.title = Like(`%${title.toString()}%`);

	try {
		const ads = await Ad.find({
			where,
		});
		res.status(200).send(ads);
	} catch (err) {
		next(err);
	}
};

export const read: RequestHandler = async (req, res, next) => {
	const id = Number.parseInt(req.params.id);
	if (!id) res.status(400).send("Missing id");

	try {
		const ad = await Ad.findOneBy({ id });
		res.status(200).send(ad);
	} catch (err) {
		next(err);
	}
};

export const add: RequestHandler = async (req, res, next) => {
	const ad = new Ad();
	ad.title = req.body.title;
	ad.description = req.body.description;
	ad.owner = req.body.owner;
	ad.price = req.body.price;
	ad.img_url = req.body.img_url;
	ad.location = req.body.location;
	ad.category = req.body.category;
	ad.tags = req.body.tags.map((tagId: string) => ({
		id: Number.parseInt(tagId),
	}));

	try {
		const newAd = await ad.save();
		res.status(201).json({ id: newAd.id });
	} catch (err) {
		next(err);
	}
};

export const edit: RequestHandler = async (req, res, next) => {
	const id = Number.parseInt(req.params.id);
	if (!id) res.status(400).send("Missing id");

	try {
		const ad = await Ad.findOneBy({ id });
		if (ad !== null) {
			ad.title = req.body.title;
			ad.description = req.body.description;
			ad.owner = req.body.owner;
			ad.price = req.body.price;
			ad.img_url = req.body.img_url;
			ad.location = req.body.location;
			ad.category = req.body.category;
			ad.tags = req.body.tags.map((tagId: string) => ({
				id: Number.parseInt(tagId),
			}));

			await ad.save();
		}

		res.status(200).send(ad);
	} catch (err) {
		next(err);
	}
};

export const remove: RequestHandler = async (req, res, next) => {
	const id = Number.parseInt(req.params.id);
	if (!id) res.status(400).send("Missing id");

	try {
		await Ad.delete({ id });
		res.status(204);
	} catch (err) {
		next(err);
	}
};
