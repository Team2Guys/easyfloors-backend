import {
  InputType,
  Field,
  GraphQLISODateTime,
  registerEnumType,
} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

export enum AppointsType {
  INSTALLATIONS = 'installations',
  APPOINTMENTS = 'appointments',
}

registerEnumType(AppointsType, {
  name: 'AppointsType',
  description: 'The type of appointment',
});

@InputType()
export class CreateAppointmentInput {
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
