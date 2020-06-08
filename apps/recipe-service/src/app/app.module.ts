import { Module } from '@nestjs/common';

import { RecipeModule } from './recipe/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot(environment.databaseString)
  ]
})
export class AppModule {}
