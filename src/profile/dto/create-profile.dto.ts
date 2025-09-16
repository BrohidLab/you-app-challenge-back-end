// create-profile.dto.ts
import { Type, Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsIn, Min, Max, IsArray, IsDate } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
  gender: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @Type(() => Date)
  @IsDate()
  birthday: Date;

  @IsOptional()
  @IsString()
  horoscope?: string;

  @IsOptional()
  @IsString()
  zodiac?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(30)
  @Max(250)
  height?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(2)
  @Max(300)
  weight?: number;

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
