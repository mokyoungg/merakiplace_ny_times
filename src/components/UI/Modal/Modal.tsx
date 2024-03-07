import Portal from "../Portal/Portal"
import styles from "./Modal.module.scss"
import classNames from "classnames/bind"
import { useModalStore } from "../../../store/modalStore"

const cx= classNames.bind(styles)

interface ModalProps{
    children:JSX.Element
}


const Modal = (props:ModalProps)=>{
    const {children} = props

    const {isOpen, closeModal} = useModalStore()

    return(
        isOpen ? 
        (
        <Portal>
            <div className={cx("modal")} onClick={closeModal}>
                <div onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </Portal>
        ):null
    )
}

export default Modal