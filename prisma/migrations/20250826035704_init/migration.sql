-- CreateTable
CREATE TABLE "projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "project_name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    "templete" JSONB NOT NULL,
    "publish" BOOLEAN NOT NULL DEFAULT false
);
