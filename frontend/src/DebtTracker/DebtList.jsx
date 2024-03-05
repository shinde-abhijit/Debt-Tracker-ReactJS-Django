import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DebtList = ({ debtData, setDebtData, isLoading }) => {
    const [search, setSearch] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setEditDebtRecord(item || {
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
        setShow(true);
    };
    const [editDebtRecord, setEditDebtRecord] = useState({
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
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this debt record?');
        if (isConfirmed) {
            try{
                await axios.delete(`http://127.0.0.1:8000/api/debt-trackers/${id}/`);
                const remainedList = debtData.filter(debtRecord => debtRecord.id !== id);
                setDebtData(remainedList);
                window.alert('Debt record deleted successfully!');
            }catch(error){
                console.log(error);
            }
        }
    };
    const handleEdit = async (id, value) => {
        try{
            const response = await axios.patch(`http://127.0.0.1:8000/api/debt-trackers/${id}/`, value);
            const debtUpdated = debtData.map(debtRecord => debtRecord.id === id ? response.data : debtRecord) 
            console.log(debtUpdated);
            setDebtData(debtUpdated);
        }catch(error){
            console.log(error);
        }
    }
    const handleEditClick = (id) => {
        handleEdit(editDebtRecord.id, editDebtRecord);
        handleClose();
        window.alert('Debt record updated successfully!');
    }
    const handleChange = (field, value) => {
        setEditDebtRecord(prev => ({
            ...prev,
            [field]: value,
        }));
        console.log(editDebtRecord);
    };
    
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4 className='text-center'>Debt List</h4>
                    </div>
                <hr />
                    <div className="col-12 mt-1 mb-2">
                        <input type="text" className='form-control' onChange={(e) => setSearch(e.target.value)} placeholder='Search Debt Records By Interest, Amount, Name, Contact' />
                    </div>
                </div>
            </div>
            {isLoading ? 
            <div>Data is Loading, Please hold.....</div>
                :
            <>
            <ul id='debt-list' className=''>
                <div className='row gap-5'>
                {debtData.filter((item) => {
                    return search.toLowerCase() === '' ? item : item.debt_name.toLowerCase().includes(search);
                        }).map((item, id) => (
                    <div className="card bg-danger mx-3" style={{width: '21rem'}} key={item.id} title={`Taken From - ${item.debt_name} | Amount - ${item.debt_amount}`}>
                        <div className="card-header bg-success text-white title-text"><h5>Name - {item.debt_name} ID-{item.id}</h5></div>
                        <ul className="list-group list-group-flush bg-dark text-primary">
                            <li className="list-group-item bg-dark text-primary">Taken - {item.debt_taken}</li>
                            <li className="list-group-item bg-dark text-primary">Contact - {item.debt_mobile}</li>
                            <li className="list-group-item bg-dark text-primary">Address - {item.debt_address}</li>
                            <li className="list-group-item bg-dark text-primary">Amount - {item.debt_amount} Rs.</li>
                            <li className="list-group-item bg-dark text-primary">Interest - {item.debt_interest == 0 ? 'Without Interest' : item.debt_interest+'%'}</li>
                            <li className="list-group-item bg-dark text-primary">Start Date - {new Date(item.debt_start_date).toDateString('en-IN')}</li>
                            <li className="list-group-item bg-dark text-primary">End Date - {new Date(item.debt_end_date).toDateString('en-IN')}</li>
                            <li className="list-group-item bg-dark text-primary">EMI - {item.emi_amount} Rs.</li>
                            <li className="list-group-item bg-dark text-primary">Total to Pay - {item.total_amount_paid} Rs.</li>
                            <li className="list-group-item bg-dark text-primary">Created - {new Date(item.created_at).toLocaleString('en-IN')}</li>
                            <li className="list-group-item bg-dark text-primary">Updated - {new Date(item.updated_at).toLocaleString('en-IN')}</li>
                            <li className="list-group-item bg-dark text-primary d-flex align-items-center justify-content-evenly">
                            <Button variant="primary" onClick={() => handleShow(item)}>Edit</Button>
                            <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                            </li>
                        </ul>
                    </div>
                ))}
                </div>
                
            </ul>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton className='bg-danger'>
                    <Modal.Title>
                        Edit Debt Record
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white'>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Date</label>
                            <input type="date" className="form-control" value={editDebtRecord.debt_taken} onChange={(e) => handleChange('debt_taken', e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Date Start</label>
                            <input type="date" className="form-control" value={editDebtRecord.debt_start_date} onChange={(e) => handleChange('debt_start_date', e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Date End</label>
                            <input type="date" className="form-control" value={editDebtRecord.debt_end_date} onChange={(e) => handleChange('debt_end_date', e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Contact</label>
                            <input type="number" className="form-control" value={editDebtRecord.debt_mobile} onChange={(e) => handleChange('debt_mobile', e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Taken From</label>
                            <input type="text" className="form-control" value={editDebtRecord.debt_name} onChange={(e) => handleChange('debt_name', e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Address</label>
                            <input type="text" className="form-control" value={editDebtRecord.debt_address} onChange={(e) => handleChange('debt_address', e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Amount</label>
                            <input type="number" className="form-control" value={editDebtRecord.debt_amount} onChange={(e) => handleChange('debt_amount', e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Interest</label>
                            <input type="number" className="form-control" value={editDebtRecord.debt_interest} onChange={(e) => handleChange('debt_interest', e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">EMI</label>
                            <input type="number" className="form-control" value={editDebtRecord.emi_amount} onChange={(e) => handleChange('emi_amount', e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Total Pay</label>
                            <input type="number" className="form-control" value={editDebtRecord.total_amount_paid} onChange={(e) => handleChange('total_amount_paid', e.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-danger'>
                    <Button variant="primary" onClick={handleEditClick}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        }
        </div>
    )
}

export default DebtList
