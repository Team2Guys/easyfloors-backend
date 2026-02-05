import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException, sendAppointmentEmail } from '../utils/helper';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}
  async create(createAppointmentInput: CreateAppointmentInput) {
    try {
      console.log(createAppointmentInput.email, 'email');
      await sendAppointmentEmail(createAppointmentInput);
      const appointments = await this.prisma.appointment.create({
        data: createAppointmentInput,
      });
      return appointments;
    } catch (error) {
      console.log(error, 'error');
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findAll() {
    try {
      return this.prisma.appointment.findMany();
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.appointment.findUnique({ where: { id } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.appointment.delete({ where: { id } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }
}
