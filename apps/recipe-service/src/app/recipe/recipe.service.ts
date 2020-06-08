import { Injectable } from '@nestjs/common';
import { Recipe, RecipeInput, RecipeUpdate, Ingredient, IngredientAdd, IngredientUpdate, IngredientRemove } from "@recipe-book/entities";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from "mongodb";

@Injectable()
export class RecipeService {

    constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

    async getAll(): Promise<Recipe[]> {
        return this.recipeModel.find().exec();
    }

    async getById(id: string | ObjectId): Promise<Recipe> {
        return this.recipeModel.findById(new ObjectId(id)).exec();
    }

    async addRecipe(input: RecipeInput): Promise<Recipe> {
        let recipe: Recipe = input as Recipe;
        let createdRecipe: Recipe = new this.recipeModel(recipe);
        return createdRecipe.save();
    }

    async removeRecipe(id: string | ObjectId): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            this.recipeModel.deleteOne({ _id: new ObjectId(id) }).exec().then((value) => {
                res(value.ok === 1);
            });
        });
    }

    async updateRecipe(data: RecipeUpdate): Promise<Recipe> {
        return this.recipeModel.update({ _id: data.id }, { title: data.title, description: data.description }).exec();
    }

    async addIngredient(data: IngredientAdd): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            this.getById(data.recipeId).then((recipe) => {
                let ingredient: Ingredient = data.ingredient as Ingredient;
                recipe.ingredients.push(ingredient);
                res(recipe);
            });
        });
    }

    async updateIngredient(data: IngredientUpdate): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            this.getById(data.recipeId).then((recipe) => {
                let ingredient: Ingredient = recipe.ingredients.id(data.ingredientId);
                ingredient.name = data.name ?? ingredient.name;
                ingredient.amount = data.amount ?? ingredient.amount;
                ingredient.unit = data.unit ?? ingredient.unit;
                recipe.save().then((r) => res(r)).catch((reason) => rej(reason));
            });
        });
    }

    async removeIngredient(data: IngredientRemove): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            this.getById(data.recipeId).then((recipe) => {
                recipe.ingredients.id(data.ingredientId).remove();
                recipe.save().then(() => res(true)).catch(() => res(false));
            });
        });
    }

}
