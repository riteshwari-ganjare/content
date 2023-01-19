import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { queues } from './submodule/rmq/src/constants/rmqQueues';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://xfigyoqo:l_zjbRzvTC7sehFtS9UUN2idr8evVwwB@puffin.rmq2.cloudamqp.com/xfigyoqo'],
      queue: queues.CONTENT_SERVICE_QUEUE,
      queueOptions: {
        durable: true
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(5000);
}
bootstrap();
