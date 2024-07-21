"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LibraryItems_1 = require("../schemas/LibraryItems");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", async (req, res) => {
    const libraryItems = await prisma.libraryItem.findMany({
        include: { category: true },
    });
    return res.send(libraryItems);
});
router.get("/:id", async (req, res) => {
    const libraryItem = await prisma.libraryItem.findFirst({
        where: { id: req.params.id },
        include: { category: true },
    });
    if (!libraryItem)
        return res
            .status(404)
            .send("The library item with the given id was not found");
    return res.send(libraryItem);
});
router.post("/", async (req, res) => {
    const validation = (0, LibraryItems_1.validate)(req.body);
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
    const borrowDate = req.body.borrower ? new Date() : null;
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
            borrowDate,
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
    const validation = (0, LibraryItems_1.validate)(req.body);
    if (!validation.success)
        return res.status(400).send(validation.error.issues[0].message);
    const category = await prisma.category.findFirst({
        where: { id: req.body.categoryId },
    });
    if (!category)
        return res.status(404).send(`The category with the given id was not found`);
    const isBorrowable = req.body.type !== "ENCYCLOPEDIA";
    const borrowDate = req.body.borrower ? new Date() : null;
    const updatedLibraryItem = await prisma.libraryItem.update({
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
            borrowDate,
        },
    });
    return res.send(updatedLibraryItem);
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
exports.default = router;
