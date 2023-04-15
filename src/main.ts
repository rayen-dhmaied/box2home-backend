import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaFilter } from './modules/prisma/prisma.filter';
import { RootModule } from './root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule)
  app.getHttpAdapter().getInstance().disable('x-powered-by')
  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaFilter(httpAdapter))
  await app.listen(4000);
}
bootstrap();
