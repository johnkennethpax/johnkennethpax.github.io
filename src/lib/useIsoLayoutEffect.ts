import { useEffect, useLayoutEffect } from 'react';

/** useLayoutEffect in the browser (runs before paint), useEffect during pre-rendering. */
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
