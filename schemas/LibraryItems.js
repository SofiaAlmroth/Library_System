"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const schema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string().min(1, { message: "Title is required" }),
    categoryId: zod_1.z.string().min(1, { message: "Category is required" }),
    type: zod_1.z.string().min(1, { message: "Title is required" }),
    author: zod_1.z.string().optional(),
    nbrPages: zod_1.z.coerce
        .number()
        .gt(0, { message: "Pages/Runtime is required" })
        .optional(),
    runTimeMinutes: zod_1.z.coerce
        .number()
        .gt(0, { message: "Runtime is required" })
        .optional(),
    isBorrowable: zod_1.z.boolean().optional(),
    borrower: zod_1.z.string().optional(),
});
function validate(body) {
    return schema.safeParse(body);
}
exports.validate = validate;
