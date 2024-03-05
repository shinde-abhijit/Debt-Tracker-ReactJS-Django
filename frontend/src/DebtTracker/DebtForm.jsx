import React, { useState, useEffect } from 'react';
import axios from 'axios'



const DebtForm = ({setDebtData, fetchData }) => {
    const [addDebtRecord, setAddDebtRecord] = useState({
        'debt_taken':'',
        'debt_name':'',
        'debt_mobile':'',
        'debt_address':'',
        'debt_amount':'',
        'debt_interest':'',
        'debt_start_date':'',
        'debt_end_date':'',
        'emi_amount':'',
        'total_amount_paid':'',
    });

    const handleChangeDebtTaken = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'debt_taken': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const handleChangeDebtName = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'debt_name': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const handleChangeDebtMobile = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'debt_mobile': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const handleChangeDebtAddress = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'debt_address': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const handleChangeDebtAmount = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'debt_amount': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const handleChangeDebtInterest = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'debt_interest': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const handleChangeDebtStartDate = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'debt_start_date': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const handleChangeDebtEndDate = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'debt_end_date': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const handleChangeDebtEmiAmount = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'emi_amount': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const handleChangeDebtTotalPay = (e) => {
        setAddDebtRecord(prev => ({
            ...prev,
            'total_amount_paid': e.target.value
        }))
        console.log(addDebtRecord);
    }

    const postDebtData = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (!addDebtRecord.debt_taken || !addDebtRecord.debt_name || !addDebtRecord.debt_mobile || !addDebtRecord.debt_address || !addDebtRecord.debt_amount || !addDebtRecord.debt_interest || !addDebtRecord.debt_start_date || !addDebtRecord.debt_end_date) {
            // Display an alert or message for the user to fill in all required fields
            alert('Please fill in all required fields.');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/debt-trackers/', addDebtRecord);
            // Optionally, you can reset the form fields after successful submission
            fetchData();
            setAddDebtRecord({
                'debt_taken': '',
                'debt_start_date': '',
                'debt_end_date': '',
                'debt_mobile': '',
                'debt_name': '',
                'debt_address': '',
                'debt_amount': '',
                'debt_interest': '',
                'emi_amount': '',
                'total_amount_paid': '',
            });
            
        // Display a success alert or notification
        alert('Data sent successfully!');
        }catch(error){
            console.log(error);
        }
    }
    
    return (
        <div>
            <h4 className='text-center'>Add Debt Record</h4>
            <hr />
            <div className='px-3'>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="">Date Taken</label>
                        <input type="date" className='form-control' onChange={handleChangeDebtTaken} value={addDebtRecord.debt_taken} />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <label htmlFor="">Date Start</label>
                        <input type="date" className='form-control' onChange={handleChangeDebtStartDate} value={addDebtRecord.debt_start_date} />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <label htmlFor="">Date End</label>
                        <input type="date" className='form-control' onChange={handleChangeDebtEndDate} value={addDebtRecord.debt_end_date} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="">Contact</label>
                        <input type="number" className='form-control' onChange={handleChangeDebtMobile} value={addDebtRecord.debt_mobile} placeholder='Contact Number' />
                    </div>
                    <div className="col-12">
                        <label htmlFor="">Taken From</label>
                        <input type="text" className='form-control' onChange={handleChangeDebtName} value={addDebtRecord.debt_name} placeholder='Name' />
                    </div>
                    <div className="col-12">
                        <label htmlFor="">Address</label>
                        <input type="text" className='form-control' onChange={handleChangeDebtAddress} value={addDebtRecord.debt_address} placeholder='Address' />
                    </div>
                    <div className="col-12">
                        <label htmlFor="">Amount</label>
                        <input type="number" className='form-control' onChange={handleChangeDebtAmount} value={addDebtRecord.debt_amount} placeholder='Amount Taken' />
                    </div>
                    <div className="col-12">
                        <label htmlFor="">Interest</label>
                        <input type="number" className='form-control' onChange={handleChangeDebtInterest} value={addDebtRecord.debt_interest} placeholder='Interest' />
                    </div>
                    <div className="col-12">
                        <label htmlFor="">EMI Amount</label>
                        <input type="number" className='form-control' onChange={handleChangeDebtEmiAmount} value={addDebtRecord.emi_amount} placeholder='Auto Filled' id='disabled-element' disabled />
                    </div>
                    <div className="col-12">
                        <label htmlFor="">Total Amount To Pay</label>
                        <input type="number" className='form-control' onChange={handleChangeDebtTotalPay} value={addDebtRecord.total_amount_paid} placeholder='Auto Filled' id='disabled-element' disabled />
                    </div>
                    <div className="container d-flex justify-content-evenly mt-2 mb-2">
                        <button className='btn btn-primary' onClick={postDebtData}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebtForm
