import React, { useState, useEffect } from "react";
import { CommentType } from "../../types/CommentType";
import {listCommentsByRecipeId} from "./api/comment";

interface CommentListProps {
    recipeId: number;
}

export const CommentList: React.FC<CommentListProps> = ({ recipeId }) => {
    const [comments, setComments] = useState<CommentType[]>([]);

    useEffect(() => {
        // Pobiera komentarze na podstawie id przepisu
        listCommentsByRecipeId(recipeId).then((response) => setComments(response));
    }, [recipeId]);

    return (
        <div>
            <h3>Komentarze do przepisu</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak komentarzy do tego przepisu.</p>
            )}
        </div>
    );
};
