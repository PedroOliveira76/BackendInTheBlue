import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async createUser(userData: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });
        return await this.userRepository.save(newUser);
    }

    async updateUser(id: number, updateUserDto: Partial<User>): Promise<User> {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        await this.userRepository.update(id, updateUserDto);
        return await this.userRepository.findOneById(id);
    }

    async removeUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
