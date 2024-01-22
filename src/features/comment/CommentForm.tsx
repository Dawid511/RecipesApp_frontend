import React, {useEffect, useState} from "react";
import {listMe} from "../login/api/get-me";
import {UserType} from "../../types/UserType";
import {useCommentForm} from "./hooks/useCommentForm";
import {CommentFormValues} from "../../types/CommentFormValues";
import {createComment} from "./api/create-comment";
import {Button, Group, Paper, TextInput} from "@mantine/core";
import {useNavigate, useParams} from "react-router-dom";

interface CommentFormProps {
    content: string;
    authorId: number;
    recipeId: number;
}

export const CommentForm = () => {
    const commentForm = useCommentForm();
    const [userData, setUserData] = useState<UserType>();
    const { id } = useParams();    // console.log(recipe);
    const navigate = useNavigate();// to mozna poprawic chyba
   // console.log(id);
    useEffect(() => {
        listMe().then((user) => {
            commentForm.setFieldValue('authorId', user.id);
            if (id != null) {
                commentForm.setFieldValue('recipeId', parseInt(id, 10));
            }
        });
    }, []);


    const handleSubmit = async (vals: CommentFormValues) => {

        try {
            await createComment(vals);
            navigate(0);
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
