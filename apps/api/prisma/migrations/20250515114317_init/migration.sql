-- CreateTable
CREATE TABLE "Admins" (
    "id" UUID NOT NULL,
    "login" VARCHAR(256) NOT NULL,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_login_key" ON "Admins"("login");
