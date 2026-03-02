-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL DEFAULT '',
    "client" TEXT NOT NULL,
    "clientEn" TEXT NOT NULL DEFAULT '',
    "industry" TEXT NOT NULL,
    "industryEn" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL,
    "summaryEn" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "problem" TEXT NOT NULL,
    "problemEn" TEXT NOT NULL DEFAULT '',
    "solution" TEXT NOT NULL,
    "solutionEn" TEXT NOT NULL DEFAULT '',
    "results" TEXT NOT NULL DEFAULT '[]',
    "resultsEn" TEXT NOT NULL DEFAULT '[]',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "tagsEn" TEXT NOT NULL DEFAULT '[]',
    "testimonial" TEXT NOT NULL DEFAULT '{}',
    "testimonialEn" TEXT NOT NULL DEFAULT '{}',
    "techStack" TEXT NOT NULL DEFAULT '[]',
    "duration" TEXT NOT NULL,
    "durationEn" TEXT NOT NULL DEFAULT '',
    "year" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
