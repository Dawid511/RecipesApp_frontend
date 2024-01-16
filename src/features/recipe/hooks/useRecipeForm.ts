import {useForm} from "@mantine/form";
import {RecipeFormValues} from "../../../types/RecipeFormValues";

export const useRecipeForm = () => {
    const form = useForm<RecipeFormValues>({
        initialValues: {
            title: "",
            description: "",
            ingredients: "",
            steps: "",
            difficulty: 2,
            timeToMake: 40,
            authorId: 0,
            categoryIds: [0]
        },

        validate: {
            title: (value) => {
                if (value.length < 3) {
                    return "Title must be a least 3 characters long";
                }
            },

            description: (value) => {
                if (value.length < 10) {
                    return "Content must be a least 10 characters long";
                }
            },

            difficulty: (value) => {
                if (value <= 3 && value >= 1) {
                    return "Difficulty level must be between 1 and 3";
                }
            },


        },
    });
    return form;
}