import { Injectable, Logger } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from "@nestjs/microservices";
import { Recipe, RecipeInput } from "@recipe-book/entities";
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
        Logger.log("Send request for all recipes to the recipe-service.")
        return this.client.send<Recipe[], any>({ cmd: "all" }, {});
    }

    getById(id: number): Observable<Recipe> {
        Logger.log("Send request for recipe by id to recipe-service.");
        return this.client.send<Recipe, number>({ cmd: "byId" }, id);
    }

    addRecipe(input: RecipeInput): Observable<Recipe> {
        Logger.log("Send request for adding a new recipe to recipe-service.");
        return this.client.send<Recipe, RecipeInput>({ cmd: "add" }, input);
    }

}
