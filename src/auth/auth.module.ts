import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Assure-toi d'importer JwtModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthUser, AuthUserSchema } from '../schemas/AuthUser.schema'; // Schéma AuthUser

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthUser.name, schema: AuthUserSchema },
    ]),
    JwtModule.register({
      secret: 'your-secret-key', // Utilise une clé secrète pour signer les JWT
      signOptions: { expiresIn: '1h' }, // Optionnel : spécifie la durée d'expiration du token
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
