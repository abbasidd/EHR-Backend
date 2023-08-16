import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { log } from "console";
import { Observable } from "rxjs";
import { UserRole } from "src/user/user-roles.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
          const request = context.switchToHttp().getRequest();
    const user = request.user;

console.log(user.roles);

        
    if (!user) {
      return false; // User not authenticated, deny access
    }
     const hasRequiredRole = requiredRoles.some(role => role === user.);
    if(!hasRequiredRole) {
        throw new UnauthorizedException(`Requird role:`)
    }
    return hasRequiredRole;
    }
    
    
}