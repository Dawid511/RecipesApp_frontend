import {Link} from "react-router-dom";
import {Avatar, Button, Group, NavLink, Portal} from "@mantine/core";
import {RecipeList} from "../features/recipe/RecipeList";

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

                    <Link
                        to="/recipe"
                        style={{color: "black", fontWeight: "bold"}}
                    >
                        Strona gotowania
                    </Link>
                    <Button component={Link} to="/recipe/new" variant="outline" color="dark">
                        Dodaj przepis
                    </Button>


                </Group>
            </Group>
        </div>
    )
}
