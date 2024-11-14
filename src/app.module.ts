import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; // Assure-toi que AuthModule est bien importé

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest_next_users'),
    UserModule,
    AuthModule, // AuthModule doit être bien importé ici
  ],
})
export class AppModule {}
