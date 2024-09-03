import classes from "./Toastify.module.scss";
import ReactDOM from "react-dom";

type Props = {
   open: boolean;
   toastifyDetails: string[];
};

const Toastify = (props: Props) => {
   const { open, toastifyDetails } = props;

   let translateX;

   if (open === true) {
      translateX = 0;
   } else {
      translateX = -110;
   }

   const header = toastifyDetails[0];
   const msg = toastifyDetails[1];

   return ReactDOM.createPortal(
      <div
         style={{
            transform: `translateX(${translateX}%)`,
         }}
         className={classes.Toastify_container}
      >
         <h3>{header}</h3>
         <p>{msg}</p>
      </div>,
      document.getElementById("toastify-root")!
   );
};

export default Toastify;
