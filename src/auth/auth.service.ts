import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser } from '../schemas/AuthUser.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name) private authUserModel: Model<AuthUser>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hachage du mot de passe
    const newUser = new this.authUserModel({ email, password: hashedPassword });
    return newUser.save();
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.authUserModel.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password); // Comparaison des mots de passe
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const payload = { email: user.email, sub: user._id }; // Crée le payload pour le JWT
    const accessToken = this.jwtService.sign(payload); // Génère un token JWT
    return { accessToken };
  }

  @Post('logout')
  async logout(): Promise<{ message: string }> {
    return { message: 'Déconnexion réussie' }; // Retourne un objet avec un message
  }
}
