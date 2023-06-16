import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type CartItem = {
  id: string;
  name: string;
  details: string;
  description: string;
  imagesURL: string[];
  price: number;
  discount?: number;
  quantity: number;
  cartQuantity: number
  slug: {
    current: string;
  }; 
}

type CartState = {
  isOpen: boolean,
  cart: CartItem[],
  onCheckout: string,
  toggleCart: () => void
  clearCart: () => void
  addProduct: (item: ProductType) => void
  removeProduct: (item: ProductType) => void
  setCheckout: (val: string) => void
}

export const userCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      onCheckout: 'cart',
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
        if(existingItem){
          const updatedCart = state.cart.map((cartItem) => {
            if(cartItem.id === item.id){
              return {...cartItem, cartQuantity: cartItem.cartQuantity + 1}
            }
            return cartItem
          })
          return {cart: updatedCart}
        } else {
          return {cart: [...state.cart, {...item, cartQuantity: 1}]}
        }
      }),
      removeProduct: (item) => set((state) => {
        //check if the item exists and remove quantity -1
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id)
        if(existingItem && existingItem.cartQuantity > 1){
          const updatedCart = state.cart.map((cartItem) => {
            if(cartItem.id === item.id){
              return {...cartItem, cartQuantity: cartItem.cartQuantity - 1}
            }
            return cartItem
          })
          return {cart: updatedCart}
        } else {
          //remove item from cart
          const filteredCart = state.cart.filter((cartItem) => cartItem.id !== item.id)
          return {cart: filteredCart}
        }
      }),
      setCheckout: (val) => set((state) => ({onCheckout: val})),
      clearCart: () => set((state) => ({cart: []})),
    }), 
    { name: "cart-store" }
  )
)

type FavStateType = {
  favList: ProductType[],
  toggleProduct: (item: ProductType) => void
  clearList: () => void
}

export const userFavStore = create<FavStateType>()(
  persist(
    (set) => ({
      favList: [],
      toggleProduct: (item) => set((state) => {
        const existingItem = state.favList.find(favItem => favItem.id === item.id)
        if(existingItem){
          return {favList: state.favList.filter(favItem => favItem.id !== item.id)}
        } else {
          return {favList: [...state.favList, item]}
        }
      }),
      clearList() {
        set((state) => ({favList: []}))
      },
    }),
    {name: 'fav-store'}
  )
)