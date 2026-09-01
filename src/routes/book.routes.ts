import { Router } from "express";
import {
  getAllBooks,
  getBook,
  addBook,
  removeBook,
  patchBook,
} from "../controllers/book.controller.js";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBook);
router.post("/", addBook);
router.delete("/:id", removeBook);
router.patch("/:id", patchBook);

export default router;