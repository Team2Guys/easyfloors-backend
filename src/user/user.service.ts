import { Injectable } from '@nestjs/common';
import { CreateUserInput, UserLogin } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { customHttpException } from '../utils/helper';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { Public } from '../decorators/public.decorator';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    try {
      const { email } = createUserInput;
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return customHttpException('User already exists!', 'BAD_REQUEST');
      }

      let user = await this.prisma.user.create({ data: createUserInput });
      console.log(user, 'user');
      return user;
    } catch (error) {
      throw customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async userLogin(createUserInput: UserLogin, res: Response) {
    try {
      const { email, password } = createUserInput;
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!existingUser) {
        return customHttpException('User already exists!', 'BAD_REQUEST');
      }

      if (existingUser.email !== email && existingUser.password !== password) {
        return customHttpException(
          'Invalid User name or passowrd',
          'UNAUTHORIZED',
        );
      }

      const { password: newpassword, ...userWithoutPassword } = existingUser;
      const token = jwt.sign(userWithoutPassword, process.env.TOKEN_SECRET, {
        expiresIn: '24h',
      });
      res.cookie('admin_access_token', token, {
        httpOnly: true,
        secure: true, // Required when using SameSite: 'None'
        sameSite: 'none', // Allows cross-origin cookie
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
      return {
        ...userWithoutPassword,
        token,
      };
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }
  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(email: string) {
    try {
      return this.prisma.user.findFirst({ where: { email } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async update(updateUserInput: UpdateUserInput) {
    try {
      const { email, ...withoutId } = updateUserInput;
      return this.prisma.user.update({ where: { email }, data: withoutId });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }
}
