import {Button, Group, MultiSelect, NumberInput, Paper, Stack, Textarea, TextInput} from "@mantine/core"
import {RecipeFormValues} from "../../types/RecipeFormValues";
import {useRecipeForm} from "./hooks/useRecipeForm";
import {createRecipe} from "./api/create-recipe";
import {recipeErrorNotification} from "./notification";
import {recipeSuccessNotification} from "./notificationSucces";
import {useEffect, useState} from "react";
import {listRecipe} from "./api/recipe";
import {RecipeType} from "../../types/RecipeType";

export const RecipeForm = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    const form = useRecipeForm();

    useEffect(() => {
        listRecipe().then((response) => setData(response));
    }, [])


    const handleSubmit = async (vals: RecipeFormValues) => {
        try {
            await createRecipe(vals);
            recipeSuccessNotification()
        } catch (e) {
            recipeErrorNotification();
        }
    }

    return (
        <Paper shadow="xs" p="xl">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack
                    h="auto"
                    bg="var(--mantine-color-body)"
                    gap="sm"
                >
                    <TextInput
                        label="Nazwa przepisu"
                        description="Dodaj nazwę przepisu, aby inni mogli go wyszukać"
                        placeholder="Nazwa przepisu"
                        {...form.getInputProps('title')}
                    />

                    <Textarea
                        label="Opis przepisu"
                        description="Opisz przepis"
                        placeholder="Opis"
                        {...form.getInputProps('description')}
                    />

                    <Textarea
                        label="Składniki"
                        description="Wypisz niezbedne skladniki"
                        placeholder="Skladniki"
                        {...form.getInputProps('ingredients')}
                    />

                    <Textarea
                        label="Sposób przygotowania"
                        description="Dodaj kolejne kroki przygotowania potrawy"
                        placeholder="steps"
                        {...form.getInputProps('steps')}
                    />

                    <NumberInput
                        label="Trudnosc wykonania"
                        placeholder="Wybierz od 1 - najlatwiejszy do 3 - najciezszy"
                        min={1}
                        max={3}
                        {...form.getInputProps('difficulty')}
                    />

                    <NumberInput
                        label="Czas przygotowania"
                        description="Podaj czas przygotowania potrawy w minutach"
                        placeholder=""
                        {...form.getInputProps('timeToMake')}
                    />

                    <NumberInput
                        label="ID autora"
                        description="Input description"
                        placeholder="Input placeholder"
                        {...form.getInputProps('authorId')}
                    />

                    <MultiSelect
                        label="Your favorite libraries"
                        placeholder="Pick value"
                        data={['Danie wegetariańskie']} // dokonczyc
                        defaultValue={['React']}
                        clearable
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit" color={"dark"}> Dodaj przepis </Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    )
}

