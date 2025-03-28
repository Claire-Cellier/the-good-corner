import { Router } from "express";
import * as tagController from "../controllers/tag.controller";

const router = Router();

router.get("/", tagController.browse);
router.post("/", tagController.add);

export default router;
