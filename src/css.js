/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from '@emotion/react';
import partyBackground from '../src/img/partyBackground.png';

export const mainBody = css`
  width: 500px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  padding: 20px;
  margin-top: 100px;

  &:hover {
    width: 520px;
    background: linear-gradient(140deg, red, purple, purple);
    box-shadow: rgba(240, 46, 170, 0.4) -5px 5px,
      rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px,
      rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;
    // Size can also be negative; see how it's smaller than the element
  }
`;
export const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  body {
    background-image: url(${partyBackground});
    margin: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    text-align: center;
    justify-content: center;
    color: white;
  }
`;
export const inputCss = css`
  border-radius: 5px;
  margin: 0 5px 10px;
`;

export const buttonStyle = css`
  border-radius: 5px;
  margin: 0 5px 10px;
`;
export const tickStyle = css`
  margin: 0 50px 0 20px;
`;
