-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('DVD', 'BOOK', 'AUDIOBOOK', 'ENCYCLOPEDIA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "BookType" NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL DEFAULT false,
    "borrower" TEXT,
    "borrowDate" TIMESTAMP(3),
    "categoryId" TEXT NOT NULL,
    "author" TEXT,
    "nbrPages" INTEGER,
    "runTimeMinutes" INTEGER,

    CONSTRAINT "LibraryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "LibraryItem" ADD CONSTRAINT "LibraryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
