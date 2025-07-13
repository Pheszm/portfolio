import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const TypingWithCursor = ({ phrases, currentIndex, onTypingComplete }) => {
    const [text, setText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    const [isTyping, setIsTyping] = useState(true); // Typing state
    
    const textProps = useSpring({
        opacity: 1,
        transform: 'translateX(0)',
        config: { duration: 200 },
    });

    const cursorProps = useSpring({
        opacity: cursorVisible ? 1 : 0,
        config: { duration: 500 },
    });

    useEffect(() => {
        const cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);  
        }, 500);
        return () => clearInterval(cursorInterval); 
    }, []);

    useEffect(() => {
        let interval;
        let currentText = '';
        let charIndex = 0;
        let phase = 'typing'; 

        const type = () => {
        if (phase === 'typing' && charIndex < phrases[currentIndex].length) {
            currentText += phrases[currentIndex][charIndex];
            setText(currentText);
            charIndex++;
        } else if (phase === 'typing' && charIndex >= phrases[currentIndex].length) {
            clearInterval(interval);
            setTimeout(() => {
            phase = 'erasing'; 
            interval = setInterval(erase, 100); 
            }, 1000); 
        }
        };

        const erase = () => {
        if (phase === 'erasing' && charIndex > 0) {
            currentText = currentText.slice(0, -1);
            setText(currentText);
            charIndex--;
        } else if (phase === 'erasing' && charIndex === 0) {
            clearInterval(interval);
            onTypingComplete();
        }
        };

        interval = setInterval(type, 100); 

        return () => clearInterval(interval); 
    }, [currentIndex, phrases, onTypingComplete]);

    useEffect(() => {
        setText('');
        setIsTyping(true); 
    }, [currentIndex]);

    return (
        <div>
            <animated.span style={textProps}>{text}</animated.span>
            <animated.span style={cursorProps}>|</animated.span>
        </div>
    );
};

export default TypingWithCursor;
