import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [input, setInput] = useState({
        F_name: "",
        L_name: "",
        Email: "",
        Phone: "",
        Address: "",
        isValidPhone: true
    });

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get(`http://localhost:8070/api/pho/sup/single/${id}`);
            const data = res.data;
            data.isValidPhone = true; 
            setInput(data);
        };
        getAllData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update this?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#32dd32',
            cancelButtonColor: '#da2424',
            confirmButtonText: 'YES'
        });

        if (result.isConfirmed) {
            await axios.put(`http://localhost:8070/api/pho/sup/${id}`, input);
            navigate('/viewPho');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let isValidPhone = input.isValidPhone;

        if (name === 'Phone') {
            isValidPhone = value.length === 10;
        }

        setInput({ ...input, [name]: value, isValidPhone });
    };

    return (
        <div style={{ backgroundImage: `url(/Images/back2.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar />
            <div className='container' style={{ backgroundColor: "#E5E5E5", maxWidth: '600px', margin: '50px auto' }}>
                <form onSubmit={handleUpdate}>
                    <div className='row'>
                        <h4 className="mb-4" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '20px' }}>PHOTOGRAPHER DETAILS</h4>
                        <div>
                            <div className="mb-3">
                                <label className="form-label">PHOTOGRAPHER FULL NAME</label>
                                <input
                                    name="F_name"
                                    value={input.F_name}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">PHOTOGRAPHER LAST NAME</label>
                                <input
                                    name="L_name"
                                    value={input.L_name}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">EMAIL</label>
                                <input
                                    name="Email"
                                    value={input.Email}
                                    onChange={handleInputChange}
                                    type="email"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">PHONE</label>
                                <input
                                    name="Phone"
                                    value={input.Phone}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">ADDRESS</label>
                                <input
                                    name="Address"
                                    value={input.Address}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-3">
                        <button type="submit" className="btn btn-primary me-5" disabled={!input.isValidPhone}>UPDATE</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;
