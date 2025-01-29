import { Controller, Post, Body, Request, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Res() res: Response,@Body() body) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const access_token = await this.authService.login(user);
    return res.status(200).json({data:access_token});
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard)
  getProtectedResource(@Request() req) {
    return { message: `Hello ${req.user.username}, you're authenticated!` };
  }
}