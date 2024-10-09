import { create } from "zustand";

interface counterStore {
  counter: number;
  increaseCounter: () => void;
  decreaseCounter: () => void;
  resetCounter: () => void;
  customCounter: (value: number) => void;
  setCounter: (value: number) => void;
}

export const useCounterStore = create<counterStore>((set) => ({
  counter: 0,
  increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
  decreaseCounter: () => set((state) => ({ counter: state.counter - 1 })),
  resetCounter: () => set({ counter: 0 }),
  // si aspetta un parametro quindi serve il trick
  customCounter: (number: number) =>
    set((state) => ({ counter: state.counter + number })),
  setCounter: (number: number) => set({ counter: number }),
}));
