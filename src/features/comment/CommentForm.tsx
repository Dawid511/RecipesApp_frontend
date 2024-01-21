import {useEffect, useState} from "react";
import {listMe} from "../login/api/get-me";
import {UserType} from "../../types/UserType";
import {useCommentForm} from "./hooks/useCommentForm";
import {CommentFormValues} from "../../types/CommentFormValues";
import {Button, Group} from "@mantine/core/lib";
import {createComment} from "./api/create-comment";

export const CommentForm = () => {
    const [data2 , setData2] = useState<UserType[]>([]);
    const commentForm = useCommentForm();

let [userData, setUserData] = useState<UserType>();
useEffect(() => {
    listMe().then((user) => {
        // Assuming listMe returns a single user object
        commentForm.setFieldValue('authorId', user.id);
    });
}, []);

    const handleSubmit = async (vals: CommentFormValues) => {
        try {
            await createComment(vals);
        } catch (e) {
        }
    }
    return (
        <form onSubmit={commentForm.onSubmit(handleSubmit)}>
            <Group justify="flex-end" mt="md">
                <Button type="submit" color={"dark"}> Dodaj komentarz </Button>
            </Group>
        </form>
    )
}