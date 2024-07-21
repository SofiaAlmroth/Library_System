"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const User_1 = require("../schemas/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const validation = (0, User_1.validate)(req.body);
    if (!validation.success)
        return res.status(400).send(validation.error.issues[0].message);
    const existingUser = await prisma.user.findFirst({
        where: { email: req.body.email },
    });
    if (existingUser)
        return res.status(400).send("User already exists");
    const password = bcrypt_1.default.hashSync(req.body.password, 12);
    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password,
        },
    });
    const { password: p, ...userWithoutPassword } = user;
    const token = jsonwebtoken_1.default.sign(userWithoutPassword, process.env.JWT_SECRET);
    return res
        .header("access-control-expose-headers", "x-auth-token")
        .header("x-auth-token", token)
        .send(userWithoutPassword);
});
exports.default = router;
