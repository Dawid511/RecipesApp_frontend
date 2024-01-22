export type CommentFormValues = {
    id?: number;
    content: string;
    createdAt?: Date;
    authorId: number;
    recipeId: number;
}