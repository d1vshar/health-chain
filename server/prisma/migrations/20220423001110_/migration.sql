-- CreateTable
CREATE TABLE "User" (
    "nonce" INTEGER NOT NULL,
    "publicAddress" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nonce_key" ON "User"("nonce");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicAddress_key" ON "User"("publicAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
