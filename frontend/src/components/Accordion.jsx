import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Accordion({ children, expanded, setExpanded, indexKey }) {
    let isOpen = true;

    return <AnimatePresence initial={false}>{isOpen && children}</AnimatePresence>;
}

export default Accordion;
