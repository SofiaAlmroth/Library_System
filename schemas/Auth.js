"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const schema = zod_1.z.object({
    email: zod_1.z.string().min(1, { message: "Email is required" }),
    password: zod_1.z.string().min(1, { message: "Password is required" }),
});
function validate(body) {
    return schema.safeParse(body);
}
exports.validate = validate;
