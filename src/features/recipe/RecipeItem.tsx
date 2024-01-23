import { Card, Group, Image, Button, Text, Title } from "@mantine/core";
import React, {FC, memo, useEffect, useState} from "react";
import { RecipeType } from "../../types/RecipeType";
import { Link, useNavigate} from "react-router-dom";
import {deleteRecipe} from "./api/delete-recipe";
import {listMe} from "../login/api/get-me";

interface RecipeItemProps {
    item: RecipeType;
    imageSrc: string;
}

export const RecipeItem: FC<RecipeItemProps> = memo(({ item, imageSrc }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        listMe().then((user) => {
            setIsAdmin(user.isAdmin);
            setLoggedInUserId(user.id);
        });
    }, []);
    const handleDeleteClick = async (id: number) => {
        try {
            if (loggedInUserId === item.authorId || isAdmin) {
            await deleteRecipe(id);
            navigate(0);
            } else {
                console.error('Error');
            }
        } catch (e) {
            console.error('Error', e);
        }
    };

    return (
        <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        radius="md"
                        src={imageSrc}
                    />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Title order={6}>{item.title}</Title>
                    <Button

                        disabled={!isAdmin && loggedInUserId !== item.authorId}
                        onClick={() => handleDeleteClick(item.id)}
                        variant={"outline"}
                        color="black"
                    >
                        Delete
                    </Button>
                </Group>
                <p>{item.description}</p>
                <Link to={`/recipe/${item.id}`}>
                    <Button color="dark" fullWidth mt="md" radius="md" data-cy={`recipeId-${item.id}`}>
                        <Text fw={500}>Sprawdź przepis</Text>
                    </Button>
                </Link>
            </Card>
        </div>
    );
});
