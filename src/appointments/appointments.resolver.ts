import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { Public } from '../decorators/public.decorator';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Public()
  @Mutation(() => Appointment, { name: 'Created_appointments' })
  createAppointment(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ) {
    return this.appointmentsService.create(createAppointmentInput);
  }

  @Query(() => [Appointment], { name: 'appointments' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentsService.findOne(id);
  }

  @Mutation(() => Appointment)
  removeAppointment(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentsService.remove(id);
  }
}
