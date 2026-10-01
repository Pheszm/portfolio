import { useState, useEffect, useMemo, useRef } from 'react';

const TYPE_MS = 115; // per character while typing
const ERASE_MS = 55; // per character while erasing (erasing reads faster than typing)
const HOLD_MS = 2000; // pause on a finished phrase
const GAP_MS = 500; // blank pause before the next phrase starts

const TypingWithCursor = ({ phrases = [], currentIndex = 0, onTypingComplete }) => {
  const phrase = phrases[currentIndex] ?? '';
  const [text, setText] = useState('');

  // The longest phrase reserves the line's width and height up front, so the
  // characters appearing and disappearing never reflow anything around them.
  const longest = useMemo(
    () => phrases.reduce((a, b) => (b.length > a.length ? b : a), ''),
    [phrases]
  );

  // Hold the callback in a ref so an inline arrow from the parent can't become an
  // effect dependency. That was restarting the animation on every parent render.
  const completeRef = useRef(onTypingComplete);
  useEffect(() => {
    completeRef.current = onTypingComplete;
  }, [onTypingComplete]);

  useEffect(() => {
    if (!phrase) {
      setText('');
      return undefined;
    }

    // Only one timer is ever pending, so a single handle is enough to clean up.
    let timer = null;
    let cancelled = false;
    let i = 0;

    const schedule = (fn, ms) => {
      timer = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show the whole phrase and still cycle, just without the character animation.
      setText(phrase);
      schedule(() => completeRef.current?.(), HOLD_MS * 2);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    const type = () => {
      i += 1;
      setText(phrase.slice(0, i));
      schedule(i < phrase.length ? type : erase, i < phrase.length ? TYPE_MS : HOLD_MS);
    };

    const erase = () => {
      i -= 1;
      setText(phrase.slice(0, i));
      if (i > 0) schedule(erase, ERASE_MS);
      else schedule(() => completeRef.current?.(), GAP_MS);
    };

    setText('');
    schedule(type, GAP_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // Keyed on the phrase itself, not on the `phrases` array identity, so a parent
    // re-render that rebuilds the array no longer interrupts the current phrase.
  }, [phrase, currentIndex]);

  return (
    <span className="wrap">
      {/* Invisible sizer: holds the box open at the longest phrase, cursor included. */}
      <span aria-hidden="true" className="sizer">
        {longest}|
      </span>

      {/* The visible effect is decorative; screen readers get the plain phrase below. */}
      <span aria-hidden="true" className="typed">
        {text}
        <span className="cursor">|</span>
      </span>

      <span className="sr-only">{phrase}</span>

      <style jsx>{`
        .wrap {
          position: relative;
          display: inline-block;
          white-space: pre;
          vertical-align: bottom;
        }

        .sizer {
          visibility: hidden;
        }

        .typed {
          position: absolute;
          left: 0;
          top: 0;
          white-space: pre;
        }

        .cursor {
          margin-left: 1px;
          animation: blink 1.1s steps(1, end) infinite;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          50.01%,
          100% {
            opacity: 0;
          }
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .cursor {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
};

export default TypingWithCursor;
