import { createContext } from "react";

const OrderContext = createContext();

const OrderProvider = ({children}) =>{
    return (
        <OrderContext.Provider>
            {children}
        </OrderContext.Provider>
    )
}

export {OrderContext}
export default OrderProvider;