import { createPortal } from "react-dom";
import file from "../assets/file.svg";

export default function Err({ text }) {
  return createPortal(
    <dialog open>
      <img
        src={file}
        className="h-52
        "
        alt=""
      />
      <h3>{text}</h3>
      <form action="dialog">
        <button>okay</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
