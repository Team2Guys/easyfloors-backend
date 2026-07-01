import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { B2bQuotesService } from './b2b_quotes.service';
import { B2bQuote } from './entities/b2b-quote.entity';
import { CreateB2bQuoteInput } from './dto/create-b2b-quote.input';
import { Public } from '../decorators/public.decorator';

@Resolver(() => B2bQuote)
export class B2bQuotesResolver {
  constructor(private readonly b2bQuotesService: B2bQuotesService) {}

  @Public()
  @Mutation(() => B2bQuote, { name: 'Created_b2bQuote' })
  createB2bQuote(
    @Args('createB2bQuoteInput') createB2bQuoteInput: CreateB2bQuoteInput,
  ) {
    return this.b2bQuotesService.create(createB2bQuoteInput);
  }

  @Query(() => [B2bQuote], { name: 'b2bQuotes' })
  findAll() {
    return this.b2bQuotesService.findAll();
  }

  @Public()
  @Query(() => B2bQuote, { name: 'b2bQuote' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.b2bQuotesService.findOne(id);
  }

  @Mutation(() => B2bQuote)
  removeB2bQuote(@Args('id', { type: () => Int }) id: number) {
    return this.b2bQuotesService.remove(id);
  }
}
