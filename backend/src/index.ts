import express from "express";
// import sqlite3 from "sqlite3";
import "reflect-metadata";
import dataSource from "./config/db";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";

const app = express();

// const db = new sqlite3.Database("./database/good_corner.sqlite");

app.use(express.json());

const port = 3000;

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

app.post("/tags", async (req, res) => {
	const tags = req.body;
	const tagEntities = tags.map((category: { title: string }) => {
		const newTag = new Tag();
		newTag.title = category.title;
		return newTag;
	});

	await Tag.save(tagEntities);

	res.status(201).json(tagEntities);
});

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.get("/ads", async (_req, res) => {
	const ads = await Ad.find();
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
		createdAt,
	} = req.body;

	const category = await Category.findOneOrFail({ where: { id: categoryId } });

	const ad = new Ad();
	ad.title = title;
	ad.description = description;
	ad.owner = owner;
	ad.price = price;
	ad.picture = picture;
	ad.location = location;
	ad.createdAt = createdAt;
	ad.category = category;

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

// app.get("/ads", (_req, res) => {
// 	db.all("SELECT * FROM ad", (err, rows) => {
// 		if (err) {
// 			console.error(err);
// 			res.status(500).send("An error occurred");
// 		} else {
// 			res.send(rows);
// 		}
// 	});
// });

// app.post("/ads", (req, res) => {
// 	const stmt = db.prepare(
// 		"INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
// 	);
// 	stmt.run(
// 		[
// 			req.body.title,
// 			req.body.description,
// 			req.body.owner,
// 			req.body.price,
// 			req.body.picture,
// 			req.body.location,
// 			req.body.createdAt,
// 		],
// 		(err) => {
// 			if (err) {
// 				console.error(err);
// 				res.status(500).send("An error occurred");
// 			} else {
// 				res.sendStatus(201).send("congrats, ad is created");
// 			}
// 		},
// 	);
// });

// app.delete("/ads/:id", (req, res) => {
// 	const stmt = db.prepare("DELETE FROM ad WHERE id = ?");
// 	stmt.run([req.params.id], (err) => {
// 		if (err) {
// 			console.error(err);
// 			res.status(500).send("An error occurred");
// 		} else {
// 			res.sendStatus(200);
// 		}
// 	});
// });

// app.put("/ads/:id", (req, res) => {
// 	const stmt = db.prepare(
// 		"UPDATE ad SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ?, created_at = ? WHERE id = ? ",
// 	);
// 	stmt.run(
// 		[
// 			req.body.title,
// 			req.body.description,
// 			req.body.owner,
// 			req.body.price,
// 			req.body.picture,
// 			req.body.location,
// 			req.body.created_at,
// 			req.params.id,
// 		],
// 		(err) => {
// 			if (err) {
// 				console.error(err);
// 				res.status(500).send("An error occurred");
// 			} else {
// 				res.sendStatus(200);
// 			}
// 		},
// 	);
// });

app.listen(port, async () => {
	await dataSource.initialize();
	console.log(`Example app listening on port ${port}`);
});
