import { ObjectType, Field, Int, Float, InputType } from "@nestjs/graphql";

@ObjectType()
export class Ingredient {
  @Field(type => Int)
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field(type => Float)
  amount: number;

  @Field({ nullable: false })
  unit: string;
}

@ObjectType()
export class Recipe {
  @Field(type => Int)
  id: number;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [Ingredient])
  ingredients: Ingredient[];
}

@InputType()
export class IngredientInput {
  @Field({ nullable: false })
  name: string;

  @Field(type => Float)
  amount: number;

  @Field({ nullable: false })
  unit: string;
}

@InputType()
export class RecipeInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [IngredientInput])
  ingredients: IngredientInput[];
}

@InputType()
export class RecipeUpdate {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true})
  description?: string;
}

@InputType()
export class IngredientAdd {
  @Field(type => Int)
  recipeId: number;

  @Field(type => IngredientInput)
  ingredient: IngredientInput;
}

@InputType()
export class IngredientUpdate {
  @Field(type => Int)
  recipeId: number;

  @Field(type => Int)
  ingredientId: number;

  @Field({ nullable: true })
  name?: string;

  @Field(type => Float, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  unit?: string;
}

@InputType()
export class IngredientRemove {
  @Field(type => Int)
  recipeId: number;

  @Field(type => Int)
  ingredientId: number;
}