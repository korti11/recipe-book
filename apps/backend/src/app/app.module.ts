import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path';

import { RecipeModule } from './recipe/recipe.module';
import { environment } from '../environments/environment';

@Module({
  imports: [
    RecipeModule,
    GraphQLModule.forRoot({
      debug: !environment.production,
      playground: !environment.production,
      autoSchemaFile: join(process.cwd(), 'apps/backend/src/schema.gql'),
      include: [RecipeModule]
    })
  ]
})
export class AppModule {}
