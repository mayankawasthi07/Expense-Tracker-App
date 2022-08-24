import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCardState = {
    items:[],
    totalAmount:0
}

const cartReducer = (state, action) =>{
    if(action.type === 'ADD'){
        const existingCartItemsIndex = state.items.findIndex((item)=>item.id === action.item.id)
        const existingCartItems = state.items[existingCartItemsIndex];
        let updatedItems;
        if(existingCartItems){
            const updatedItem = {
                ...existingCartItems,
                amount :existingCartItems.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemsIndex] = updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }
        const updateTotalAmount = state.totalAmount + action.item.price*action.item.amount;
        return{
            items: updatedItems,
            totalAmount: updateTotalAmount
        }
    }
    if(action.type === 'REMOVE'){
        const existingCartItemsIndex = state.items.findIndex((item) => item.id === action.id)    
        const existingItem = state.items[existingCartItemsIndex];
        const updateTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1)
        {
            updatedItems = state.items.filter(item => item.id !== action.id)
        }else{
            const updatedItem = {...existingItem,amount:existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemsIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updateTotalAmount
        }
    }
    return defaultCardState;
}

const CartProvider = (props) =>{
    const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCardState);

    const addItemHandler = (item) => {
        dispatchCartAction({type:'ADD', item:item})
    }

    const removeItemHandler = (id) => {
        dispatchCartAction({type:'REMOVE', id:id})
    }

    const cartContext = {
        items : cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }   
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>  


}

export default CartProvider