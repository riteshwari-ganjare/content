import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './module/content/content.module';
import { queues } from './submodule/rmq/src/constants/rmqQueues';
import { MsgBrokerOpsService } from './submodule/rmq/src/module/msg-broker-ops/msg-broker-ops.service';
import { Content } from './submodule/user-entities/src/entities/content.entity';
// import { Content } from './submodule/user-entities/src/entities/content.entity';
import { User } from './submodule/user-entities/src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'riteshwari',
      database: 'social-app-db',
      entities: [User,Content],
      synchronize: true,
      logging:true
     
    }),
    ClientsModule.register([
      {
        name:'CONTENT_SERVICE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ["amqps://xfigyoqo:l_zjbRzvTC7sehFtS9UUN2idr8evVwwB@puffin.rmq2.cloudamqp.com/xfigyoqo"],
          queue: queues.CONTENT_SERVICE_QUEUE,
          queueOptions: {
            durable: true,
          }
        
        },
      },
    ]),
    ContentModule
  ],
  
  controllers: [AppController],
  providers: [AppService, MsgBrokerOpsService],
})
export class AppModule {}
