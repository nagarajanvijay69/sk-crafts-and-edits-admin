import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface product {
     _id : String,
     name: String,
     category: String,
     price: Number,
     offerPrice: Number,
     image: String[],
     link: String,
     discription : String
}
interface category {
     name: String,
     image: String,
}

interface state {
     products : product[],
     categorys : category[],
     message : String,
     login : boolean
}

const initialState: state = {
     products : [],
     categorys : [],
     message : '',
     login : false
};


const Slice = createSlice({
     name: "Products",
     initialState,
     reducers: {
          initProduct(state, action: PayloadAction<product[]>) {
               state.products = action.payload;
          },
          initCategory(state, action: PayloadAction<category[]>) {
               state.categorys = action.payload;
          }, 
          initMessage(state, action:PayloadAction<String>) {
               state.message = action.payload;
          },
          setLogin(state) {
               state.login = true;
          },
          setLogout(state) {
               state.login = false;
          }
     }
});


export const { initProduct, initCategory, initMessage, setLogin, setLogout} = Slice.actions;
export default Slice.reducer;