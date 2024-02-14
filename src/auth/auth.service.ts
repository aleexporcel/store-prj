/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async validateClient(clientName: string, pass: string): Promise<any> {
    const client = await this.clientService.findOne(clientName);
    if (!client && client.password !== pass) {
      return null;
    }
    const { password, ...result } = client;
    return result;
  }

  async login(client: any) {
    const payload = { clientName: client.clientName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
