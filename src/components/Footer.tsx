import {Text} from '@mantine/core';

export const Footer = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', minHeight: '100vh'}}>
            <Text fs="italic" fw={700}>
                Pyszne Inspiracje by Dawid Grabalski & Patrycja Jabłońska
            </Text>
        </div>
    );
};