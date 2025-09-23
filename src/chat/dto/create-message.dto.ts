import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
    @ApiPropertyOptional({ description: 'ID penerima jika chat personal' })
    @IsOptional()
    @IsString()
    receiverId?: string;

    @ApiPropertyOptional({ description: 'ID group jika chat group' })
    @IsOptional()
    @IsString()
    groupId?: string;

    @ApiProperty({ example: 'Halo, apa kabar?' })
    @IsString()
    message: string;
}
