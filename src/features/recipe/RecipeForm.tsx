import {Button, Combobox, Group, Paper, Stack, Textarea, TextInput} from "@mantine/core"
import {useForm} from "@mantine/form";
import {RecipeFormValues} from "../../types/RecipeFormValues";
import {useRecipeForm} from "./hooks/useRecipeForm";

export const RecipeForm = () => {
    const form = useRecipeForm();

    const handleSubmit = (vals: RecipeFormValues) => {
        console.log(vals);
    }
    return (
        <Paper shadow="xs" p="xl">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack
                    h={300}
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
                        label="Opis"
                        description="Dodaj niezbędne informacje o składnikach i sposobie przygotowania"
                        placeholder="Opis"
                        {...form.getInputProps('content')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit" color={"dark"}> Dodaj przepis </Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    )
}

