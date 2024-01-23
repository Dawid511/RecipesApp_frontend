import {Text} from '@mantine/core';
import {IconStar} from "@tabler/icons-react";
import React from "react";

export const Footer = () => {
    return (
        <div style={{ marginTop: 'auto', padding: '12px', textAlign: 'center', background: 'gold' }}>
            <Text fs="italic" fw={700}>
                <IconStar size={18} /> Pyszne Inspiracje by Dawid Grabalski & Patrycja Jabłońska <IconStar size={18} />
            </Text>
        </div>
    );
};
