import { Router } from "express";
import * as categoryController from "../controllers/category.controller";

const router = Router();

router.get("/", categoryController.browse);
router.get("/:id", categoryController.read);
router.post("/", categoryController.add);

export default router;
