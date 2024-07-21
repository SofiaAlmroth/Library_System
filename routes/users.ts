import express from "express";
import { PrismaClient } from "@prisma/client";
import { validate } from "../schemas/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const existingUser = await prisma.user.findFirst({
    where: { email: req.body.email },
  });

  if (existingUser) return res.status(400).send("User already exists");

  const password = bcrypt.hashSync(req.body.password, 12);

  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password,
    },
  });

  const { password: p, ...userWithoutPassword } = user;

  const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET!);

  return res
    .header("access-control-expose-headers", "x-auth-token")
    .header("x-auth-token", token)
    .send(userWithoutPassword);
});

export default router;
