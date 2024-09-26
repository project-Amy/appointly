import { create } from 'zustand'


interface counterStore {
    counter: number;
    increaseCounter: () => void;
    decreaseCounter: () => void;
    resetCounter: () => void, 
    customCounter: (value: number) => void;
    setCounter: (value: number) => void
}

export const useCounterStore = create<counterStore>((set) => ({
    counter: 0,
    increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
    decreaseCounter: () => set((state) => ({ counter: state.counter - 1 })),
    resetCounter: () => set({ counter: 0 }),
    // si aspetta un parametro quindi serve il trick 
    customCounter: (number: number) => set((state) => ({ counter: state.counter + number })),
    setCounter: (number: number) => set({ counter: number })
}))


// function somma(num1: number, num2: number): number {
//     const somma = num1 + num2
//     return somma
// }


// pages:
// const counter = useCounterStore((state) => state.counter)
// const { counter, increaseCounter, resetCounter, decreaseCounter, customUpgrade } = useCounterStore()

//  <button onClick={decreaseCounter}>-</button>
//  <button onClick={resetCounter}>Reset</button>
//  <button onClick={() => customUpgrade(3)}> test num</button> 