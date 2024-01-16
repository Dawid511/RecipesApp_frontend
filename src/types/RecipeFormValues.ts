export type RecipeFormValues = {
    id?: number;
    title: string;
    description: string;
    ingredients: string;
    steps: string;
    difficulty: number;
    timeToMake: number;
    authorId: number;
    categoryIds: number[];
}