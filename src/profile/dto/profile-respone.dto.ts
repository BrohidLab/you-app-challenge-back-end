import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
    @ApiProperty({ example: '64f1a2c7b4d2f9a3e6b7c8d9' })
    _id: string;

    @ApiProperty({ example: 'Sahid' })
    name: string;

    @ApiProperty({ example: 'male', enum: ['male', 'female'] })
    gender: string;

    @ApiProperty({ example: 'uploads/1695246123456-123456789.png', required: false })
    photo?: string;

    @ApiProperty({ example: '1998-05-15T00:00:00.000Z' })
    birthday: Date;

    @ApiProperty({ example: 'Leo', required: false })
    horoscope?: string;

    @ApiProperty({ example: 'Tiger', required: false })
    zodiac?: string;

    @ApiProperty({ example: 175, required: false })
    height?: number;

    @ApiProperty({ example: 70, required: false })
    weight?: number;

    @ApiProperty({ example: ['coding', 'music', 'gaming'], required: false })
    interest?: string[];

    @ApiProperty({ example: '64f1a2c7b4d2f9a3e6b7c8a0' })
    userId: string;

    @ApiProperty({ example: '2025-09-15T17:28:47.072Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-09-16T10:12:30.512Z' })
    updatedAt: Date;
}
