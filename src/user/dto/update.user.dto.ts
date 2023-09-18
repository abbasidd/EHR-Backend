// import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateUserDto } from './creat-user.dto';

export class UserUpdateDto extends CreateUserDto { }

export class ActivateUser {
    @IsBoolean()
    isActive: string;
} 