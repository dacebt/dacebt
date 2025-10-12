import { create } from 'zustand'

export type Page = 'home' | 'projects' | 'experiments' | 'about' | 'contact'

interface NavigationState {
  currentPage: Page
  navigate: (page: Page) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: 'home',
  navigate: (page) => set({ currentPage: page }),
}))
