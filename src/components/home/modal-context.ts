'use client';
import { createContext, useContext } from 'react';
import type { Project } from './ProjectModal';

export const ModalContext = createContext<{ openProject: (p: Project) => void; openContact: () => void }>({
  openProject: () => {},
  openContact: () => {},
});

export function useModal() {
  return useContext(ModalContext);
}
