import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {RecipeType} from "../../types/RecipeType";
import {listRecipe} from "./api/recipe";
import {ActionIcon, Button, CopyButton, Divider, Group, Paper, Rating, rem, ThemeIcon, Tooltip} from "@mantine/core";
import {
    IconCheck,
    IconCircle,
    IconCircleFilled,
    IconClockHour2,
    IconCopy,
    IconHeart,
    IconHeartPlus
} from "@tabler/icons-react";
import {listMe} from "../login/api/get-me";
import {CommentList} from "../comment/Comment";
import {CommentForm} from "../comment/CommentForm";
import {RatingValue} from "../rating/Rating";
import {RatingForm} from "../rating/RatingForm";
import {createFav} from "../fav/api/create-fav";
import {UserType} from "../../types/UserType";
import {FavType} from "../../types/FavType";

export const RecipeInformation: React.FC = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    const [authorName, setAuthorName] = useState<string>("");
    const [value, setValue] = useState(0);
    // Używamy hooka useParams do pobrania wartości z dynamicznej ścieżki
    const { id } = useParams<{ id: string}>();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleClick = () => {
        // logika usun/dodaj
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
        listMe().then((user: UserType) => {
            const userId = user.id;
            if (userId && id) {
                const fav: FavType = {
                    userId: userId,
                    recipeId: parseInt(id, 10)
                };
                createFav(fav);
            } else {
                console.error('Missing userId or recipeId');
            }
        });
    };

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
                    <Button
                        leftSection={isFavorite ? <IconHeart size={14} /> : <IconHeartPlus size={14} />}
                        color={isFavorite ? "gold" : "dark"}
                        mt="md"
                        radius="md"
                        onClick={handleClick}
                    >
                        {isFavorite ? "Lubisz to!" : "Dodaj do ulubionych"}
                    </Button>
                </Group>
                <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                    {selectedRecipe.title}
                    <RatingValue recipeId={selectedRecipe.id}/>
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
                <Divider size="md" label="Składniki" labelPosition="left" styles={dividerStyle}/>
                <p>{selectedRecipe.ingredients}
                <CopyButton value={selectedRecipe.ingredients} timeout={2000} >
                    {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                            <ActionIcon color={copied ? 'black' : 'gray'} variant="subtle" onClick={copy}>
                                {copied ? (
                                    <IconCheck style={{ width: rem(16) }} />
                                ) : (
                                    <IconCopy style={{ width: rem(16) }} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    )}</CopyButton></p>
                <Divider size="md" label="Sposób przygotowania" labelPosition="left" styles={dividerStyle} />
                <p>{selectedRecipe.steps}
                    <CopyButton value={selectedRecipe.steps} timeout={2000} >
                        {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                <ActionIcon color={copied ? 'black' : 'gray'} variant="subtle" onClick={copy}>
                                    {copied ? (
                                        <IconCheck style={{ width: rem(16) }} />
                                    ) : (
                                        <IconCopy style={{ width: rem(16) }} />
                                    )}
                                </ActionIcon>
                            </Tooltip>
                        )}</CopyButton></p>
                <Divider size="md" labelPosition="left" styles={dividerStyle} />
                <p style={{ textAlign: "right" }}>Dodane przez {authorName}</p>
                <RatingForm/>
                    <CommentForm/>
                <CommentList recipeId={selectedRecipe.id} />
            </div>
        </Paper>
    );
};