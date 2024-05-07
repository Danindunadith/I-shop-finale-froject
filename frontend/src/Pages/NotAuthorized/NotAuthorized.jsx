import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotAuthorized() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-2); // Go back to the previous page in history
    };

    return (
        <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-danger fw-bolder'>Not Allowed</h1>
            <button className='btn btn-danger' onClick={goBack}>Go Back</button>
        </div>
    );
}
