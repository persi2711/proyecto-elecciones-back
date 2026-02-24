import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateAccountDto {
  @ApiProperty()
  @IsString()
  token: string;
}
