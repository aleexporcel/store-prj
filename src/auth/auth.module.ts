import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jtw.strategy';
import { AuthController } from './auth.controller';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    ClientModule,
    PassportModule,
    JwtModule.register({
      secret: 'abcd123',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
