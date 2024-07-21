"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Auth_1 = require("../schemas/Auth");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const validation = (0, Auth_1.validate)(req.body);
    if (!validation.success)
        return res.status(400).send(validation.error.issues[0].message);
    const user = await prisma.user.findFirst({
        where: { email: req.body.email },
    });
    if (!user)
        return res.status(400).send("Invalid email or password");
    const isValid = bcrypt_1.default.compareSync(req.body.password, user.password);
    if (!isValid)
        return res.status(400).send("Invalid email or password");
    const { password, ...userWithoutPassword } = user;
    console.log(process.env.JWT_SECRET);
    const token = jsonwebtoken_1.default.sign(userWithoutPassword, process.env.JWT_SECRET);
    return res.send(token);
});
exports.default = router;
