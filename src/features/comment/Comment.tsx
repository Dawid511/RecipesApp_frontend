import React, { useState, useEffect } from "react";
import { CommentType } from "../../types/CommentType";
import { listCommentsByRecipeId } from "./api/comment";
import {Avatar, Badge, Button, Group, Paper, Text} from "@mantine/core";
import { listMe } from "../login/api/get-me";
import { format } from 'date-fns';
import {deleteComment} from "./api/delete-comment";

interface CommentListProps {
    recipeId: number;
}

export const CommentList: React.FC<CommentListProps> = ({ recipeId }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [authorName, setAuthorName] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
    useEffect(() => {
        // Pobiera komentarze na podstawie id przepisu
        listCommentsByRecipeId(recipeId).then((response) => setComments(response));
    }, [recipeId]);

    useEffect(() => {
        // Pobieram informacje o zalogowanym użytkowniku
        listMe().then((user) => {
            // Przypisuje imię i nazwisko do state
            setAuthorName(`${user.firstName} ${user.lastName}`);
            // Sprawdza, czy użytkownik jest administratorem
            setIsAdmin(user.isAdmin);
            setLoggedInUserId(user.id);
        });
    }, []);

    const handleDeleteClick = async (id: number, authorId: number) => {
        try {
            // czy zalogowany użytkownik jest autorem komentarza lub czy admin
            if (loggedInUserId === authorId || isAdmin) {
                await deleteComment(id);
                setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
            } else {
                console.error('Error');
            }
        } catch (e) {
            console.error('Error', e);
        }
    };

    return (
        <div>
            <h3>Komentarze do przepisu:</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <Paper shadow="xs" radius="sm" p="md" mb="md" key={comment.id}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                <Avatar size={40} radius="sm" alt="Avatar" />
                                <div style={{ marginLeft: "10px" }}>
                                    <Text size="sm">
                                        {authorName}
                                    </Text>
                                    <Badge variant="outline" color="dark" radius="sm" ml="sm">
                                        {format(new Date(comment.createdAt), "dd.MM.yyyy")}
                                    </Badge>
                                </div>
                            </div>
                            <Group justify={"space-between"}>
                                <Text>{comment.content}</Text>
                                    <Button
                                        disabled={!isAdmin && loggedInUserId !== comment.userId}
                                        onClick={() => handleDeleteClick(comment.id, comment.userId)}
                                        variant={"outline"}
                                        color="black"
                                    >
                                        Delete
                                    </Button>
                            </Group>

                        </Paper>
                    ))}
                </ul>
            ) : (
                <p>Brak komentarzy do tego przepisu.</p>
            )}
        </div>
    );
};
