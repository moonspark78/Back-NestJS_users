import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // pour accéder aux utilisateurs

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', // Remplace par une clé secrète sécurisée
      signOptions: { expiresIn: '1h' }, // Le token expire en 1 heure
    }),
    UsersModule, // pour accéder aux utilisateurs dans AuthService
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
