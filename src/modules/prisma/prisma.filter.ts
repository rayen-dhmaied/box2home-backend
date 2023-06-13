import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client'; 
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    switch(exception.code){
      case 'P2000':{
        const status = HttpStatus.BAD_REQUEST
        const message = exception.message.replace(/\n/g, '');
        res.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2002':{
        const status = HttpStatus.CONFLICT
        let message = /this\.prisma\.(\w+)\./.exec(exception.message)[1];
        message = message.charAt(0).toUpperCase() + message.slice(1) + " avec une contrainte unique existe déjà";
        res.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      case 'P2025':{
        const status = HttpStatus.NOT_FOUND
        let message = /this\.prisma\.(\w+)\./.exec(exception.message)[1];
        message = message.charAt(0).toUpperCase() + message.slice(1) + " n'existe plus";
        res.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
    }
  }
}
