import {Link} from "react-router-dom";
import {Button, Group} from "@mantine/core";
import {IconHeart, IconPlus} from "@tabler/icons-react";
import React, {useContext} from "react";
import {CategoryContext} from "../features/categories/CategoryContext";
// const [opened, { open, close }] = useDisclosure(false);
export const Header = () => {
    const { setCategoryId } = useContext(CategoryContext);

    const handleCategorySelect = () => {
        setCategoryId(undefined);
    };

    return (
        <div>
            {/*<Modal opened={opened} onClose={close} title="Authentication">*/}

            {/*</Modal>*/}
            <Group justify="space-between" >
                <Group>
                    <img
                        src={process.env.PUBLIC_URL + "http://localhost:3000/PyszneInspiracje.jpg"}
                        alt="Pyszne Inspiracje Image"
                        style={{
                            marginLeft: "50px",
                            borderRadius: "10px",
                            height: "120px",
                            width: "auto",
                        }}
                    />

                    <Button onClick={handleCategorySelect} component={Link} to="/recipe" color="dark">
                        Strona gotowania
                    </Button>
                    <Button data-cy="recipeAdd" leftSection={<IconPlus size={16} />} component={Link} to="/recipe/new" variant="outline" color="dark">
                        Dodaj przepis
                    </Button>
                    <Button component={Link} to="/recipe/me" variant="outline" color="dark">
                        Moje przepisy
                    </Button>
                    <Button component={Link} to="/recipe/fav" leftSection={<IconHeart size={16} />} variant="outline" color="dark">
                        Polubione
                    </Button>
                    {/*<Button onClick={open}>Open modal</Button>*/}
                </Group>
            </Group>
        </div>

    )
}