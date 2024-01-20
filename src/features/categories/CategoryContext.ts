import React, { createContext, Dispatch, SetStateAction } from 'react';

type CategoryContextType = {
    categoryId: number | undefined;
    setCategoryId: Dispatch<SetStateAction<number | undefined>>;
};

export const CategoryContext = createContext<CategoryContextType>({
    categoryId: undefined,
    setCategoryId: () => {}, // Provide a default no-op function
});