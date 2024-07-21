"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const schema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, { message: "Name is required" }),
});
function validate(body) {
    return schema.safeParse(body);
}
exports.validate = validate;
