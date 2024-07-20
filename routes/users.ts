import express from "express";
import { PrismaClient } from "@prisma/client";
import { validate } from "../schemas/User";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

const router = express();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  //validera
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  //hitta user
  const existingUser = await prisma.user.findFirst({
    where: { email: req.body.email },
  });

  if (existingUser) return res.status(400).send("User already exists");

  //is valid med bcrypt
  const password = bcrypt.hashSync(req.body.password, 12);

  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password,
    },

    //const {password: p, ...userWithoutPassword} = user
  });
  return res.send(user);
});

export default router;
