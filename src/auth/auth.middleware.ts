
import { CanActivate, ExecutionContext, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtAuthGuards implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
    
        if (token) {
          try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded; 
            return true;
          } catch (err) {
            return false;
          }
        }
    
        return false;
      }
}