-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_mentorId_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "mentorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
