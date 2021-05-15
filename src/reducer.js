export const initialState = {
    basket: [],
    user: null,
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case 'REMOVE_FROM_BASKET':
            // finds the first one item in the basket. which matches basketItem.id = to the passed item id in the dispatch in CHeckout
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            let newBasket = [...state.basket];

            if(index >= 0) {
                // take the new basket, and delete the first one, wheere the index was found
                newBasket.splice(index, 1)
            } else {
                console.warn(`Cant remove the product (id: ${action.id}) as it is not in the basket!`)
            }
            return {
                ...state,
                basket: newBasket,
                // {/*🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 Wrong*/} DO NOT USE THIS ONE
                // basket: state.basket.filter(item => item.id !== action.id ) this returns just the items, which id's does not look the same
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            }

        default:
            return state;

    }
};

export default reducer;

