import express from "express";
import { Category, getCategories } from "./categories";
import { validate } from "../schemas/LibraryItems";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export type BookType = "dvd" | "book" | "audiobook" | "encyclopedia";
export interface LibraryItems {
  id: string;
  type: BookType;
  title: string;
  category: Category;
  isBorrowable: boolean;
  borrower?: string;
  borrowDate?: Date;
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
    borrowDate: new Date(),
  },

  {
    id: "2",
    type: "dvd",
    title: "Example DVD",
    runTimeMinutes: 120,
    isBorrowable: true,
    category: { id: "5b21ca3eeb7f6fbccd471852", name: "Crime Novel" },
    borrower: "Björn Hultqvist",
    borrowDate: new Date(),
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

router.get("/", async (req, res) => {
  const libraryItems = await prisma.libraryItem.findMany();
  return res.send(libraryItems);
});

router.get("/:id", async (req, res) => {
  const libraryItem = await prisma.libraryItem.findFirst({
    where: { id: req.params.id },
  });
  if (!libraryItem)
    return res
      .status(404)
      .send("The library item with the given id was not found");

  return res.send(libraryItem);
});

router.post("/", async (req, res) => {
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });

  if (!category)
    return res.status(404).send(`The category with the given id was not found`);

  let isBorrowable = true;
  if (req.body.type === "ENCYCLOPEDIA") {
    isBorrowable = false;
  }

  const libraryItem = await prisma.libraryItem.create({
    data: {
      title: req.body.title,
      type: req.body.type,
      categoryId: req.body.categoryId,
      author: req.body.author || null,
      nbrPages: req.body.nbrPages || null,
      runTimeMinutes: req.body.runTimeMinutes || null,
      isBorrowable,
      borrower: req.body.borrower || null,
      borrowDate: req.body.borrowDate || null,
    },
    include: { category: true },
  });

  return res.status(201).send(libraryItem);
});

router.put("/:id", async (req, res) => {
  const libraryItem = await prisma.libraryItem.findFirst({
    where: { id: req.params.id },
  });

  if (!libraryItem)
    return res
      .status(404)
      .send("The library item with the given id was not found");

  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });

  if (!category)
    return res.status(404).send(`The category with the given id was not found`);

  const isBorrowable = req.body.type !== "ENCYCLOPEDIA";

  await prisma.libraryItem.update({
    where: { id: req.params.id },
    data: {
      title: req.body.title,
      type: req.body.type,
      categoryId: req.body.categoryId,
      author: req.body.author || null,
      nbrPages: req.body.nbrPages || null,
      runTimeMinutes: req.body.runTimeMinutes || null,
      isBorrowable,
      borrower: req.body.borrower || null,
      borrowDate: req.body.borrowDate || null,
    },
  });

  return res.send(libraryItem);
});

router.delete("/:id", async (req, res) => {
  const libraryItem = await prisma.libraryItem.findFirst({
    where: { id: req.params.id },
  });

  if (!libraryItem)
    return res
      .status(404)
      .send("The library item with the given id was not found");

  const deltetedLibraryItem = await prisma.libraryItem.delete({
    where: { id: req.params.id },
  });

  return res.send(deltetedLibraryItem);
});

export default router;
