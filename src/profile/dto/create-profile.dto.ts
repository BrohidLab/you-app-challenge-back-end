import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsIn, Min, Max, IsArray, IsDate } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'Sahid', description: 'Nama lengkap user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'male', enum: ['male', 'female'], description: 'Jenis kelamin user' })
  @IsString()
  @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
  gender: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Upload foto profil user (file image)',
  })
  photo?: any;


  @ApiProperty({ example: '2000-01-01', description: 'Tanggal lahir user (format ISO date)' })
  @Type(() => Date)
  @IsDate()
  birthday: Date;

  @ApiPropertyOptional({ example: 'Leo', description: 'Horoscope user (otomatis dari birthday)' })
  @IsOptional()
  @IsString()
  horoscope?: string;

  @ApiPropertyOptional({ example: 'Aries', description: 'Zodiac user (otomatis dari birthday)' })
  @IsOptional()
  @IsString()
  zodiac?: string;

  @ApiPropertyOptional({ example: 175, description: 'Tinggi badan dalam cm (30-250)' })
  @Type(() => Number)
  @IsNumber()
  @Min(30)
  @Max(250)
  height?: number;

  @ApiPropertyOptional({ example: 65, description: 'Berat badan dalam kg (2-300)' })
  @Type(() => Number)
  @IsNumber()
  @Min(2)
  @Max(300)
  weight?: number;

  @ApiPropertyOptional({
    example: ['coding', 'music', 'reading'],
    description: 'Daftar interest user',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (!value) return [];
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
        return [value];
      } catch {
        return [value];
      }
    }
    if (Array.isArray(value)) return value;
    return [];
  })
  interest?: string[];
}
