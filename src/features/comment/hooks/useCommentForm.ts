import {useForm} from "@mantine/form";
import {CommentFormValues} from "../../../types/CommentFormValues";

export const useCommentForm = () => {
    const commentForm = useForm<CommentFormValues>({
        initialValues: {
            content: "",
            createdAt: new Date(),
            userId: 0,
            recipeId: 0,
        },

    });
    return commentForm;
}