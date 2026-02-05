import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { AppointsType } from '../../appointments/dto/create-appointment.input';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Appointment {
  @Field()
  firstname: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  whatsappNumber?: string;

  @Field({ nullable: true })
  area?: string;

  @Field({ nullable: true })
  selectRooms?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  preferredDate?: Date;

  @Field({ nullable: true })
  preferredTime?: string;

  @Field({ nullable: true })
  findUs?: string;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  contactMethod?: any;

  @Field(() => AppointsType, { nullable: true })
  AppointsType?: AppointsType;
}
