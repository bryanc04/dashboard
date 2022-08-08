import styled, { css } from "styled-components";


export const PageTransitionGroup = styled.div<{ timeout: number }>`
  position: relative;
  width: 100%;
  padding: 0 15px;
  perspective: 1200px;
  /* overflow: hidden; */

  ${({ timeout = 300 }) => css`
    .scale-enter {
      opacity: 0;
      transform: scale(1.1);
    }

    .scale-enter-active {
      opacity: 1;
      transform: scale(1);
      transition: opacity ${timeout}ms, transform ${timeout}ms;
    }

    .scale-exit {
      opacity: 1;
      transform: scale(1);
    }

    .scale-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity ${timeout}ms, transform ${timeout}ms;
    }
  `}}
`;

export const PageTransitionWrapper = styled.div`
  backface-visibility: hidden;
  /* height: 100%; */
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`;
