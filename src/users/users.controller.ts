import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getsAllUsers() {
    return this.usersService.getsAllUsers();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Vérifie si l'ID est valide
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Id is not valid', 404);
    }

    // Appelle le service pour mettre à jour l'utilisateur
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);

    // Si l'utilisateur n'existe pas, lève une exception
    if (!updatedUser) {
      throw new HttpException('User not found', 404);
    }

    // Retourne l'utilisateur mis à jour
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Id is not valid', 404);
    const deleteUser = await this.usersService.deleteUser(id);
    if (!deleteUser) throw new HttpException('User not Found', 404);
    return;
  }
}
