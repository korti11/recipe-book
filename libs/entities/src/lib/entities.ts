import { ObjectType, Field, Int, Float } from "@nestjs/graphql";

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

