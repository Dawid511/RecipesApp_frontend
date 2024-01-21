import React, { useEffect, useState } from "react";
import { listMe } from "../login/api/get-me";
import { UserType } from "../../types/UserType";
import { useCommentForm } from "./hooks/useCommentForm";
import { CommentFormValues } from "../../types/CommentFormValues";
import { createComment } from "./api/create-comment";
import { TextInput, Button, Group, Paper } from "@mantine/core";

interface CommentFormProps {
    recipeId: number;
}

export const CommentForm: React.FC<CommentFormProps> = ({ recipeId }) => {
    const commentForm = useCommentForm();
    const [userData, setUserData] = useState<UserType>();
    useEffect(() => {
        listMe().then((user) => {
            commentForm.setFieldValue("userId", user.id);
        });
    }, []);

    const handleSubmit = async (vals: CommentFormValues) => {
        try {
            commentForm.setFieldValue("recipeId", recipeId);
            await createComment(vals);
        } catch (e) {
            // Handle error
        }
    };

    return (
        <Paper shadow="xs" p="xl">
            <form onSubmit={commentForm.onSubmit(handleSubmit)}>
                <TextInput
                    label="Dodaj komentarz"
                    placeholder="..."
                    {...commentForm.getInputProps("content")}
                />
                <Group justify="flex-end" mt="md">
                    <Button type="submit" color={"dark"}>
                        Dodaj
                    </Button>
                </Group>
            </form>
        </Paper>
    );
};
