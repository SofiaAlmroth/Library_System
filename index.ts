import express from "express";
import categories from "./routes/categories";
import libraryItems from "./routes/libraryItems";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/libraryItems", libraryItems);

const PORT = 5588;

app.listen(PORT, () => console.log("listening on port " + PORT));

// async function createCategory(name: string) {
//   const category = await prisma.category.create({ data: { name } });
//   console.log(category);
// }

// createCategory("Science-Fiction");
// createCategory("Romance");
// createCategory("Academic");
// createCategory("Crime Novel");
