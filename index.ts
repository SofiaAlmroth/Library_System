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

// async function createLibraryItem() {
//   const libraryItem = await prisma.libraryItem.create({
//     data: {
//       type: "BOOK",
//       title: "One Day",
//       categoryId: "clysi9weq00038g6lhsqc5rvg",
//       isBorrowable: true,
//       author: "David Nicholls",
//       nbrPages: 360,
//     },
//   });
//   console.log(libraryItem);
// }

// createLibraryItem();
