import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './otp.css';

const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const navigate = useNavigate();

     const location = useLocation()
     const OTP = location.state?.otp;

    const [errors, setErrors] = useState({});


    //for numbers
    const handleChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};

        const enteredOtp = otp.join('');
     const strng = OTP.otp.toString();

        if (!enteredOtp) {
            errors.password = "OTP is required";
        } else if (!/^\d{4}$/i.test(enteredOtp)) {
            errors.password = "OTP must be a 4-digit number";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {

                if(strng==enteredOtp){
                    navigate("/resetpass")
                }else{
                    alert("otp incorrect")
                }
                
            } catch (error) {
                console.error("Error:", error);
                alert("User not found");
            }
        }
    };

    return (
        <div className="otp-container">
            <h2>Verification required</h2>
            
            <p>To continue, complete this verification step.<br/> We've sent an OTP to the email.</p>
            <br />
            <form onSubmit={handleSubmit}>
                <label>Enter OTP</label><br/>
                <div className="form-group-otp">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="tel"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            maxLength="1"
                            className='otp_input'
                        />
                    ))}
                    <br/>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button type="submit" className='form_btn'>Verify OTP</button>
            </form>
        </div>
    );
};

export default Otp;