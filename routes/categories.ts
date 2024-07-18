import express from "express";
import { validate } from "../schemas/Categories";

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

router.get("/:id", (req, res) => {
  const category = categories.find((category) => category.id === req.params.id);
  if (!category)
    res.status(404).send("The category with the given id was not found");

  return res.send(category);
});

router.post("/", (req, res) => {
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const existingCategory = categories.find(
    (category) => category.name === req.body.name
  );
  if (existingCategory) res.status(400).send("The category already exists");

  const category: Category = {
    id: Date.now().toString(),
    name: req.body.name,
  };

  categories.push(category);

  return res.status(401).send(category);
});

// router.delete('/:id', (req,res)=>{
//     const category = categories.find((category) => category.id === req.params.id);
//     if (!category)
//       res.status(404).send("The category with the given id was not found");
// })

export default router;
