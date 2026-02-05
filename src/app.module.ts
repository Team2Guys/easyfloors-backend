import { ExecutionContext, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub_categories/sub_categories.module';
import { FileUploadingModule } from './file_uploading/file_uploading.module';
import { AdminsModule } from './admins/admins.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurds/auth.guard';
import { AccessoriesModule } from './accessories/accessories.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { UserModule } from './user/user.module';
import { SalesProductsModule } from './sales-products/sales-products.module';
import { PrismaService } from './prisma/prisma.service';
import { GeneralModule } from './general/general.module';
import { GcpModule } from 'gcp/gcp.module';
import { ScheduleModule } from '@nestjs/schedule';
import {
  ThrottlerGuard,
  ThrottlerModule,
  ThrottlerModuleOptions,
  ThrottlerStorageService,
} from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlThrottlerGuard } from 'general/GraphQLThrottlerGuard';

@Module({
  imports: [
    // ThrottlerModule.forRoot({
    //   throttlers: [
    //     {
    //       limit: 10, // Max 10 requests
    //       ttl: 60000,   // In 60 seconds
    //     },
    //   ],
    //   errorMessage: 'Too many requests. Please try again later.',

    // }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: 'backend/graphql',
      autoSchemaFile: true,
      csrfPrevention: false,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),

    ScheduleModule.forRoot(),

    ProductsModule,
    CategoriesModule,
    SubCategoriesModule,
    FileUploadingModule,
    AdminsModule,
    AccessoriesModule,
    AppointmentsModule,
    UserModule,
    SalesProductsModule,
    GeneralModule,
    GcpModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: GqlThrottlerGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,

    // },
    AuthGuard,

    PrismaService,
    AppService,
  ],
})
export class AppModule {}
