import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async create(email: string, password: string) {
    const user = this.userRepository.create({ email, password });
    return this.userRepository.save(user);
  }

  public async find(email: string) {
    return this.userRepository.find({ where: { email: email } });
  }
  public async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  public async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  public async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userRepository.remove(user);
  }
}
