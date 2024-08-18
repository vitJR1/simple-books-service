-- CreateTable
CREATE TABLE "ApproveEmail" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ApproveEmail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApproveEmail" ADD CONSTRAINT "ApproveEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
