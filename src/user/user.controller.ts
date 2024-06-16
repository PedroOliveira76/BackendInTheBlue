
import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return await this.userService.findOne(Number(id));
    }

    @Post()
    async create(@Body() userData: User): Promise<User> {
        return await this.userService.createUser(userData);
    }


    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<User> {
        return await this.userService.updateUser(Number(id), updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.userService.removeUser(Number(id));
    }

    @Post('login')
    async login(@Body() loginData: { email: string; password: string }): Promise<{ id: number; email: string }> {
        try {
            const { email, password } = loginData;
            const user = await this.userService.findByEmail(email);

            if (!user) {
                throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
            }
            return {
                id: user.id,
                email: user.email,
            };
        } catch (error) {
            throw new HttpException('Erro ao fazer login', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
