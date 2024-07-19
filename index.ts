import express from "express";
import categories from "./routes/categories";
import libraryItems from "./routes/libraryItems";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/libraryItems", libraryItems);

const PORT = 5588;

app.listen(PORT, () => console.log("listening on port " + PORT));
