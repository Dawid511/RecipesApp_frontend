import {NavLink} from "@mantine/core";
import {IconCup} from "@tabler/icons-react";

export const AppNavbar = () => {
    return (
        <div>
            <NavLink
                href="/recipe/new"
                label="With icon"
                leftSection={<IconCup size="1rem" stroke={1.5}/>}
            />
            <NavLink
                href="/recipe"
                label="With icon"
                leftSection={<IconCup size="1rem" stroke={1.5}/>}
            />
        </div>
    )
}