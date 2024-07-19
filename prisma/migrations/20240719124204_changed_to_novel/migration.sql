/*
  Warnings:

  - The values [AUDIONOVEL] on the enum `BookType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookType_new" AS ENUM ('DVD', 'NOVEL', 'AUDIOBOOK', 'ENCYCLOPEDIA');
ALTER TABLE "LibraryItem" ALTER COLUMN "type" TYPE "BookType_new" USING ("type"::text::"BookType_new");
ALTER TYPE "BookType" RENAME TO "BookType_old";
ALTER TYPE "BookType_new" RENAME TO "BookType";
DROP TYPE "BookType_old";
COMMIT;
