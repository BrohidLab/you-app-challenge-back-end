import { ApiProperty } from '@nestjs/swagger';

export class GroupResponseDto {
    @ApiProperty({ example: '651b9e8ac4d2e1c3fbd7e567' })
    groupId: string;

    @ApiProperty({ example: 'Family Group' })
    name: string;

    @ApiProperty({ type: [String], example: ['650a8f7bc9e9d1c3fbd1b111', '650a8f7bc9e9d1c3fbd1b222'] })
    members: string[];

    @ApiProperty({ example: '2025-09-17T12:45:00.000Z' })
    createdAt: Date;
}
