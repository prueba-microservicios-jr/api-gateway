import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const publicRoutes = ['/api/auth/login']; // Rutas públicas
    
        if (publicRoutes.includes(request.url)) {
          return true;  // Permitir acceso sin token
        }
    
        return super.canActivate(context);
      }
}