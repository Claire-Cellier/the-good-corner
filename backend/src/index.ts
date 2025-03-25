import express from "express";
import "reflect-metadata";

import dataSource from "./config/db";

import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";
import { In, type FindOptionsWhere } from "typeorm";

const app = express();

app.use(express.json());

const port = 3000;

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

// CATEGORIES

app.post("/categories", async (req, res) => {
	const categories = req.body;
	const categoryEntities = categories.map((category: { title: string }) => {
		const newCategory = new Category();
		newCategory.title = category.title;
		return newCategory;
	});

	await Category.save(categoryEntities);

	res.status(201).json(categoryEntities);
});

app.get("/categories", async (_req, res) => {
	const categories = await Category.find();
	res.send(categories);
});

// TAGS

app.post("/tags", async (req, res) => {
	const tags = req.body;
	const tagEntities = tags.map((tag: { title: string }) => {
		const newTag = new Tag();
		newTag.title = tag.title;
		return newTag;
	});

	await Tag.save(tagEntities);

	res.status(201).json(tagEntities);
});

app.get("/tags", async (_req, res) => {
	const tags = await Tag.find();
	res.send(tags);
});

// ADS

app.get("/ads", async (req, res) => {
	const { category, tag } = req.query;

	const where: FindOptionsWhere<Ad> = {};
	if (category) where.category = { id: Number(category) };
	if (tag) where.tags = { id: Number(tag) };

	const ads = await Ad.find({
		where,
	});
	res.send(ads);
});

app.get("/ads/:id", async (req, res) => {
	const id = Number.parseInt(req.params.id);
	const ad = await Ad.findOneBy({ id });
	res.send(ad);
});

app.post("/ads", async (req, res) => {
	const {
		title,
		description,
		owner,
		price,
		picture,
		location,
		categoryId,
		tagIds,
		createdAt,
	} = req.body;

	const category = await Category.findOneByOrFail({ id: categoryId });
	const tags = await Tag.findBy({ id: In(tagIds) });

	const ad = new Ad();
	ad.title = title;
	ad.description = description;
	ad.owner = owner;
	ad.price = price;
	ad.picture = picture;
	ad.location = location;
	ad.createdAt = createdAt;
	ad.category = category;
	ad.tags = tags;

	await ad.save();

	res.json(ad);
});

app.put("/ads/:id", async (req, res) => {
	const id = Number.parseInt(req.params.id);
	const {
		title,
		description,
		owner,
		price,
		picture,
		location,
		categoryId,
		createdAd,
	} = req.body;

	const category = await Category.findOneOrFail({ where: { id: categoryId } });

	const ad = await Ad.findOneBy({ id });
	if (ad !== null) {
		ad.title = title;
		ad.description = description;
		ad.owner = owner;
		ad.price = price;
		ad.picture = picture;
		ad.location = location;
		ad.createdAt = createdAd;
		ad.category = category;

		await ad.save();
	}

	res.send(ad);
});

app.delete("/ads/:id", async (req, res) => {
	const id = Number.parseInt(req.params.id);
	await Ad.delete({ id });
	res.send("OK");
});

app.listen(port, async () => {
	console.log(`Example app listening on port ${port}`);
	await dataSource.initialize();
	const categories = await Category.find();
	if (categories.length === 0) {
		const misc = new Category();
		misc.title = "misc";
		misc.save();
	}
});
