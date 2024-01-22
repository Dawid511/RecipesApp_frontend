import React, { useEffect, useState } from "react";
import { listMe } from "../login/api/get-me";
import { UserType } from "../../types/UserType";
import {Button, Group, Paper, Rating} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useRatingForm } from "./hooks/useRatingForm";
import { RatingFormValues } from "../../types/RatingFormValues";
import { createRating } from "./api/create-rating";

interface RatingFormProps {
    rate: number;
    userId: number;
    recipeId: number;
}

export const RatingForm = () => {
    const [userData, setUserData] = useState<UserType>();
    const { id } = useParams();
    const ratingForm = useRatingForm();

    useEffect(() => {
        listMe().then((user) => {
            ratingForm.setFieldValue("userId", user.id);
            if (id != null) {
                ratingForm.setFieldValue("recipeId", parseInt(id, 10));
            }
        });
    }, []);

    const handleSubmit = async (vals: RatingFormValues) => {
        try {
            await createRating(vals);
        } catch (e) {
            // Obsłuż błąd
        }
    };

    return (
        <Paper shadow="xs" p="xl">
        <form onSubmit={ratingForm.onSubmit(handleSubmit)}>
            <Group justify={"space-between"}>
                <Group>
                    <p>Oceń przepis!</p>
                    <Rating size="lg" value={ratingForm.values.rate} onChange={(value) => ratingForm.setFieldValue("rate", value)} />
                </Group>
            <Button type="submit" color={"dark"}>Zatwierdź</Button>
            </Group>
        </form>
        </Paper>
    );
};
