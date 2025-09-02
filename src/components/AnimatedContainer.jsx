import React from 'react';
import { motion as m } from 'framer-motion';

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, y: -20 }
};

const defaultItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AnimatedContainer = ({
  children,
  className = '',
  variants = defaultVariants,
  itemVariants = defaultItemVariants,
  delay = 0,
  stagger = false,
  hover = false,
  ...props
}) => {
  const containerProps = {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants: {
      ...variants,
      visible: {
        ...variants.visible,
        transition: {
          ...variants.visible.transition,
          delay
        }
      }
    },
    className,
    ...props
  };

  if (hover) {
    containerProps.whileHover = { scale: 1.02, y: -5 };
    containerProps.whileTap = { scale: 0.98 };
  }

  return (
    <m.div {...containerProps}>
      {stagger
        ? React.Children.map(children, (child) =>
            child ? (
              <m.div variants={itemVariants}>{child}</m.div>
            ) : null
          )
        : children}
    </m.div>
  );
};
export default AnimatedContainer;