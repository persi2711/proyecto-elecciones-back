import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../decorators/get-user.decorator';
import { Account } from 'src/modules/core/objects/user-data-module/accounts/account.entity';
import { User } from 'src/modules/core/objects/user-data-module/users/users.entity';
import { ProfileImageUpdateDto } from '../../contracts/user-update/profile-image-update.dto';
import { UpdateUserBrokerService } from 'src/modules/application/brokers/user/update-user-broker.service';
@ApiBearerAuth()
@ApiTags('update-user')
@Controller('update-user')
export class UpdateUserInformationController {
  constructor(private updateUserBrokerService: UpdateUserBrokerService) {}
  @UseGuards(AuthGuard())
  @Get('prueba')
  simpleLogin(@GetUser() user: User) {
    return user;
  }
  @Post('profile-image')
  @UseGuards(AuthGuard())
  updateProfileImage(
    @GetUser() user: User,
    @Body() dto: ProfileImageUpdateDto,
  ) {
    this.updateUserBrokerService.updateProfileImage(user, dto);
  }
  @Post('cv-document')
  @UseGuards(AuthGuard())
  updateCorriculumDocument(@GetUser() user: User) {}
}
