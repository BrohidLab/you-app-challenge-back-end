import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/youapp'),      
    UsersModule,
    ProfileModule,
    AuthModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService, RabbitmqService],
})
export class AppModule {}
