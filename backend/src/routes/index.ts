import { Router } from "express";

import adRoutes from "./ad.routes";
import categoryRoutes from "./category.routes";
import tagRoutes from "./tag.routes";

const router = Router();

router.get("/", (_req, res) => {
	res.send("wesolu");
});

router.use("/ads", adRoutes);
router.use("/categories", categoryRoutes);
router.use("/tags", tagRoutes);

export default router;
