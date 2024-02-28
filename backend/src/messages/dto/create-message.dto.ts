import { Message } from '../entities/message.entity';

export class CreateMessageDto extends Message {
  name: string;
  text: string;
}
