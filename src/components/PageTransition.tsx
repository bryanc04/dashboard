import React, { ReactNode } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  PageTransitionGroup,
  PageTransitionWrapper
} from "./PageTransitionStyles";

type PageTransitionProps = {
  transitionKey: string;
  children: ReactNode;
};

const PageTransition = ({ transitionKey, children }: PageTransitionProps) => {
  const timeout = 300;
  const classNames = "scale";
  return (
    <PageTransitionGroup timeout={timeout}>
      <TransitionGroup
        className="container"
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames,
            timeout
          })
        }
      >
        <CSSTransition key={transitionKey} timeout={timeout} unmountOnExit>
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </CSSTransition>
      </TransitionGroup>
    </PageTransitionGroup>
  );
};

export default PageTransition;
