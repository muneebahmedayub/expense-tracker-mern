import Swal, { SweetAlertIcon } from 'sweetalert2'

const showAlert = (titleText = 'Something happened', alertType: SweetAlertIcon) => {
    Swal.fire({
        titleText,
        position: 'bottom-start',
        timer: 5000,
        timerProgressBar: true,
        toast: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Dismiss',
        icon: alertType,
        showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation'
        },
        hideClass: {
            popup: '',
            backdrop: ''
        }
    })
}

export default showAlert