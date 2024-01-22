import {useForm} from "@mantine/form";
import {RatingFormValues} from "../../../types/RatingFormValues";

export const useRatingForm = () => {
    const ratingForm = useForm<RatingFormValues>({
        initialValues: {
            rate: 0,
            userId: 0,
            recipeId: 0,
        },

    });
    return ratingForm;
}