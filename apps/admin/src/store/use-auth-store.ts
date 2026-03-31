import { create } from 'zustand'

interface AuthState {
  user: any | null
  setUser: (user: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: null })

    // if (
    //   typeof window !== 'undefined' &&
    //   window.location.pathname !== '/login'
    // ) {
    //   window.location.href = '/login'
    // }
  },
}))
