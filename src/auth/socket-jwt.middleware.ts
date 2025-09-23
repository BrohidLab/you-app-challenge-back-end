import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class SocketJwtMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    use(socket: Socket, next: (err?: any) => void) {
        try {
            const token =
            socket.handshake.auth?.token ||
            socket.handshake.headers?.authorization?.split(' ')[1];

            if (!token) throw new UnauthorizedException('Token not provided');

            const payload = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET || 'secretKey',
            });

            (socket as any).user = payload;
            next();
        } catch (err) {
            next(new UnauthorizedException('Invalid or expired token'));
        }
    }
}
