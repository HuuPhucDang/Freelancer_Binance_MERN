import React, { useState, cloneElement } from 'react';
import {
  Box,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
} from '@mui/material';

import {
  popperModifiers,
  mainStyles,
  popperStyles,
  contentStyles,
} from './RichTooltip.styles';

interface SectionProps {
  content?: JSX.Element;
  children: JSX.Element;
  open: boolean;
  onClose?: () => void;
  arrow?: boolean;
  placement?: PopperPlacementType;
}

const RichTooltip: React.FC<SectionProps> = (props: SectionProps) => {
  // Declare props
  const {
    placement,
    arrow = true,
    open,
    onClose = () => {},
    content,
    children,
  } = props;
  // Declare dispatch, reducers
  // Declare states
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);
  const [childNode, setChildNode] = useState<Element | null>(null);

  return (
    <div>
      {cloneElement(children, { ...children.props, ref: setChildNode })}
      <Popper
        open={open}
        anchorEl={childNode}
        placement={placement}
        transition
        sx={popperStyles}
        modifiers={popperModifiers({ arrow, arrowRef })}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={onClose}>
                <Paper sx={mainStyles}>
                  {arrow ? <span className='arrow' ref={setArrowRef} /> : null}
                  <Box sx={contentStyles}>{content}</Box>
                </Paper>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default RichTooltip;
