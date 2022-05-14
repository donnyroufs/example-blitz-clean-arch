/*
  Warnings:

  - The primary key for the `Guestbook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Guestbook` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Guestbook` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "GuestbookEntries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "guestbookId" TEXT NOT NULL,
    CONSTRAINT "GuestbookEntries_guestbookId_fkey" FOREIGN KEY ("guestbookId") REFERENCES "Guestbook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guestbook" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Guestbook" ("id") SELECT "id" FROM "Guestbook";
DROP TABLE "Guestbook";
ALTER TABLE "new_Guestbook" RENAME TO "Guestbook";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "GuestbookEntries_email_key" ON "GuestbookEntries"("email");
