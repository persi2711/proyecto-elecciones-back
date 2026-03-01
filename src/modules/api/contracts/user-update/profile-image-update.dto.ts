import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class ProfileImageUpdateDto {
  @ApiProperty({
    example: 'users/uuid/avatar_123',
  })
  @IsString()
  publicId: string;

  @ApiProperty({
    example: 'https://res.cloudinary.com/...',
  })
  @IsString()
  secureUrl: string;

  @ApiProperty({
    required: false,
    example: { width: 400, height: 400 },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
