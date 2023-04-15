import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @Public()
    login(@Req() req : any){
        return this.authService.login(req.user);
    }
    
    @Post('google/login')
    @Public()
    googleLogin(@Body() body: any){
        return this.authService.googleLogin(body.token)
    }

    @Get()
    validateToken(){
        return
    }
}
