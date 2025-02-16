import { toast } from "react-toastify";

function shareContent(title, text, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).then(() => {
            // toast.success("Share successfull");
        }).catch((error) => {
            console.error('Error sharing content:', error);
        });
    } else {
        console.warn('Web Share API is not supported in this browser.');
    }
}

export default shareContent;