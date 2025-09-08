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
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const animate = () => {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting) {
        // Typing phase
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
          timeoutRef.current = setTimeout(animate, typeSpeed);
        } else {
          // Finished typing, wait then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            animate();
          }, delayBetweenWords);
        }
      } else {
        // Deleting phase
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
          timeoutRef.current = setTimeout(animate, deleteSpeed);
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          timeoutRef.current = setTimeout(animate, typeSpeed);
        }
      }
    };

    // Start the animation
    timeoutRef.current = setTimeout(animate, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentWordIndex, currentText, isDeleting, words, typeSpeed, deleteSpeed, delayBetweenWords]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return currentText;
};