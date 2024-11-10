import {
  IsOptional,
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional() // Le champ email est optionnel
  @IsEmail() // Valide que l'email doit être au format email
  email?: string;

  @IsOptional() // Le champ age est optionnel
  @IsInt() // Valide que l'âge doit être un entier
  @Min(18) // L'âge minimum autorisé est de 18 ans
  @Max(120) // L'âge maximum autorisé est de 120 ans
  age?: number;

  @IsOptional() // Le champ country est optionnel
  @IsString() // Valide que le pays doit être une chaîne de caractères
  country?: string;
}
