import Swal, { SweetAlertResult } from 'sweetalert2';
   import { toast } from 'react-toastify';


 const common = {
   showAlert: (message: string): Promise<SweetAlertResult> => {
     return Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: message,
     });
   },
   showToast: (title: string) => {
     return Swal.fire({
       toast: true,
       position: "top-end",
       icon: "success",
       title: title,
       showConfirmButton: false,
       timer: 3000, // Adjust the duration you want the toast to be shown (in milliseconds)
       customClass: {
         popup: "z-50", // Set initial z-index (ensure this is lower than modal z-index)
       },
     });
   },

 showErrorToast :(message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
},

   formatNumber(number: number) {
     return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   },
   formatDate(date: string) {
     const formattedDate = new Date(date)
       .toLocaleDateString("en-GB", {
         minute: "numeric",
         hour: "numeric",
         day: "numeric",
         month: "short",
         year: "numeric",
       })
       .split(" ")
       .join(" ");
     return formattedDate;
   },
   formatTimeOnly(date: string) {
     const options = {
       hour: "2-digit",
       minute: "2-digit",
       second: "2-digit",
     };

     const formattedTime = new Date(date).toLocaleTimeString("en-GB", options);
     return formattedTime;
   },
   formatDateWithoutTime(date: string) {
     const formattedDate = new Date(date)
       .toLocaleDateString("en-GB", {
         day: "numeric",
         month: "short",
         year: "numeric",
       })
       .split(" ")
       .join(" ");
     return formattedDate;
   },
   timeSince(date: string) {
     const now = new Date();
     now.setTime(now.getTime() /* - 60*60*1000*/);
     const seconds = Math.floor((now - new Date(date)) / 1000);
     let interval = seconds / 31536000;
     if (interval > 1) {
       return Math.floor(interval) + " years" + " ago";
     }
     interval = seconds / 2592000;
     if (interval > 1) {
       return Math.floor(interval) + " months" + " ago";
     }
     interval = seconds / 86400;
     if (interval > 1) {
       return Math.floor(interval) + " days" + " ago";
     }
     interval = seconds / 3600;
     if (interval > 1) {
       return Math.floor(interval) + " hours" + " ago";
     }
     interval = seconds / 60;
     if (interval > 1) {
       return Math.floor(interval) + " minutes" + " ago";
     }
     return Math.floor(seconds) + " seconds" + " ago";
   },
 };

export default common ;
