-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_contact_id_fkey";

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
