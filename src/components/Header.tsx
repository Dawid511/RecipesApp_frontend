import {Link} from "react-router-dom";
import {Avatar, Button, Group} from "@mantine/core";
import {IconHeart, IconPlus} from "@tabler/icons-react";
import React from "react";


export const Header = () => {
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

                    <Button component={Link} to="/recipe" color="dark">
                        Strona gotowania
                    </Button>
                    <Button leftSection={<IconPlus size={16} />}  component={Link} to="/recipe/new" variant="outline" color="dark">
                        Dodaj przepis
                    </Button>
                    <Button component={Link} to="/recipe" variant="outline" color="dark">
                        Moje przepisy
                    </Button>
                    <Button leftSection={<IconHeart size={16} />} component={Link} to="/recipe" variant="outline" color="dark">
                        Polubione
                    </Button>

                </Group>
            </Group>
        </div>
    )
}
