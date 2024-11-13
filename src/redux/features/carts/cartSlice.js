import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'


const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            // checking if item exists in the cart
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push(action.payload)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your book has been added",
                    showConfirmButton: false,
                    timer: 1500
                });
                // alert("Items added successfully")
            }
            else {
                // Swal.fire({
                //     position: "top-end",
                //     icon: "error",
                //     title: "This book already exists in your cart",
                //     showConfirmButton: false,
                //     timer: 1500
                // });
                Swal.fire({
                    title: "Sorry!",
                    text: "This book already exists in your cart",
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Okay"
                })
                // alert("Item already exists!")
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        // clear cart requires only a state to set it to an empty array 
        clearCart: (state) => {
            state.cartItems = []
        }
    }
}) 



// exporting the actions
export const { addToCart,removeFromCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;



