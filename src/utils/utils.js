import { SECRET_KEY } from "../store/constants";
import CryptoJS from "crypto-js"; // Use import instead of require

/**
 * Password validator for login pages
 */
// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
    if (count < 2) return { label: 'Poor', color: '#f44336' };
    if (count < 3) return { label: 'Weak', color: '#ffc107' };
    if (count < 4) return { label: 'Normal', color: '#ffab91' };
    if (count < 5) return { label: 'Good', color: '#00e676' };
    if (count < 6) return { label: 'Strong', color: '#00c853' };
    return { label: 'Poor', color: '#f44336' };
};

// password strength indicator
export const strengthIndicator = (number) => {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
};

export function formatMobile(mobile) {
    mobile = mobile?.toString();
    if (mobile?.length === 0) {
        mobile = "";
    } else if (mobile?.length <= 3) {
        mobile = mobile?.replace(/^(\d{0,3})/, "($1)");
    } else if (mobile?.length <= 6) {
        mobile = mobile?.replace(/^(\d{0,3})(\d{0,3})/, "($1) $2");
    } else if (mobile?.length === 9) {
        mobile = mobile?.replace(/^(\d{0,2})(\d{0,3})(\d{0,4})/, "($1) $2 $3");
    } else if (mobile?.length <= 10) {
        mobile = mobile?.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2 $3");
    } else if (mobile?.length === 11) {
        mobile = mobile?.replace(
            /^(\d{0,2})(\d{0,2})(\d{0,3})(\d{0,4})/,
            "+$1 ($2) $3 $4"
        );
    }

    return mobile;
}

export function currencyFormat(num, unit, fractionDigits) {
    return unit + num?.toFixed(fractionDigits).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function longTextShow(text, maxLength) {
    return ((text).length > maxLength) ?
        (((text).substring(0, maxLength - 3)) + '...') :
        text;
}

export function findCampaignStatus(status) {
    let statusName;
    let statusColor;

    if (status === 0) {
        statusName = "Pending";
        statusColor = "info.main";
    } else if (status === 1) {
        statusName = "Running";
        statusColor = "primary.main";
    } else if (status === 2) {
        statusName = "Completed";
        statusColor = "success.main";
    } else if (status === 3) {
        statusName = "Approved";
        statusColor = "secondary.main";
    } else if (status === 4) {
        statusName = "Paused";
        statusColor = "warning.main";
    } else if (status === 5) {
        statusName = "Rejected";
        statusColor = "warning.dark";
    } else if (status === 6) {
        statusName = "Failed";
        statusColor = "error.main";
    } else {
        statusName = "Invalid";
        statusColor = "inherit";
    }

    return { status: statusName, color: statusColor };
}

export function findNumberStatus(status) {
    let statusName;
    let statusColor;

    if (status === 0) {
        statusName = "Pending";
        statusColor = "info.main";
    } else if (status === 1) {
        statusName = "Successfully Submitted";
        statusColor = "success.main";
    } else if (status === 2) {
        statusName = "Submit Failed";
        statusColor = "error.main";
    } else if (status === 3) {
        statusName = "Delivered";
        statusColor = "primary.main";
    } else if (status === 4) {
        statusName = "Expired";
        statusColor = "warning.main";
    } else {
        statusName = "Invalid";
        statusColor = "inherit";
    }

    return { status: statusName, color: statusColor };
}

export function getTimeWelcome() {
    const hours = new Date().getHours();

    if (+hours < 12) {
        return "Good Morning!";
    } else if ((+hours > 12 && +hours < 16) || +hours === 12) {
        return "Good Afternoon!";
    } else {
        return "Good Evening!";
    }
}

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    if (name !== " ") {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }
}

export function encrypt(cipherText) {
    if (cipherText) {
        return CryptoJS.AES.encrypt(
            JSON.stringify(cipherText),
            SECRET_KEY
        ).toString();
    }
}

export function decrypt(cipherText) {
    if (cipherText) {
        let bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}

export const _setImage = async (src, filename) => {
    try {
        if (src) {
            return await fetch(src)
                .then((r) => r.blob())
                .then(
                    (blobFile) =>
                        new File([blobFile], filename, { type: blobFile.type })
                );
        } else {
            return {};
        }
    } catch (error) {
        console.log(error);
        return {};
    }
};

export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export function getSalaryRange(val) {
    let range;
    switch (val) {
        case 0:
            range = 'Between Rs. 100,000 & Rs. 200,000';
            break;
        case 1:
            range = 'Between Rs. 200,000 & Rs. 300,000';
            break;
        case 2:
            range = 'Above Rs. 300,000';
            break;
        default:
            range = 'invalid';
    }

    return range;
}

export function getIncomeType(val) {
    let type;
    switch (val) {
        case 0:
            type = 'Salary';
            break;
        case 1:
            type = 'Business';
            break;
        case 2:
            type = 'Investment';
            break;
        default:
            type = 'Invalid';
    }
    return type;
}
   
