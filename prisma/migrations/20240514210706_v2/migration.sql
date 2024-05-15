-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_scheduled_session_Id_fkey";

-- AlterTable
ALTER TABLE "Availability" ALTER COLUMN "scheduled_session_Id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "when_created" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User_image" ALTER COLUMN "when_added" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_scheduled_session_Id_fkey" FOREIGN KEY ("scheduled_session_Id") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
