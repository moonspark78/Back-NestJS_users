import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Récupère le token à partir de l'en-tête Authorization

    if (!token) {
      return false; // Si aucun token n'est fourni, rejeter l'accès
    }

    try {
      const decoded = this.jwtService.verify(token); // Vérifie le token
      request.user = decoded; // Attache l'utilisateur au request (pour une utilisation future dans les contrôleurs)
      return true; // Si le token est valide, autoriser l'accès
    } catch {
      return false; // Si le token est invalide ou expiré, rejeter l'accès
    }
  }
}
