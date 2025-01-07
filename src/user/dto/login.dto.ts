import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class LoginDto {
    @ValidateIf(o => !o.email)
    @IsNotEmpty()
    @IsString()
    readonly username?: string;
    
    @ValidateIf(o => !o.username)
    @IsNotEmpty()
    @IsEmail()
    readonly email?: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
