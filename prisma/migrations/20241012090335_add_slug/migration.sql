/*
  Warnings:

  - Added the required column `slug` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "slug" VARCHAR(50) NOT NULL;
