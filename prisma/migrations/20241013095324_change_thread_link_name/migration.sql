/*
  Warnings:

  - You are about to drop the column `thread_starter_link` on the `Summary` table. All the data in the column will be lost.
  - Added the required column `thread_starter_link_id` to the `Summary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Summary" DROP COLUMN "thread_starter_link",
ADD COLUMN     "thread_starter_link_id" TEXT NOT NULL;
