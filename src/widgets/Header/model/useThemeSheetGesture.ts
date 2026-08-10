import { useCallback, useEffect, useRef, useState } from 'react';

const OPEN_EDGE_SIZE = 36;
const OPEN_DISTANCE = 56;
const CLOSE_DISTANCE = 64;
const CLOSE_DURATION = 220;

interface UseThemeSheetGestureParams {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface GestureState {
  mode: 'open' | 'close';
  pointerId: number;
  startY: number;
}

export function useThemeSheetGesture({
  isOpen,
  onOpen,
  onClose,
}: UseThemeSheetGestureParams) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const gestureRef = useRef<GestureState | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openSheet = useCallback(() => {
    clearCloseTimer();
    setDragOffset(0);
    setIsDragging(false);
    setIsClosing(false);
    onOpen();
  }, [clearCloseTimer, onOpen]);

  const closeSheet = useCallback(() => {
    if (!isOpen || isClosing) {
      return;
    }

    clearCloseTimer();
    setIsDragging(false);
    setIsClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      onClose();
      setDragOffset(0);
      setIsClosing(false);
      closeTimerRef.current = null;
    }, CLOSE_DURATION);
  }, [clearCloseTimer, isClosing, isOpen, onClose]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 768px)').matches) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) {
        return;
      }

      const viewport = window.visualViewport;
      const viewportBottom =
        (viewport?.offsetTop ?? 0) + (viewport?.height ?? window.innerHeight);
      const target = event.target;

      if (
        isOpen &&
        target instanceof Element &&
        target.closest('.header-theme-menu')
      ) {
        gestureRef.current = {
          mode: 'close',
          pointerId: event.pointerId,
          startY: event.clientY,
        };
        setIsDragging(true);
        return;
      }

      if (!isOpen && event.clientY >= viewportBottom - OPEN_EDGE_SIZE) {
        gestureRef.current = {
          mode: 'open',
          pointerId: event.pointerId,
          startY: event.clientY,
        };
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const gesture = gestureRef.current;

      if (!gesture || gesture.pointerId !== event.pointerId) {
        return;
      }

      const distance = event.clientY - gesture.startY;

      if (gesture.mode === 'close') {
        setDragOffset(Math.max(0, distance));
      } else if (distance <= -OPEN_DISTANCE) {
        gestureRef.current = null;
        openSheet();
      }
    };

    const handlePointerEnd = (event: PointerEvent) => {
      const gesture = gestureRef.current;

      if (!gesture || gesture.pointerId !== event.pointerId) {
        return;
      }

      gestureRef.current = null;

      if (gesture.mode !== 'close') {
        return;
      }

      if (event.clientY - gesture.startY >= CLOSE_DISTANCE) {
        closeSheet();
        return;
      }

      setIsDragging(false);
      setDragOffset(0);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerEnd);
    document.addEventListener('pointercancel', handlePointerEnd);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerEnd);
      document.removeEventListener('pointercancel', handlePointerEnd);
    };
  }, [closeSheet, isOpen, openSheet]);

  return {
    dragOffset,
    isClosing,
    isDragging,
    closeSheet,
    openSheet,
  };
}
