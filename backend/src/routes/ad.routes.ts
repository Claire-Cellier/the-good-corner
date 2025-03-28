import { Router } from "express";
import * as adController from "../controllers/ad.controller";

const router = Router();

router.get("/", adController.browse);
router.get("/:id", adController.read);
router.post("/", adController.add);
router.put("/:id", adController.edit);
router.delete("/:id", adController.remove);

export default router;
