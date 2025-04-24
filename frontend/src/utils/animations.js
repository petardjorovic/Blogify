export const fadeInUp = {
    hidden: { opacity: 0, y: -100 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

export const fadeInDown = {
    hidden: { opacity: 0, y: 100 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

export const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: (i = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

export const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: (i = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i = 0) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: 'easeOut',
        },
    }),
};

export const slideHorizontal = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
    },
    exit: {
        opacity: 0,
        x: -100,
        transition: { duration: 0.4 },
    },
};

export const containerStagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const blurSlideIn = {
    hidden: {
        opacity: 0,
        x: 100,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        x: -100,
        filter: 'blur(6px)',
        transition: {
            duration: 0.4,
            ease: 'easeIn',
        },
    },
};
