-- CreateEnum
CREATE TYPE "ExportFormat" AS ENUM ('PDF', 'PNG');

-- CreateEnum
CREATE TYPE "ExportStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "backCoverJson" JSONB,
ADD COLUMN     "coverJson" JSONB;

-- CreateTable
CREATE TABLE "export_jobs" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "format" "ExportFormat" NOT NULL DEFAULT 'PDF',
    "status" "ExportStatus" NOT NULL DEFAULT 'PENDING',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "totalPages" INTEGER NOT NULL DEFAULT 12,
    "currentPage" INTEGER NOT NULL DEFAULT 0,
    "filename" TEXT,
    "filePath" TEXT,
    "fileSize" INTEGER,
    "dpi" INTEGER NOT NULL DEFAULT 300,
    "bindingGuide" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "export_jobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "export_jobs" ADD CONSTRAINT "export_jobs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "export_jobs" ADD CONSTRAINT "export_jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
