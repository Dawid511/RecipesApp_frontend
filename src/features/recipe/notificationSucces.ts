import {showNotification} from "@mantine/notifications";

export const recipeSuccessNotification = () => {
    showNotification({
        color: 'green',
        title: 'Success',
        message: 'Recipe has been added'
    })
}