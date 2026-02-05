import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AdminsService } from './admins.service';
import { Admin, admin_with_token, super_admin } from './entities/admin.entity';
import { Admin_login, CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Response } from 'express';
import { Public } from '../decorators/public.decorator';
import { AuthenticatedRequest } from 'type/express';

@Resolver(() => Admin)
export class AdminsResolver {
  constructor(private readonly adminsService: AdminsService) {}

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminsService.create(createAdminInput);
  }

  @Query(() => [Admin], { name: 'admins' })
  findAll() {
    return this.adminsService.findAll();
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Context('req') req: AuthenticatedRequest) {
    return this.adminsService.findOne(req);
  }

  @Mutation(() => Admin)
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminsService.update(+updateAdminInput.id, updateAdminInput);
  }

  @Mutation(() => Admin)
  removeAdmin(@Args('id', { type: () => Int }) id: number) {
    return this.adminsService.remove(id);
  }

  @Public()
  @Mutation(() => admin_with_token)
  adminLogin(
    @Args('AdminLogin') Admin_login: Admin_login,
    @Context('res') res: Response,
  ) {
    return this.adminsService.AdminLogin(Admin_login, res);
  }

  @Public()
  @Mutation(() => admin_with_token)
  superAdminLogin(
    @Args('superAdminLogin') Admin_login: Admin_login,
    @Context('res') res: Response,
  ) {
    return this.adminsService.superAdmin(Admin_login, res);
  }
}
