import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private channel: amqp.Channel;
  private readonly exchange = 'chat_exchange';

  async onModuleInit() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    this.channel = await connection.createChannel();
    await this.channel.assertExchange(this.exchange, 'fanout', { durable: false });
  }

  async publish(message: any) {
    this.channel.publish(this.exchange, '', Buffer.from(JSON.stringify(message)));
  }

  async subscribe(onMessage: (msg: any) => void) {
    const q = await this.channel.assertQueue('', { exclusive: true });
    await this.channel.bindQueue(q.queue, this.exchange, '');
    this.channel.consume(
      q.queue,
      (msg) => {
        if (msg) {
          onMessage(JSON.parse(msg.content.toString()));
        }
      },
      { noAck: true },
    );
  }
}
