import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
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
    validateTokenRole(@Req() req: any){}

    @Post('reset-password')
    @Public()
    async resetPassword(@Body() body: any){
        if(body.email){
            return this.authService.sendResetPwEmail(body.email)
        }else if(body.token && !body.password){
            const is_valid = await this.authService.validateResetPWToken(body.token)
            if(!is_valid) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }else if(body.token && body.password){
            return this.authService.changePassword(body.token, body.password)
        }
    }
}
