import { Injectable } from '@nestjs/common';
import { Recipe } from "@recipe-book/entities";

@Injectable()
export class RecipeService {

    private testData: Recipe[] = [
        {
            id: 1,
            title: "Toast",
            description: "",
            ingredients: [
                {
                    name: "Toast",
                    amount: 1,
                    unit: "Stk."
                }
            ]
        }
    ];

    async getAll(): Promise<Recipe[]> {
        return new Promise<Recipe[]>((res, rej) => {
            res(this.testData);
        });     // mock for testing. Later MongoDB connection.
    }

    async getById(id: number): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            res(this.testData[id]);
        });
    }

}
