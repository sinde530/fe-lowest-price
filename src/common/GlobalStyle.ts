// src/common/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
    }

    body {
        box-sizing: border-box;
    }
`;
