import { useLayoutEffect, useState } from 'react';

function useWindowScroll() {
    const [position, setPosition] = useState({
        x: window.scrollX,
        y: window.scrollY,
    });

    const checkPosition = () => {
        setPosition({
            x: window.scrollX,
            y: window.scrollY,
        });
    };

    useLayoutEffect(() => {
        window.addEventListener('scroll', checkPosition);

        return () => {
            window.removeEventListener('scroll', checkPosition);
        };
    }, []);

    return [position.x, position.y];
}

export default useWindowScroll;
