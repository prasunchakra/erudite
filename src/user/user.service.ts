import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { JWT_SECRET } from 'src/config';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}
    async register(user: CreateUserDto): Promise<{ id: number; username: string;  token: string }> {
        const existingUserByEmail = await this.userRepository.findOne({ where: { email: user.email } });
        if (existingUserByEmail) {
            throw new ConflictException('User with this email already exists');
        }

        const existingUserByUsername = await this.userRepository.findOne({ where: { username: user.username } });
        if (existingUserByUsername) {
            throw new ConflictException('User with this username already exists');
        }

        const newUser = new UserEntity();
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = user.password;   
        newUser.isActive = true;
        const savedUser = await this.userRepository.save(newUser);
        return {
            id: savedUser.id,
            username: savedUser.username,
            token: this.generateToken(savedUser),
        };
    }

    async login(user: LoginDto): Promise<{ id: number; username: string; token: string }> {
        let existingUser: UserEntity;
        if (user.email) {
            existingUser = await this.userRepository.findOne({ where: { email: user.email }, select: ['id', 'username', 'password'] });
            if (!existingUser) {
                throw new NotFoundException('User not found');
            }
        } else if (user.username) {
            existingUser = await this.userRepository.findOne({ where: { username: user.username }, select: ['id', 'username', 'password'] });
            if (!existingUser) {
                throw new NotFoundException('User not found');
            }
        }
        if (!compareSync(user.password, existingUser.password)) {
            throw new UnauthorizedException('Invalid password');
        }
        return {
            id: existingUser.id,
            username: existingUser.username,
            token: this.generateToken(existingUser),
        };
    }

    async getProfile(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async updateProfile(id: number, user: UpdateUserDto): Promise<UserEntity> {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        return await this.userRepository.save({ ...existingUser, ...user });
    }

    private generateToken(user: UserEntity): string {
        return sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    }
}