-- Add image fields to Project
ALTER TABLE "Project" ADD COLUMN "thumbnail" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Project" ADD COLUMN "images" TEXT NOT NULL DEFAULT '[]';
