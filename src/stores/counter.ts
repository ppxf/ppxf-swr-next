import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"

export interface CountState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCountStore = createWithEqualityFn<CountState>()(
  (set) => ({
    count: 0,
    increment: () =>
      set((state) => ({
        count: state.count + 1,
      })),
    decrement: () =>
      set((state) => ({
        count: state.count - 1,
      })),
    reset: () => set({ count: 0 }),
  }),
  shallow
)
