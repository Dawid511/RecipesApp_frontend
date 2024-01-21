import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { RecipeType } from "../../types/RecipeType";
import { listRecipe } from "./api/recipe";
import {Button, Divider, Group, Input, MantineProvider, Paper, Rating, ThemeIcon} from "@mantine/core";
import {
    IconCircle,
    IconCircleFilled,
    IconClockHour2,
    IconHeartPlus
} from "@tabler/icons-react";
import { listMe } from "../login/api/get-me";
import {CommentList} from "../comment/Comment";
import {CommentForm} from "../comment/CommentForm";

export const RecipeInformation: React.FC = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    const [authorName, setAuthorName] = useState<string>("");
    const [value, setValue] = useState(0);
    // Używamy hooka useParams do pobrania wartości z dynamicznej ścieżki
    const { id } = useParams<{ id: string}>();

    useEffect(() => {
        if (data.length === 0) {
            listRecipe().then((response) => {
                setData(response);
            });
        }
    }, [data]);

    useEffect(() => {
        // Pobieram informacje o zalogowanym użytkowniku
        listMe().then((user) => {
            // Przypisuje imię i nazwisko do state
            setAuthorName(`${user.firstName} ${user.lastName}`);
        });
    }, []);

    const selectedRecipe = data.find((recipe) => recipe.id === (id ? +id : undefined));

    if (!selectedRecipe) {
        return <div>Recipe not found.</div>;
    }

    const dividerStyle = {
        label: {
            fontSize: "20px",
        },
    };

    return (
        <Paper shadow="xl" withBorder p="sm">
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Group justify={"space-between"}>
                    <Link to={`/recipe`}>
                        <Button color="dark" mt="sm" radius="md">Powrót</Button>
                    </Link>
                    <Button leftSection={<IconHeartPlus size={14} />} color="dark" mt="md" radius="md">
                        Dodaj do ulubionych
                    </Button>
                </Group>
                <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                    {selectedRecipe.title}
                    <Rating value={3.2} fractions={2} readOnly />
                </span>
                    <Paper shadow="xl" radius="md" withBorder p="sm">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeIcon variant="white" size="xl" color="rgba(0, 0, 0, 1)">
                        <IconClockHour2 style={{ width: '100%', height: '100%' }} />
                    </ThemeIcon>
                    <p style={{ marginLeft: '5px' }}>{selectedRecipe.timeToMake} min.</p>
                    <p style={{ marginLeft: '20px' }}></p>
                    <Rating
                        defaultValue={selectedRecipe.difficulty}
                        size="xl"
                        count={3}
                        emptySymbol={<IconCircle />}
                        fullSymbol={<IconCircleFilled />}
                        readOnly
                    />
                </span>
                    </Paper>
                </h2>
                <Divider size="md" label="Opis przepisu" labelPosition="left" styles={dividerStyle} />
                <p>{selectedRecipe.description}</p>
                <Divider size="md" label="Składniki" labelPosition="left" styles={dividerStyle} />
                <p>{selectedRecipe.ingredients}</p>
                <Divider size="md" label="Sposób przygotowania" labelPosition="left" styles={dividerStyle} />
                <p>{selectedRecipe.steps}</p>
                <Divider size="md" labelPosition="left" styles={dividerStyle} />
                <p style={{ textAlign: "right" }}>Dodane przez {authorName}</p>
                <Group>
                    <p>Oceń przepis!</p>
                    <Rating size="lg" value={value} onChange={setValue} />
                </Group>
                    <CommentForm recipeId={selectedRecipe.id}/>
                <CommentList recipeId={selectedRecipe.id} />
            </div>
        </Paper>
    );
};