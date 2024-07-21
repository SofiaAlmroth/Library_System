import { PrismaClient } from "@prisma/client";
import { validate } from "../schemas/Auth";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const user = await prisma.user.findFirst({
    where: { email: req.body.email },
  });

  if (!user) return res.status(400).send("Invalid email or password");

  const isValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isValid) return res.status(400).send("Invalid email or password");

  const { password, ...userWithoutPassword } = user;
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET!);

  return res.send(token);
});

export default router;
