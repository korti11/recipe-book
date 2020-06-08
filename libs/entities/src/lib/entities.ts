import { ObjectType, Field, Int, Float, InputType, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Document, Types } from 'mongoose';

@Schema()
export class DIngredient extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  unit: string;
}

@ObjectType()
export class Ingredient {
  @Field(type => ID)
  _id: ObjectId;

  @Field({ nullable: false })
  name: string;

  @Field(type => Float)
  amount: number;

  @Field({ nullable: false })
  unit: string;
}

// tslint:disable-next-line: typedef
export const IngredientSchema = SchemaFactory.createForClass(DIngredient);

@Schema()
export class DRecipe extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: [IngredientSchema], required: true })
  ingredients: Types.DocumentArray<DIngredient>;
}

@ObjectType()
export class Recipe {
  @Field(type => ID)
  _id: ObjectId;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [Ingredient])
  ingredients: Ingredient[];
}

// tslint:disable-next-line: typedef
export const RecipeSchema = SchemaFactory.createForClass(DRecipe);

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
  @Field(type => ID)
  id: ObjectId;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true})
  description?: string;
}

@InputType()
export class IngredientAdd {
  @Field(type => ID)
  recipeId: ObjectId;

  @Field(type => IngredientInput)
  ingredient: IngredientInput;
}

@InputType()
export class IngredientUpdate {
  @Field(type => ID)
  recipeId: ObjectId;

  @Field(type => ID)
  ingredientId: ObjectId;

  @Field({ nullable: true })
  name?: string;

  @Field(type => Float, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  unit?: string;
}

@InputType()
export class IngredientRemove {
  @Field(type => ID)
  recipeId: ObjectId;

  @Field(type => ID)
  ingredientId: ObjectId;
}