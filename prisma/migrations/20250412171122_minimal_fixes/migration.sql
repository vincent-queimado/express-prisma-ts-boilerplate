/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountLocationState` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `accountName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `accountType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `google_avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `google_family_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `google_given_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `google_locale` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `google_signin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isRegistered` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tokenOfRegisterConfirmation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tokenOfResetPassword` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamptz(6)")` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamptz(6)")` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamptz(6)")` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDisabled" BOOLEAN DEFAULT false,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_User" ("createdAt", "deletedAt", "email", "id", "isDeleted", "isDisabled", "name", "password", "updatedAt") SELECT "createdAt", "deletedAt", "email", "id", "isDeleted", "isDisabled", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
