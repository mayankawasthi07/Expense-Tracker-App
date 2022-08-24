import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCardButton.module.css';
import CartContext from "../../store/cart-context";
import { useContext } from "react";

  const HeaderCardButton = (props) =>{
    const cartCtx = useContext(CartContext);
    const numberOfItems = cartCtx.items.reduce((curNumber,item)=>{
      return curNumber + item.amount;
    },0);
    return <button className={classes.button} onClick={props.openModalHandler}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfItems}</span>
    </button>
  }

  export default HeaderCardButton;