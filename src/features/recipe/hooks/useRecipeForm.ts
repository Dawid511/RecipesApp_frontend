import {useForm} from "@mantine/form";
import {RecipeFormValues} from "../../../types/RecipeFormValues";

export const useRecipeForm = () => {
    const form = useForm<RecipeFormValues>({
        initialValues: {
            title: "",
            content: "",
        },

        validate: {
            title: (value) => {
                if (value.length < 3) {
                    return "Title must be a least 3 characters long";
                }
            },

            content: (value) => {
                if (value.length < 10) {
                    return "Content must be a least 10 characters long";
                }
            }
        },
    });
    return form;
}