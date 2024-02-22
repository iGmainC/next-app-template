-- AddForeignKey
ALTER TABLE "MessageSession" ADD CONSTRAINT "MessageSession_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "BaseModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
