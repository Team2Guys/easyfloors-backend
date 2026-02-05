-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Acessories" ADD COLUMN     "status" "BlogStatus" DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Admins" ADD COLUMN     "status" "BlogStatus" DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "status" "BlogStatus" DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "status" "BlogStatus" DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Redirecturls" ADD COLUMN     "status" "BlogStatus" DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "subCategories" ADD COLUMN     "status" "BlogStatus" DEFAULT 'PUBLISHED';
