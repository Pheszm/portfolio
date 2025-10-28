import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';

const TypingWithCursor = ({ phrases, currentIndex, onTypingComplete }) => {
    const [text, setText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    
    // Use refs to avoid closure issues
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);
    const phaseRef = useRef('typing');
    const charIndexRef = useRef(0);
    
    const textProps = useSpring({
        opacity: 1,
        transform: 'translateX(0)',
        config: { duration: 200 },
    });

    const cursorProps = useSpring({
        opacity: cursorVisible ? 1 : 0,
        config: { duration: 500 },
    });

    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setCursorVisible((prev) => !prev);  
        }, 500);
        return () => clearInterval(cursorInterval); 
    }, []);

    // Cleanup function to clear all timers
    const cleanup = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    // Main typing/erasing effect
    useEffect(() => {
        // Reset state for new phrase
        setText('');
        phaseRef.current = 'typing';
        charIndexRef.current = 0;
        cleanup();

        const currentPhrase = phrases[currentIndex] || '';
        
        if (!currentPhrase) return;

        const type = () => {
            if (phaseRef.current === 'typing' && charIndexRef.current < currentPhrase.length) {
                setText(currentPhrase.slice(0, charIndexRef.current + 1));
                charIndexRef.current++;
            } else if (phaseRef.current === 'typing' && charIndexRef.current >= currentPhrase.length) {
                // Finished typing, pause then start erasing
                cleanup();
                timeoutRef.current = setTimeout(() => {
                    phaseRef.current = 'erasing';
                    intervalRef.current = setInterval(erase, 100);
                }, 1000);
            }
        };

        const erase = () => {
            if (phaseRef.current === 'erasing' && charIndexRef.current > 0) {
                charIndexRef.current--;
                setText(currentPhrase.slice(0, charIndexRef.current));
            } else if (phaseRef.current === 'erasing' && charIndexRef.current === 0) {
                // Finished erasing, move to next phrase
                cleanup();
                onTypingComplete();
            }
        };

        // Start typing
        intervalRef.current = setInterval(type, 100);

        // Cleanup on unmount or when dependencies change
        return cleanup;
    }, [currentIndex, phrases, onTypingComplete, cleanup]);

    return (
        <div>
            <animated.span style={textProps}>{text}</animated.span>
            <animated.span style={cursorProps}>|</animated.span>
        </div>
    );
};

export default TypingWithCursor;
