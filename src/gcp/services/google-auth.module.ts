// google-auth.module.ts
import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  providers: [GoogleAuthService],
  exports: [GoogleAuthService], // ✅ Export so other modules can use it
  imports: [PrismaModule],
})
export class GoogleAuthModule {}
