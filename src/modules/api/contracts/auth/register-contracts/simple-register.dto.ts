import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { GenderEnum } from 'src/modules/core/enums/geneder-enum/gender-enum';

export class AccountRegisterDto {
  @ApiProperty({
    example: 'usuario@email.com',
  })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: 'Password123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: 'password debe incluir mayúscula, minúscula y número',
  })
  password: string;
}

export class GoogleAccountRegisterDto {
  @ApiProperty({
    example: 'usuario@email.com',
  })
  @IsEmail()
  @MaxLength(255)
  email: string;
}

export class UserRegisterDto {
  @ApiPropertyOptional({ example: '5512345678' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({ example: '0123' })
  @IsString()
  @MaxLength(100)
  sector: string;

  @ApiPropertyOptional({ example: 'CDMX' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;
}
export class GeneralInfoRegisterDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'Perez' })
  @IsString()
  @MaxLength(100)
  apellidoP: string;

  @ApiPropertyOptional({ example: 'Lopez' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  apellidoM?: string;

  @ApiProperty({
    enum: GenderEnum,
    example: GenderEnum.MALE,
  })
  @IsEnum(GenderEnum)
  genero: GenderEnum;
}
export class SimpleRegisterDto {
  @ApiProperty({ type: AccountRegisterDto })
  @ValidateNested()
  @Type(() => AccountRegisterDto)
  account: AccountRegisterDto;

  @ApiProperty({ type: UserRegisterDto })
  @ValidateNested()
  @Type(() => UserRegisterDto)
  user: UserRegisterDto;

  @ApiProperty({ type: GeneralInfoRegisterDto })
  @ValidateNested()
  @Type(() => GeneralInfoRegisterDto)
  generalInfo: GeneralInfoRegisterDto;
}

export class GoogleCreateAccountDto {
  @ApiProperty({ type: GoogleAccountRegisterDto })
  @ValidateNested()
  @Type(() => GoogleAccountRegisterDto)
  account: GoogleAccountRegisterDto;

  @ApiProperty({ type: UserRegisterDto })
  @ValidateNested()
  @Type(() => UserRegisterDto)
  user: UserRegisterDto;

  @ApiProperty({ type: GeneralInfoRegisterDto })
  @ValidateNested()
  @Type(() => GeneralInfoRegisterDto)
  generalInfo: GeneralInfoRegisterDto;
}
