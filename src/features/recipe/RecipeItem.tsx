import {Card, Group, Image, Button, Text, Title} from "@mantine/core";
import React, {FC, memo} from "react";
import {RecipeType} from "../../types/RecipeType";
import {Link} from "react-router-dom";

interface RecipeItemProps {
    item: RecipeType;
}

export const RecipeItem: FC<RecipeItemProps> = memo(({item}) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    radius="md"
                    //src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                    //src={"./image-from-rawpixel-id-13021870-original.png"}
                    src={"./image-from-rawpixel-id-449412-jpeg.jpg"}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Title order={6}>{item.title}</Title>
            </Group>

            <Button component={Link} to={`/recipe/${item.id}`} color="dark" fullWidth mt="md" radius="md">
                <Text fw={500}>Sprawdź przepis</Text>
            </Button>
        </Card>
    );
});
