import express from "express";

const router = express.Router();

export interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: "5b21ca3eeb7f6fbccd471818", name: "Science-Fiction" },
  { id: "5b21ca3eeb7f6fbccd471814", name: "Romance" },
  { id: "5b21ca3eeb7f6fbccd471820", name: "Academic" },
  { id: "5b21ca3eeb7f6fbccd471852", name: "Crime Novel" },
];

router.get("/", (req, res) => {
  return res.send(categories);
});

export default router;
