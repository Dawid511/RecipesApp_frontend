import React, { useState, useEffect } from "react";
import { ratingByRecipeId } from "./api/rating";
import { Rating } from "@mantine/core";

interface RatingProps {
    recipeId: number;
}

export const RatingValue: React.FC<RatingProps> = ({ recipeId }) => {
    const [rating, setRating] = useState<number>(0);


    useEffect(() => {
        ratingByRecipeId(recipeId).then((response) => setRating(response));
    }, [recipeId]);

    return (
        <div>
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={rating} fractions={2} readOnly />
            <p style={{ fontSize: '14px', margin: '0 5px' }}>Ocena: {rating}/5.0</p>
            </span>
        </div>
    );
};
