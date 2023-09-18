import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/creat-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ActivateUser, UserUpdateDto } from './dto/update.user.dto';
import { ethers } from 'ethers';

@Injectable()
export class UserService {



  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService

  ) { }
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.Email);
    if (existingUser) {
      throw new ConflictException("User Already Exists")
    }
    const user = this.userRepository.create(createUserDto)
    await this.userRepository.save(user)
    const payload = {
      userpasword: user.Password,
      useremail: user.Email

    }
    const access = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
    delete user.Password;
    return user;
  }


  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        Email: email,
      },
    });
    return user;
  }

  async findByPatientID(patientID: string) {
    const user = await this.userRepository.findOne({
      where: {
        patientID: patientID,
      },
    });
    return user;
  }


  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async update(id: number, updateUserDto: UserUpdateDto | ActivateUser) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);

    await this.userRepository.save(user);
    return user;
  }

  async updateAndAddPatientID(id: number, updateUserDto: UserUpdateDto | ActivateUser) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    let concatenatedArgs = ethers.utils.solidityPack(["address", "string"], [
      user.address || "0x0000000000000000000000000000000000000000",
      user.Email
    ])
    user.patientID = ethers.utils.keccak256(concatenatedArgs)
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
    return user;
  }


}


