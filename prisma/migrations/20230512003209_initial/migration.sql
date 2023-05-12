-- CreateTable
CREATE TABLE "User_hive" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "hiveId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "User_hive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255),
    "accountName" VARCHAR(255),
    "accountLocationState" VARCHAR(255),
    "accountType" VARCHAR(255) NOT NULL DEFAULT 'free',
    "google_signin" BOOLEAN DEFAULT false,
    "google_given_name" VARCHAR(255),
    "google_family_name" VARCHAR(255),
    "google_locale" VARCHAR(255),
    "google_avatar" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "signupConfirmationComplete" BOOLEAN DEFAULT false,
    "signupConfirmationToken" VARCHAR(255) NOT NULL,
    "resetPasswordToken" VARCHAR(255) NOT NULL,
    "enabled" BOOLEAN DEFAULT true,
    "deleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
