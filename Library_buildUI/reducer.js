const init = {
    cars: ['BMW', 'WDG']
}
export default function reducer(state = init, action, args) {
    switch (action) {
        case 'ADD':
            // const [newCar] = args
            // return {
            //     ...state,
            //     cars: [...state.cars, newCar]
            // }
            const [newCar] = args
            return {
                ...state,
                cars: [...state.cars, newCar]
            }
            break;
        default:
            return state
    }
}