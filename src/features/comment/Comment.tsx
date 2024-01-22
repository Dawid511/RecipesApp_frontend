import React, { useState, useEffect } from "react";
import { CommentType } from "../../types/CommentType";
import {listCommentsByRecipeId} from "./api/comment";
import {Avatar, Badge, Paper, Text} from "@mantine/core";
import {listMe} from "../login/api/get-me";
import { format } from 'date-fns';


interface CommentListProps {
    recipeId: number;
}

export const CommentList: React.FC<CommentListProps> = ({ recipeId }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [authorName, setAuthorName] = useState<string>("");
    useEffect(() => {
        // Pobiera komentarze na podstawie id przepisu
        listCommentsByRecipeId(recipeId).then((response) => setComments(response));
    }, [recipeId]);

    useEffect(() => {
        // Pobieram informacje o zalogowanym użytkowniku
        listMe().then((user) => {
            // Przypisuje imię i nazwisko do state
            setAuthorName(`${user.firstName} ${user.lastName}`);
        });
    }, []);

    return (
        <div>
            <h3>Komentarze do przepisu:</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <Paper shadow="xs" radius="sm" p="md" mb="md">
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                <Avatar size={40} radius="sm" alt="Avatar" />
                                <div style={{ marginLeft: "10px" }}>
                                    <Text size="sm">
                                        {authorName}
                                    </Text>
                                    <Badge variant="outline"  color="dark" radius="sm" ml="sm">
                                        {format(new Date(comment.createdAt), "dd.MM.yyyy")}
                                    </Badge>
                                </div>
                            </div>
                            <Text>{comment.content}</Text>
                        </Paper>

                    ))}
                </ul>
            ) : (
                <p>Brak komentarzy do tego przepisu.</p>
            )}
        </div>
    );
};
