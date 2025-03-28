import "reflect-metadata";

import { Category } from "./entities/Category";

import app from "./app";

import dataSource from "./config/db";

const port = 3000;

app.listen(port, async () => {
	try {
		await dataSource.initialize();
		console.log(`Good corner API listening on port ${port}`);
	} catch (err) {
		console.error("Oops, something went wrong with the initialisation");
	}

	try {
		const categories = await Category.find();

		if (categories.length === 0) {
			const misc = new Category();
			misc.title = "misc";
			misc.save();
		}
	} catch (err) {
		console.error("Oops, something went wrong with the category init");
	}
});
