import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { LoginDto } from './dto/login.dto';
import { ExpressRequest } from './types/expressRequest.interface';
import { AuthGuard } from './middleware/auth/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')     
    @UsePipes(ValidationPipe)
    async register(@Body() user: CreateUserDto): Promise<{ id: number; username: string; token: string }> {
        return await this.userService.register(user);
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() user: LoginDto): Promise<{ id: number; username: string; token: string }> {
        return await this.userService.login(user);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Req() req: ExpressRequest): Promise<UserEntity> {
        return await this.userService.getProfile(req.user.id);
    }
    
    @Put('profile')
    @UseGuards(AuthGuard)
    async updateProfile(@Req() req: ExpressRequest, @Body() user: UpdateUserDto): Promise<UserEntity> {
        return await this.userService.updateProfile(req.user.id, user);
    }
}
