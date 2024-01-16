import {showNotification} from "@mantine/notifications";

export const recipeErrorNotification = () => {
    showNotification({
        color: 'red',
        title: 'Error',
        message: 'adding recipe failed'
    })
}