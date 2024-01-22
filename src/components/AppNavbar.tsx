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
                         onClick={() => handleCategorySelect(1)}
                />

                <NavLink
                         label="Ryby"
                         leftSection={<IconFishChristianity size="1rem" stroke={1.5}/>}
                         onClick={() => handleCategorySelect(2)}
                />
                <NavLink
                    label="Potrawa mięsna"
                    leftSection={<IconMeat size="1rem" stroke={1.5}/>}
                    onClick={() => handleCategorySelect(3)}
                />

            </NavLink>
            <NavLink
                label="Zupy"
                leftSection={<IconSoup size="1rem" stroke={1.5}/>}
                onClick={() => handleCategorySelect(4)}
            />
            <NavLink
                label="Desery"
                leftSection={<IconMilkshake size="1rem" stroke={1.5}/>}
                onClick={() => handleCategorySelect(5)}
            />

            <NavLink
                label="Pomysł na śniadanie"
                leftSection={<IconBaguette size="1rem" stroke={1.5}/>}
                onClick={() => handleCategorySelect(6)}

            />
            <NavLink
                label="Szybkie danie"
                leftSection={<IconClockHour1 size="1rem" stroke={1.5}/>}
                onClick={() => handleCategorySelect(7)}

            />


            <NavLink
                label="Przekąski"
                leftSection={<IconCandy size="1rem" stroke={1.5}/>}
            >
                <NavLink
                    label="Na ostro"
                    leftSection={<IconPepper size="1rem" stroke={1.5}/>}
                    onClick={() => handleCategorySelect(8)}

                />

                <NavLink
                    label="Na słono"
                    leftSection={<IconSalt size="1rem" stroke={1.5}/>}
                    onClick={() => handleCategorySelect(9)}

                />
                <NavLink
                    label="Na słodko"
                    leftSection={<IconLollipop size="1rem" stroke={1.5}/>}
                    onClick={() => handleCategorySelect(10)}

                />
            </NavLink>

        </>
    );
}