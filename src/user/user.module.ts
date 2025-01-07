import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './middleware/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],  
  controllers: [UserController],
  providers: [UserService, AuthGuard]
})
export class UserModule {}
