import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput, UserLogin } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Public } from '../decorators/public.decorator';
import { Response } from 'express';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation(() => User)
  createUser(@Args('createUser') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Public()
  @Mutation(() => User)
  userLogin(
    @Args('userLogin') userLogin: UserLogin,
    @Context('res') res: Response,
  ) {
    return this.userService.userLogin(userLogin, res);
  }

  @Query(() => [User], { name: 'All_user' })
  findAll() {
    return this.userService.findAll();
  }

  @Public()
  @Query(() => User, { name: 'find_one' })
  findOne(@Args('email', { type: () => String }) email: string) {
    return this.userService.findOne(email);
  }

  @Public()
  @Mutation(() => User)
  updateUser(@Args('updateUser') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => User, { name: 'remove_user' })
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
