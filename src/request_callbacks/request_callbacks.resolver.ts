import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequestCallbacksService } from './request_callbacks.service';
import { RequestCallback } from './entities/request-callback.entity';
import { CreateRequestCallbackInput } from './dto/create-request-callback.input';
import { Public } from '../decorators/public.decorator';

@Resolver(() => RequestCallback)
export class RequestCallbacksResolver {
  constructor(
    private readonly requestCallbacksService: RequestCallbacksService,
  ) {}

  @Public()
  @Mutation(() => RequestCallback)
  createRequestCallback(
    @Args('createRequestCallbackInput')
    createRequestCallbackInput: CreateRequestCallbackInput,
  ) {
    return this.requestCallbacksService.create(createRequestCallbackInput);
  }

  @Query(() => [RequestCallback], { name: 'requestCallbacks' })
  findAll() {
    return this.requestCallbacksService.findAll();
  }

  @Query(() => RequestCallback, { name: 'requestCallback' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.requestCallbacksService.findOne(id);
  }

  @Mutation(() => RequestCallback)
  removeRequestCallback(@Args('id', { type: () => Int }) id: number) {
    return this.requestCallbacksService.remove(id);
  }
}
