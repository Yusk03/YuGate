/*
  Warnings:

  - You are about to alter the column `login` on the `Admins` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(64)`.

*/
-- CreateEnum
CREATE TYPE "Billings" AS ENUM ('ABILLS', 'UBILLING', 'NODENY');

-- CreateEnum
CREATE TYPE "ContactsTypes" AS ENUM ('PHONE', 'EMAIL');

-- AlterTable
ALTER TABLE "Admins" ALTER COLUMN "login" SET DATA TYPE VARCHAR(64);

-- CreateTable
CREATE TABLE "AdminActions" (
    "id" UUID NOT NULL,
    "action" INTEGER NOT NULL DEFAULT 0,
    "describe" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" UUID NOT NULL,

    CONSTRAINT "AdminActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminsContacts" (
    "id" UUID NOT NULL,
    "adminId" UUID NOT NULL,
    "typeId" "ContactsTypes" NOT NULL DEFAULT 'PHONE',
    "value" TEXT NOT NULL,

    CONSTRAINT "AdminsContacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingSystems" (
    "id" UUID NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "billingType" "Billings" NOT NULL DEFAULT 'ABILLS',
    "url" TEXT NOT NULL,

    CONSTRAINT "BillingSystems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchants" (
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "paymentSystemId" UUID NOT NULL,

    CONSTRAINT "Merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantsParams" (
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "value" VARCHAR(512) NOT NULL,
    "merchantId" UUID NOT NULL,

    CONSTRAINT "MerchantsParams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" UUID NOT NULL,
    "gatewayTransactionId" TEXT NOT NULL DEFAULT '',
    "systemTransactionId" TEXT NOT NULL,
    "billingTransactionId" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sum" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "commission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "extraInfo" TEXT NOT NULL DEFAULT '',
    "status" INTEGER NOT NULL DEFAULT 0,
    "paymentSystemId" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "merchantId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentSystems" (
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "module" VARCHAR(64) NOT NULL,
    "ip" TEXT NOT NULL,
    "billingSystemId" UUID NOT NULL,

    CONSTRAINT "PaymentSystems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentSystemsRequests" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestIp" INET NOT NULL,
    "requestBody" TEXT NOT NULL DEFAULT '',
    "responseBody" TEXT NOT NULL DEFAULT '',
    "httpMethod" VARCHAR(10) NOT NULL DEFAULT '',
    "httpStatus" INTEGER NOT NULL DEFAULT 0,
    "userId" UUID,
    "paymentSystemId" UUID,

    CONSTRAINT "PaymentSystemsRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "deposit" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersContacts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "typeId" "ContactsTypes" NOT NULL DEFAULT 'PHONE',
    "value" TEXT NOT NULL,

    CONSTRAINT "UsersContacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersSubscriptions" (
    "id" UUID NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "info" TEXT NOT NULL DEFAULT '',
    "sum" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "paymentSystemId" UUID NOT NULL,

    CONSTRAINT "UsersSubscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillingSystems_name_key" ON "BillingSystems"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_name_key" ON "Merchants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSystems_name_key" ON "PaymentSystems"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSystems_module_key" ON "PaymentSystems"("module");

-- AddForeignKey
ALTER TABLE "AdminActions" ADD CONSTRAINT "AdminActions_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminsContacts" ADD CONSTRAINT "AdminsContacts_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchants" ADD CONSTRAINT "Merchants_paymentSystemId_fkey" FOREIGN KEY ("paymentSystemId") REFERENCES "PaymentSystems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantsParams" ADD CONSTRAINT "MerchantsParams_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_paymentSystemId_fkey" FOREIGN KEY ("paymentSystemId") REFERENCES "PaymentSystems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "UsersSubscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSystems" ADD CONSTRAINT "PaymentSystems_billingSystemId_fkey" FOREIGN KEY ("billingSystemId") REFERENCES "BillingSystems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSystemsRequests" ADD CONSTRAINT "PaymentSystemsRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSystemsRequests" ADD CONSTRAINT "PaymentSystemsRequests_paymentSystemId_fkey" FOREIGN KEY ("paymentSystemId") REFERENCES "PaymentSystems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersContacts" ADD CONSTRAINT "UsersContacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSubscriptions" ADD CONSTRAINT "UsersSubscriptions_paymentSystemId_fkey" FOREIGN KEY ("paymentSystemId") REFERENCES "PaymentSystems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
