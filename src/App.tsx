import React, {useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import { CategoryContext } from './features/categories/CategoryContext';


const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined)

    return (
        <CategoryContext.Provider value={{ categoryId, setCategoryId }}>
        <MantineProvider theme={theme}>
            <Notifications/>
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </MantineProvider>
        </CategoryContext.Provider>
    );
}

export default App;
