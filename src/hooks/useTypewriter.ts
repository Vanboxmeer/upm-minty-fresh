import { useState, useEffect, useRef } from 'react';

interface UseTypewriterProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
}

export const useTypewriter = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
}: UseTypewriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize the typewriter effect
  useEffect(() => {
    if (words.length > 0 && !isInitialized) {
      setIsInitialized(true);
      // Start typing the first word immediately
      const startTyping = () => {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(words[0].substring(0, 1));
        }, 500); // Small delay before starting
      };
      startTyping();
    }
  }, [words, isInitialized]);

  useEffect(() => {
    if (!isInitialized || words.length === 0) return;

    const type = () => {
      const currentWord = words[currentWordIndex];
      
      if (!currentWord) return;

      if (isPaused) {
        return;
      }

      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Word is complete, pause before deleting
          setIsPaused(true);
          pauseTimeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            setIsPaused(false);
          }, delayBetweenWords);
          return;
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Deletion complete, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    };

    if (!isPaused && currentText !== '' || (currentText === '' && !isDeleting)) {
      timeoutRef.current = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, typeSpeed, deleteSpeed, delayBetweenWords, isInitialized]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return currentText || (words.length > 0 ? '' : '');
};