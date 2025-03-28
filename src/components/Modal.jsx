import { forwardRef, useImperativeHandle,useRef } from "react";
import { createPortal } from "react-dom";
import file from '../assets/file.svg'

const Modal = forwardRef(function Modal({ text, inputHeader },ref) {
    const modal = useRef()
    
    useImperativeHandle(ref,()=>{
        return{
            open(){
                modal.current.showModal()
            }
        }
    })

  return createPortal(
    <dialog ref={modal} className="md:w-1/5 p-5 text-center  rounded-3xl">
      <img src={file} className="h-52 mx-auto" alt="" />
      <h3>{text}</h3>
      <form action="dialog" >
        <button className="bg-orange-30  outline-none bg-orange-300 w-2/4 mx-auto p-1 rounded-md">okay</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
})
export default Modal