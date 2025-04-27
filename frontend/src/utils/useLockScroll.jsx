import { useEffect } from 'react';

function useLockScroll(lock = false) {
    useEffect(() => {
        if (lock) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [lock]);
}

export default useLockScroll;
