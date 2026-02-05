import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    const maxRetries = 5;
    for (let i = 1; i <= maxRetries; i++) {
      try {
        await this.$connect();
        console.log('✅ Connected to the database successfully');
        return;
      } catch (error) {
        console.log(`Retry ${i}/${maxRetries} failed: ${error.message}`);
        if (i === maxRetries) {
          console.log(
            '❌ Could not connect to database after multiple attempts.',
          );
          break;
        }
        await new Promise((res) => setTimeout(res, 3000)); // wait 3s before retry
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
