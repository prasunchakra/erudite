import { IsOptional, IsString, IsBoolean, IsDate, IsEnum } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly username?: string;

    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsString()
    readonly bio?: string;

    @IsOptional()
    @IsString()
    readonly avatar?: string;

    @IsOptional()
    @IsString()
    readonly password?: string;
}
