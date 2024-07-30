// components/toast.js
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'

enum ToastPosition {
  'top-center' = 'top-0 start-50 translate-middle-x',
  'bottom-center' = 'bottom-0 end-0',
  'top-start' = 'top-0 start-0',
  'top-end' = 'top-0 end-0',
  'bottom-start' = 'bottom-0 start-0',
  'bottom-end' = 'bottom-0 end-0',
}

type ShowToastProps = {
  position: "top-center" | "bottom-center" | "top-start" | "top-end" | "bottom-start" | "bottom-end";
  message?: string;
};

const Toast = (props?: ShowToastProps) => {
  const toastRef = useRef(null);
  const [toastData, setToastData] = useState<ShowToastProps>({
    position: 'top-center',
    ...props
  });

  useEffect(() => {

    console.log(toastData, 'toastData');
    
    
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      const toastElement = toastRef.current;
      const toastInstance = new bootstrap.Toast(toastElement);
      toastInstance.show();
    });
  }, []);

  return (
    <div className={`toast-container position-fixed p-3 ${ToastPosition[toastData.position]}`} id="toastPlacement">
      <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef} data-bs-delay="2000"> 
        <div className="toast-body">
         {toastData.message}
        </div>
      </div>
    </div>
  );
};

const showToast = (props?: ShowToastProps) => {
  const {position = 'top-end' , message = 'ok'} = props || {} 



  // console.log(position, 'positionpositionposition');
  
  
  const div = document.createElement('div');
  document.body.appendChild(div);
  const root = createRoot(div);
  root.render(<Toast position={position} message ={message}/>);
};

export default showToast;
