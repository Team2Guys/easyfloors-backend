import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AppointmentsResolver, AppointmentsService],
  imports: [PrismaModule],
})
export class AppointmentsModule {}
