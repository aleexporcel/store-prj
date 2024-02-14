import { Injectable } from '@nestjs/common';

export type Client = {
  clientId: number;
  clientName: string;
  password: string;
};

@Injectable()
export class ClientService {
  private readonly clients: Client[] = [
    {
      clientId: 1,
      clientName: 'jose',
      password: '1234',
    },
    {
      clientId: 2,
      clientName: 'maria',
      password: 'abcd',
    },
  ];

  async findOne(clientName: string): Promise<Client | undefined> {
    return this.clients.find((c) => c.clientName === clientName);
  }
}
