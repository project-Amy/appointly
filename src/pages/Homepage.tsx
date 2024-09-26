import { useCounterStore } from "../stores/useCounterStore"


export default function Homepage() {

    const { counter, increaseCounter, decreaseCounter, resetCounter, customCounter, setCounter } = useCounterStore()

    return (
        <>
            <div>
                Counter: {counter}
            </div>
            <div className="flex gap-5">
                <button onClick={increaseCounter}>+</button>
                <button onClick={decreaseCounter}>-</button>
                <button onClick={resetCounter}>Reset</button>
                <button onClick={() => customCounter(4)}> +4</button>
                <button onClick={() => setCounter(3)}> to 3 </button>
            </div>
        </>
    )
}
