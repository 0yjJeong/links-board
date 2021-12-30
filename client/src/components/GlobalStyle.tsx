import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        border: 0;
        font-size: 100%;
        font-family: "NotoSansKR-Regular"
    }
    body {
        line-height: 1;
    }
    #root {
        height: 100%;
    }
`;
