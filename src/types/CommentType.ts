export interface CommentType {
    id: number;
    content: string;
    createdAt: Date;
    userId: number;
    recipeId: number;
}