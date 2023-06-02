import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const node = document.body;

  return ReactDOM.createPortal((
    <AnimatePresence>
      {isOpen && <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0, pointerEvents: "none" }}
        animate={{ opacity: 1, pointerEvents: "auto" }}
        exit={{ opacity: 0, pointerEvents: "none" }}
        // transition={{ delay: .1, duration: .3, type: "keyframes" }}
        className="fixed inset-0 flex items-center justify-center bg-black/60"
        onClick={(e) => {
          console.log(e.currentTarget);
          console.log(e.target);
          if (e.currentTarget === e.target) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: "100%" }}
          exit={{ opacity: 0, scale: 0 }}
          // transition={{ delay: .3, duration: .3, type: "keyframes" }}
          className="py-5 px-10 rounded-lg bg-white"
        >
          {children}
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  ), node);
}

export default Modal;
