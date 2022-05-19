-- CreateTable
CREATE TABLE "AuditEvent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "eventAddress" TEXT NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL,
    "eventType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "accountAddress" TEXT NOT NULL,
    "ip" TEXT NOT NULL,

    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);
