import {Link} from "react-router-dom";
import {Button, Group, Paper} from "@mantine/core";
import {IconHeart, IconPlus} from "@tabler/icons-react";
import React, {useContext} from "react";
import {CategoryContext} from "../features/categories/CategoryContext";


export const Header = () => {
    const { setCategoryId } = useContext(CategoryContext);

    const handleCategorySelect = () => {
        setCategoryId(undefined);
    };

    return (
        <div>
            <Group justify="space-between">
                <Group>
                    <img
                        src={process.env.PUBLIC_URL + "PyszneInspiracje.jpg"}
                        alt="Pyszne Inspiracje Image"
                        style={{
                            borderRadius: "10px",
                            height: "120px",
                            width: "auto",
                        }}
                    />

                    <Button onClick={handleCategorySelect} component={Link} to="/recipe" color="dark">
                        Strona gotowania
                    </Button>
                    <Button leftSection={<IconPlus size={16} />}  component={Link} to="/recipe/new" variant="outline" color="dark">
                        Dodaj przepis
                    </Button>
                    <Button component={Link} to="/recipe/me" variant="outline" color="dark">
                        Moje przepisy
                    </Button>
                    <Button component={Link} to="/recipe/fav" leftSection={<IconHeart size={16} />} variant="outline" color="dark">
                        Polubione
                    </Button>

                </Group>
            </Group>
        </div>

    )
}
