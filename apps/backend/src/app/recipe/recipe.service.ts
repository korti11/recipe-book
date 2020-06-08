import { Injectable, Logger } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from "@nestjs/microservices";
import { Recipe, RecipeInput, RecipeUpdate, IngredientAdd, IngredientUpdate, IngredientRemove } from "@recipe-book/entities";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable()
export class RecipeService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: environment.recipe_host,
                port: environment.recipe_port
            }
        });
    }

    getAll(): Observable<Recipe[]> {
        Logger.log("Send request for all recipes to the recipe-service.");
        return this.client.send<Recipe[], any>({ cmd: "all" }, {});
    }

    getById(id: string): Observable<Recipe> {
        Logger.log("Send request for recipe by id to the recipe-service.");
        return this.client.send<Recipe, string>({ cmd: "byId" }, id);
    }

    addRecipe(input: RecipeInput): Observable<Recipe> {
        Logger.log("Send request for adding a new recipe to the recipe-service.");
        return this.client.send<Recipe, RecipeInput>({ cmd: "add" }, input);
    }

    removeRecipe(id: string): Observable<boolean> {
        Logger.log("Send request for removing a recipe to the recipe-service.");
        return this.client.send<boolean, string>({ cmd: "remove" }, id);
    }

    updateRecipe(input: RecipeUpdate): Observable<Recipe> {
        Logger.log("Send request for updating a recipe to the recipe-service.");
        return this.client.send<Recipe, RecipeUpdate>({ cmd: "update" }, input);
    }

    addIngredient(input: IngredientAdd): Observable<Recipe> {
        Logger.log("Send request for adding a new ingredient for a recipe to the recipe-service.");
        return this.client.send<Recipe, IngredientAdd>({ cmd: "addIngredient" }, input);
    }

    updateIngredient(input: IngredientUpdate): Observable<Recipe> {
        Logger.log("Send request for updating a ingredient for a recipe to the recipe-service.");
        return this.client.send<Recipe, IngredientUpdate>({ cmd: "updateIngredient" }, input);
    }

    removeIngredient(input: IngredientRemove): Observable<boolean> {
        Logger.log("Send request for removing a ingredient for a recipe to the recipe-service.");
        return this.client.send<boolean, IngredientRemove>({ cmd: "removeIngredient" }, input);
    }

}
