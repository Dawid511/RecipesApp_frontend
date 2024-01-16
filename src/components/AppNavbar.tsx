import {NavLink} from "@mantine/core";
import {
    IconBaguette, IconCandy,
    IconClockHour1,
    IconFishChristianity, IconLollipop,
    IconMeat,
    IconMeatOff,
    IconMilkshake,
    IconPepper, IconSalt,
    IconSoup, IconToolsKitchen2
} from "@tabler/icons-react";
import React from "react";

export const AppNavbar = () => {
    return (<>
            <NavLink
                href="#required-for-focus"
                label="Obiady"
                leftSection={<IconToolsKitchen2 size="1rem" stroke={1.5}/>}
                childrenOffset={28}
            >
                <NavLink href="#required-for-focus"
                         label="Danie wegetariańskie"
                         leftSection={<IconMeatOff size="1rem" stroke={1.5}/>}
                />
                <NavLink href="#required-for-focus"
                         label="Ryby"
                         leftSection={<IconFishChristianity size="1rem" stroke={1.5}/>}
                />
                <NavLink
                    href="#required-for-focus"
                    label="Potrawa mięsna"
                    leftSection={<IconMeat size="1rem" stroke={1.5}/>}
                />

            </NavLink>
            <NavLink
                href="#required-for-focus"
                label="Zupy"
                leftSection={<IconSoup size="1rem" stroke={1.5}/>}
            />
            <NavLink
                href="#required-for-focus"
                label="Desery"
                leftSection={<IconMilkshake size="1rem" stroke={1.5}/>}
            />

            <NavLink
                href="#required-for-focus"
                label="Pomysł na śniadanie"
                leftSection={<IconBaguette size="1rem" stroke={1.5}/>}
            />
            <NavLink
                href="#required-for-focus"
                label="Szybkie danie"
                leftSection={<IconClockHour1 size="1rem" stroke={1.5}/>}
            />


            <NavLink
                href="#required-for-focus"
                label="Przekąski"
                leftSection={<IconCandy size="1rem" stroke={1.5}/>}
            >
                <NavLink
                    href="#required-for-focus"
                    label="Na ostro"
                    leftSection={<IconPepper size="1rem" stroke={1.5}/>}
                />

                <NavLink
                    href="#required-for-focus"
                    label="Na słono"
                    leftSection={<IconSalt size="1rem" stroke={1.5}/>}
                />
                <NavLink
                    href="#required-for-focus"
                    label="Na słodko"
                    leftSection={<IconLollipop size="1rem" stroke={1.5}/>}
                />
            </NavLink>

        </>
    );
}