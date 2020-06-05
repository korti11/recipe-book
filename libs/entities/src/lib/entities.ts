import { ObjectType, Field, Int, Float, InputType } from "@nestjs/graphql";

@ObjectType()
export class Ingredient {
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

