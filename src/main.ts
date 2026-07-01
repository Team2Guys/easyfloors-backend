import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

import cookieParser from 'cookie-parser';
import { AuthGuard } from './gaurds/auth.guard';
import helmet from 'helmet';
import { GqlThrottlerGuard } from './general/GraphQLThrottlerGuard';
import {
  ThrottlerModuleOptions,
  ThrottlerStorageService,
} from '@nestjs/throttler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 52428800, maxFiles: 5 })); // 50 MB
  const isProd = process.env.NODE_ENV === 'production';

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: isProd
        ? undefined
        : {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'https:'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
            imgSrc: [
              "'self'",
              'data:',
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            frameSrc: ["'self'", 'sandbox.embed.apollographql.com'],
            manifestSrc: [
              "'self'",
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
          },
        },
      referrerPolicy: { policy: 'no-referrer' },
      frameguard: { action: 'deny' },
      hsts: isProd
        ? {
          maxAge: 63072000, // 2 years (required for preload)
          includeSubDomains: true,
          preload: true,
        }
        : false,
      xssFilter: true,
      noSniff: true,
      dnsPrefetchControl: { allow: false },
      hidePoweredBy: true,
    }),
  );

  app.enableCors({
    origin: [process.env.CLIENT_URL_2, process.env.CLIENT_URL_1],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  });
  app.setGlobalPrefix('backend');
  app.use(cookieParser());
  app.useGlobalGuards(new AuthGuard(new Reflector()));
  await app.listen(process.env.PORT ?? 3200, () => {
    console.log('connected to ' + `http://localhost:${process.env.PORT}/`);
  });
}

bootstrap();
