import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin_login, CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { customHttpException } from '../utils/helper';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express'; // Import Response from Express
import { AuthenticatedRequest } from 'type/express';

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}
  async create(createAdminInput: CreateAdminInput) {
    try {
      let existingAdmin = await this.prisma.admins.findFirst({
        where: { email: createAdminInput.email },
      });
      if (existingAdmin) {
        customHttpException('User Already Exist', 'BAD_REQUEST');
        return;
      }
      return await this.prisma.admins.create({ data: { ...createAdminInput } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async AdminLogin(loginData: Admin_login, res: Response) {
    const { email, password } = loginData;
    try {
      const existingUser = await this.prisma.admins.findFirst({
        where: { email },
      });

      if (!existingUser)
        return customHttpException('User Not found', 'NOT_FOUND');
      if (existingUser) {
        const isPasswordValid = existingUser.password === password;

        if (!isPasswordValid)
          throw new UnauthorizedException('Invalid username or password');

        const { password: _, ...userWithoutPassword } = existingUser;
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
      }
    } catch (error) {
      return customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async superAdmin(loginData: Admin_login, res: Response) {
    const { email, password } = loginData;
    try {
      let superAdmin_email = process.env.SUPER_AMDIN_EMAIL || ' ';
      let super_admin_pasword = process.env.SUPER_AMDIN_PASSWORD || ' ';

      if (email !== superAdmin_email) {
        return customHttpException('User Not found', 'NOT_FOUND');
      }
      if (super_admin_pasword !== password) {
        throw new UnauthorizedException('Invalid username or password');
      }

      let userWithoutPassword = {
        id: '7',
        fullname: 'Shiraz Ossman',
        email: superAdmin_email,
        role: 'super_admin',
      };

      const token = jwt.sign(userWithoutPassword, process.env.TOKEN_SECRET, {
        expiresIn: '24h',
      });

      res.cookie('super_admin_access_token', token, {
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
      return customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  findAll() {
    try {
      return this.prisma.admins.findMany({});
    } catch (error) {
      return customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(req: AuthenticatedRequest) {
    const { id, role } = req.user;
    try {
      if (role == 'super_admin') {
        let superAdmin_email = process.env.SUPER_AMDIN_EMAIL || ' ';
        return {
          id: 1,
          fullname: 'Shiraz Osman',
          email: superAdmin_email,
          canAddProduct: true,
          canEditProduct: true,
          canDeleteProduct: true,
          canAddCategory: true,
          canDeleteCategory: true,
          canEditCategory: true,
          canCheckProfit: true,
          canCheckRevenue: true,
          canCheckVisitors: true,
          canViewUsers: true,
          canViewSales: true,
          canVeiwAdmins: true,
          canVeiwTotalproducts: true,
          canVeiwTotalCategories: true,
          posterImageUrl: null,
          role: 'super_admin',
        };
      }
      let admin = await this.prisma.admins.findUnique({ where: { id } });
      console.log(admin, 'admins');
      return admin;
    } catch (error) {
      return customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async update(id: number, updateAdminInput: UpdateAdminInput) {
    try {
      const { id: _, ...withoutId } = updateAdminInput;

      let admin = await this.prisma.admins.findUnique({ where: { id } });
      if (!admin) {
        return customHttpException('User not found😴', 'FORBIDDEN');
      }
      return await this.prisma.admins.update({
        where: { id },
        data: withoutId,
      });
    } catch (error) {
      return customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.admins.delete({ where: { id } });
    } catch (error) {
      return customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }
}
