import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, Ingredient, RecipeSchema, IngredientSchema } from '@recipe-book/entities';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Recipe.name, schema: RecipeSchema}, {name: Ingredient.name, schema: IngredientSchema}])
  ],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
