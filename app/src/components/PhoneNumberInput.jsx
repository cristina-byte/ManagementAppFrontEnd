import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

function PhoneNumberInput(){

    return (
        <div style={{marginTop:'20px'}}>
            <label>Phone number</label>
             <PhoneInput
            defaultCountry='RO'
            label="Phone number"
            />
        </div>
    )}

export default PhoneNumberInput
