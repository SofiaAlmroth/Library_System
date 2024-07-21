"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Categories_1 = require("../schemas/Categories");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", async (req, res) => {
    const categories = await prisma.category.findMany();
    return res.send(categories);
});
router.get("/:id", async (req, res) => {
    const category = await prisma.category.findFirst({
        where: { id: req.params.id },
    });
    if (!category)
        res.status(404).send("The category with the given id was not found");
    return res.send(category);
});
router.post("/", async (req, res) => {
    const validation = (0, Categories_1.validate)(req.body);
    if (!validation.success)
        return res.status(400).send(validation.error.issues[0].message);
    const existingCategory = await prisma.category.findUnique({
        where: { name: req.body.name },
    });
    if (existingCategory)
        return res.status(400).send("The category already exists");
    const category = await prisma.category.create({
        data: {
            name: req.body.name,
        },
    });
    return res.status(201).send(category);
});
router.put("/:id", async (req, res) => {
    const category = await prisma.category.findFirst({
        where: { id: req.params.id },
    });
    if (!category)
        return res.status(404).send("The category with the given id was not found");
    const validation = (0, Categories_1.validate)(req.body);
    if (!validation.success)
        return res.status(400).send(validation.error.issues[0].message);
    const existingCategory = await prisma.category.findUnique({
        where: { name: req.body.name },
    });
    if (existingCategory)
        return res.status(400).send("The category already exists");
    const updatedCategory = await prisma.category.update({
        where: { id: req.params.id },
        data: {
            name: req.body.name,
        },
    });
    return res.send(updatedCategory);
});
router.delete("/:id", async (req, res) => {
    const category = await prisma.category.findFirst({
        where: { id: req.params.id },
    });
    if (!category)
        return res.status(404).send("The category with the given id was not found");
    const itemsUsingCategory = await prisma.libraryItem.findMany({
        where: { categoryId: req.params.id },
    });
    if (itemsUsingCategory.length > 0) {
        return res
            .status(400)
            .send("Cannot delete category because it is being used by some library items.");
    }
    const deletedCategory = await prisma.category.delete({
        where: { id: req.params.id },
    });
    return res.send(deletedCategory);
});
exports.default = router;
