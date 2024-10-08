-- DropForeignKey
ALTER TABLE "Summary" DROP CONSTRAINT "Summary_collectionId_fkey";

-- AlterTable
ALTER TABLE "Summary" ALTER COLUMN "collectionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
