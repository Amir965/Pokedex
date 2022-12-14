const InitialState = {
    loading: false,
    data: [],
    errorMsg: '',
    count:0
}

const PokemonListReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'POKEMON_LIST_LOADING':
            return {
                ...state,
                loading: true,
                errorMsg:''
            }
        case 'POKEMON_LIST_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.payload.results,
                count: action.payload.count,
                errorMsg:''
            }
        case 'POKEMON_LIST_FAIL':
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                count: action.payload.data,
                errorMsg:'Unable to get Pokemon:('
            }
        default:
            return state
    }
}

export default PokemonListReducer;