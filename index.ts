import express from "express";
import categories from "./routes/categories";

const app = express();

app.use(express.json());
app.use("/api/categories", categories);

const PORT = 5588;

app.listen(PORT, () => console.log("listening on port " + PORT));
