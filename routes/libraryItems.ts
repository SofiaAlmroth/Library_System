import express from "express";
import { Category, getCategories } from "./categories";
import { validate } from "../schemas/LibraryItems";

const router = express.Router();

export interface LibraryItems {
  id: string;
  type: "dvd" | "book" | "audiobook" | "encyclopedia";
  title: string;
  category: Category;
  isBorrowable: boolean;
  borrower?: string;
  borrowDate?: string;
  author?: string;
  nbrPages?: number;
  runTimeMinutes?: number;
}

const libraryItems: LibraryItems[] = [
  {
    id: "1",
    type: "book",
    title: "Example Book",
    author: "Author Name",
    nbrPages: 300,
    isBorrowable: true,
    category: { id: "5b21ca3eeb7f6fbccd471820", name: "Academic" },
    borrower: "Sofia Almroth",
    borrowDate: new Date().toISOString(),
  },

  {
    id: "2",
    type: "dvd",
    title: "Example DVD",
    runTimeMinutes: 120,
    isBorrowable: true,
    category: { id: "5b21ca3eeb7f6fbccd471852", name: "Crime Novel" },
    borrower: "Björn Hultqvist",
    borrowDate: new Date().toISOString(),
  },

  {
    id: "3",
    type: "audiobook",
    title: "Example Audiobook",
    runTimeMinutes: 500,
    isBorrowable: true,
    category: { id: "5b21ca3eeb7f6fbccd471814", name: "Romance" },
  },

  {
    id: "4",
    type: "encyclopedia",
    title: "Example Encyclopedia",
    author: "Author Name",
    nbrPages: 1000,
    isBorrowable: false,
    category: { id: "5b21ca3eeb7f6fbccd471818", name: "Science-Fiction" },
  },
];

router.get("/", (req, res) => {
  return res.send(libraryItems);
});

router.get("/:id", (req, res) => {
  const libraryItem = libraryItems.find((item) => item.id === req.params.id);
  if (!libraryItem)
    return res
      .status(404)
      .send("The library item with the given id was not found");

  return res.send(libraryItem);
});

router.post("/", (req, res) => {
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const category = getCategories().find(
    (category) => category.id === req.body.categoryId
  );

  if (!category)
    return res.status(404).send(`The category with the given id was not found`);

  const libraryItem: LibraryItems = {
    id: Date.now().toString(),
    title: req.body.title,
    nbrPages: req.body.nbrPages,
    runTimeMinutes: req.body.runTimeMinutes,
    isBorrowable: req.body.isBorrowable,
    type: req.body.type,
    author: req.body.author,
    borrower: req.body.borrower,
    category,
    borrowDate: req.body.borrower ? new Date().toISOString() : undefined,
  };

  libraryItems.push(libraryItem);

  return res.send(libraryItem);
});

router.put("/:id", (req, res) => {
  const libraryItem = libraryItems.find((item) => item.id === req.params.id);
  if (!libraryItem)
    return res
      .status(404)
      .send("The library item with the given id was not found");

  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const category = getCategories().find(
    (category) => category.id === req.body.categoryId
  );

  if (!category)
    return res.status(404).send(`The category with the given id was not found`);

  libraryItem.title = req.body.title;
  libraryItem.nbrPages = req.body.nbrPages;
  libraryItem.runTimeMinutes = req.body.runTimeMinutes;
  libraryItem.isBorrowable = req.body.isBorrowable;
  libraryItem.type = req.body.type;
  libraryItem.author = req.body.author;
  libraryItem.borrower = req.body.borrower;
  libraryItem.category;
  libraryItem.borrowDate = req.body.borrower
    ? new Date().toISOString()
    : undefined;

  return res.send(libraryItem);
});

router.delete("/:id", (req, res) => {
  const libraryItem = libraryItems.find(
    (libraryItem) => libraryItem.id === req.params.id
  );

  if (!libraryItem)
    return res
      .status(404)
      .send("The Library item with the given id was not found");

  libraryItems.splice(libraryItems.indexOf(libraryItem), 1);

  return res.send(libraryItem);
});

export default router;
