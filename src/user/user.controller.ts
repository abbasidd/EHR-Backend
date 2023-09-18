import { Body, Controller, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/creat-user.dto';
import { ActivateUser, UserUpdateDto } from './dto/update.user.dto';
import { IsActiveMiddleware } from './isActive.middleware';
import { Roles } from 'src/auth/roles.decorator';
import { LocalAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { UserRole } from './user-roles.enum';
import { CryptoService } from 'src/crypto/crypto.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userservice: UserService,
    private readonly cryptoService: CryptoService
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userservice.create(createUserDto);
  }
  @Patch(':id')
  // @UseGuards(IsActiveMiddleware)
  async update(@Param('id') userId: number, @Body() updateUserDto: UserUpdateDto) {
    return this.userservice.update(userId, updateUserDto);
  }

  @Put(':id')
  @UseGuards(LocalAuthGuard, RoleGuard)
  @Roles(UserRole.Admin)
  // @UseGuards(IsActiveMiddleware)
  async activateUser(@Param('id') userId: number, @Body() updateUserDto: ActivateUser) {
    return this.userservice.updateAndAddPatientID(userId, updateUserDto);
  }
  @Post('encrypt')
  async encryptData(@Body() body: { data: string, publicKey: string }): Promise<string> {
    return await this.cryptoService.encryptSymmetric(body.data, body.publicKey);
  }

  @Post('decrypt')
  decryptData(@Body() body: { encryptedData: string }): string {
    return this.cryptoService.decryptSymmetric(body.encryptedData);
  }

  @Post('key-gen-temp')
  generateKeys(@Body() body: { encryptedData: string }): string[] {
    return this.cryptoService.getPublicKey();
  }

  @Post('encrypt-asymmetirc')
  encrypt(@Body() body: { data: string, publicKeyPem: string }): string {
    return this.cryptoService.encryptAsymmetric(body.data, body.publicKeyPem);
  }

  @Post('decrypt-asymmetirc')
  decrypt(@Body() body: { encryptedData: string, privateKeyPem: string }): string {
    return this.cryptoService.decryptAsymmetric(body.encryptedData, body.privateKeyPem);
  }
}
