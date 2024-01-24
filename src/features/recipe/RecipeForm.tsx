import {Button, Group, Paper, Stack, Textarea, TextInput, Notification, MultiSelect, NumberInput} from "@mantine/core";
import { RecipeFormValues } from "../../types/RecipeFormValues";
import { useRecipeForm } from "./hooks/useRecipeForm";
import { createRecipe } from "./api/create-recipe";
import React, { useEffect, useState } from "react";
import { listCategories } from "../categories/api/get-categories";
import { CategoryType } from "../../types/CategoryType";
import { UserType } from "../../types/UserType";
import { listMe } from "../login/api/get-me";

interface SelectItem {
    value: string;
    label: string;
}


export const RecipeForm = () => {
    const [data2, setData2] = useState<UserType[]>([]);
    const form = useRecipeForm();
    const [data, setData] = useState<SelectItem[]>([]);
    const [successNotification, setSuccessNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState(false);

    useEffect(() => {
        listCategories().then((response: CategoryType[]) => {
            const formattedCategories: SelectItem[] = response.map(category => ({
                value: category.id.toString(),
                label: category.name
            }));
            setData(formattedCategories);
        });
    }, []);

    useEffect(() => {
        listMe().then((user) => {
            form.setFieldValue('authorId', user.id);
        });
    }, []);

    const handleSubmit = async (vals: RecipeFormValues) => {
        try {
            await createRecipe(vals);
            setSuccessNotification(true);
        } catch (e) {
            setErrorNotification(true);
        }
    }
    const handleNotificationClose = () => {
        setErrorNotification(false);
        setSuccessNotification(false);
    };
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

                    <MultiSelect
                        label="Kategorie przepisu"
                        placeholder="Pick value"
                        data={data}
                        clearable
                        onChange={(selectedValues) => {
                            // Convert the string values back to numbers and update the form state
                            const categoryIds = selectedValues.map((value) => parseInt(value, 10));
                            form.setFieldValue('categoryIds', categoryIds);
                        }}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" color={"dark"}> Dodaj przepis </Button> </Group>
                </Stack>
            </form>
            {successNotification && (
                <Notification color="green" title="Sukces" onClose={handleNotificationClose} >
                    Dodano przepis poprawnie
                </Notification>
            )}
            {errorNotification && (
                <Notification color="red" title="Error" onClose={handleNotificationClose} >
                    Dodawanie przepisu nie powiodło się
                </Notification>
            )}
        </Paper>
    );
}
