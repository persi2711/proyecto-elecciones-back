import { Injectable } from '@nestjs/common';
import { AuthActionsService } from '../../actions/auth/auth-actions.service';
import { AccountActionsService } from '../../actions/account/accout-actions.service';

@Injectable()
export class LoginSesionBroker {
  constructor(
    private authActionsService: AuthActionsService,
    private accountActionsService: AccountActionsService,
  ) {}

  loginWithEmail() {
    this.accountActionsService.getDataAcount();
    this.authActionsService.obtenerJWT();
  }
}
