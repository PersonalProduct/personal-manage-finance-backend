import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/modules/users/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    var { email, username, avatarUrl, firstName, midName, lastName, birthdate } = { ...createUserDto };
    return await this.userModel.create({
      email,
      username,
      avatarUrl: avatarUrl || `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`,
      verified: true,
      profile: { firstName, midName, lastName, birthdate }
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).select('email username avatarUrl profile');
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(updateUserDto: UpdateUserDto) {
    var {_id, username, avatarUrl, firstName, midName, lastName, birthdate } = { ...updateUserDto };

    var existingUser = await this.userModel.findById(_id);
    if (!existingUser) 
      throw new BadRequestException(`User with id ${_id} not found.`);

    return await this.userModel.findByIdAndUpdate(_id, {
      username,
      avatarUrl,
      profile: { firstName, midName, lastName, birthdate }
    }).select('_id');

  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
