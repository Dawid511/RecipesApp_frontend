import {useForm} from "@mantine/form";
import {CommentFormValues} from "../../../types/CommentFormValues";

export const useCommentForm = () => {
    const commentForm = useForm<CommentFormValues>({
        initialValues: {
            content: "",
            authorId: 0,
            recipeId: 0,
        },

    });
    return commentForm;
}