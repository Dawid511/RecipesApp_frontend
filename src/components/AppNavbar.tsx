import {NavLink} from "@mantine/core";
import {
    IconBaguette,
    IconCandy,
    IconClockHour1,
    IconFishChristianity,
    IconLollipop,
    IconMeat,
    IconMeatOff,
    IconMilkshake,
    IconPepper,
    IconSalt,
    IconSoup,
    IconToolsKitchen2
} from "@tabler/icons-react";
import React, {useContext} from "react";
import {CategoryContext} from "../features/categories/CategoryContext";
import {Link} from "react-router-dom";

export const AppNavbar = () => {
    const { setCategoryId } = useContext(CategoryContext);

    const handleCategorySelect = (id:number) => {
        setCategoryId(id);
    };

    return (<>
            <NavLink
                label="Obiady"
                leftSection={<IconToolsKitchen2 size="1rem" stroke={1.5}/>}
                childrenOffset={28}
            >
                <NavLink
                         label="Danie wegetariańskie"
                         leftSection={<IconMeatOff size="1rem" stroke={1.5}/>}
                         onClick={() => handleCategorySelect(2)}
                />

                <NavLink href="#required-for-focus"
                         label="Ryby"
                         leftSection={<IconFishChristianity size="1rem" stroke={1.5}/>}
                         onClick={() => handleCategorySelect(3)}
                />
                <NavLink
                    href="#required-for-focus"
                    label="Potrawa mięsna"
                    leftSection={<IconMeat size="1rem" stroke={1.5}/>}
                    onClick={() => handleCategorySelect(4)}
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