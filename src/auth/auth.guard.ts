import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly userService: UserService

  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization?.replace('Bearer ', ''); //get accesstoken from headers
    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }
    try {
      const decodedToken = this.jwtservice.verify(accessToken, { secret: process.env.JWT_SECRET }); // Verify the access token
      const { email } = decodedToken;
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('you are Unauthorized');
    }
  }

}