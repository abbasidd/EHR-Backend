import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy, } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Strategy } from 'passport-local';
@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userService: UserService) {
        super();
    }
    async validate(email: string, password: string): Promise<boolean> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const passwordIsCorrect = await user?.validatePassword(password)
        if (!passwordIsCorrect) {
            throw new BadRequestException('Invalid email or password');
        }
        return false;
    }
}  