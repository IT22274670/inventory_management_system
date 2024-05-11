import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/salesManagement/AdminSidebar';
import { Link } from 'react-router-dom';
import "../../styles/supplier/supplierlist.css";

import Swal from 'sweetalert2';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/sup/suppliers');
        setSuppliers(response.data.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    const filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  }, [searchQuery, suppliers]);

  const handleDelete = async (id) => {
    try {

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this sale!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          });

        if (result.isConfirmed) {
         await axios.get(`http://localhost:8070/api/sup/delsup/${id}`);
         setSuppliers(suppliers.filter(supplier => supplier._id !== id));
         Swal.fire('Deleted!', 'The sale has been deleted.', 'success');
        }
    } catch (error) {
      console.error('Error deleting supplier:', error);
      Swal.fire('Error', 'An error occurred while deleting the sale.', 'error');
    }
  };

  const generatePDF = () => {
    // Ensure filteredSales is not empty
    if (filteredSuppliers.length === 0) {
      console.error('No sales data to generate PDF.');
      return;
    }
  
    try {
      const doc = new jsPDF();
      let yPos = 20;
  
      // Add invoice header
      doc.setFontSize(16);
      doc.text('Supplier Invoice', 10, yPos);
      yPos += 10;
  
      // Add invoice details
      doc.setFontSize(12);
      doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 10, yPos);
      yPos += 10;
  
      // Add table headers
      const headers = [['Supplier Name', 'Supplier Email', 'Supplier Phone', 'Supplier Status', 'Supplier Product',]];
      const data = filteredSuppliers.map(supp => [supp.name, supp.email, supp.phone, supp.status, supp.product]);
  
      // Auto-table generation
      doc.autoTable({
        startY: yPos,
        head: headers,
        body: data,
      });
  
      // Save PDF
      doc.save('supplier_invoice.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <div className="itm-conte">
          <h2>Supplier Details</h2>
          <div>
            <input className="sup-search"
              type="text"
              placeholder="Search by supplier name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className='supp-gen-pdf' onClick={generatePDF}>Export to PDF</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Product</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(supplier => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.status}</td>
                  <td>{supplier.product}</td>
                  <td>
                    <Link className='sup-update' to={`/upd/${supplier._id}`}>Update</Link> {/* Use Link for navigation */}
                    <button className='sup-del' onClick={() => handleDelete(supplier._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierList;
