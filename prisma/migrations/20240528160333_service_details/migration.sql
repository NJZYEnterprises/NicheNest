-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "description" TEXT,
ADD COLUMN     "location_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
