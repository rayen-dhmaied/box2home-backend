import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Public } from './decorator/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
    constructor(private AuthService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() req : any){
        return this.AuthService.login(req.user);
    }
}
