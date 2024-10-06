import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';

const PaymentHistory = () => {
  const paymentHistory = [
    {
      id: 1,
      billNumber: '1001',
      name: 'John Doe',
      amount: '$150',
      date: '10/10/2024',
      status: 'Paid',
    },
    {
      id: 2,
      billNumber: '1002',
      name: 'Jane Doe',
      amount: '$200',
      date: '12/10/2024',
      status: 'Pending',
    },
    {
      id: 3,
      billNumber: '1003',
      name: 'Mike Smith',
      amount: '$300',
      date: '15/10/2024',
      status: 'Paid',
    },
  ];

  return (
    <section className="st-shape-wrap" id="payment-history">
      <div className="st-shape1">
        <img src="/shape/contact-shape1.svg" alt="shape1" />
      </div>
      <div className="st-shape2">
        <img src="/shape/contact-shape2.svg" alt="shape2" />
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading
        title="Payment History"
        subTitle="Below is a list of all your past payments. Easily track your bills and statuses."
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="st-table-wrapper">
              <table className="table st-payment-history-table">
                <thead>
                  <tr>
                    <th>Bill Number</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.billNumber}</td>
                      <td>{payment.name}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.date}</td>
                      <td>
                        <span
                          className={`status ${
                            payment.status === 'Paid' ? 'paid' : 'pending'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td>
                        <button className="st-btn st-style1 st-color2 st-size-small st-btn-align">
                          <Icon
                            icon="mdi:eye"
                            style={{
                              verticalAlign: 'middle',
                              marginRight: '5px',
                              fontSize: '1.2em',
                            }}
                          />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
      <style jsx>{`
        .st-payment-history-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 1rem;
          text-align: center;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .st-payment-history-table th,
        .st-payment-history-table td {
          padding: 15px;
          border-bottom: 1px solid #ddd;
        }

        .st-payment-history-table th {
          background-color: #f8f8f8;
          font-weight: bold;
        }

        .st-payment-history-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .st-table-wrapper {
          overflow-x: auto;
        }

        .status.paid {
          color: #28a745;
          font-weight: bold;
        }

        .status.pending {
          color: #ffc107;
          font-weight: bold;
        }

        .st-btn.st-style1.st-color2 {
          background-color: #17a2b8;
          color: #fff;
          display: inline-flex;
          align-items: center;
        }

        .st-btn.st-style1.st-color2:hover {
          background-color: #138f99;
          color: #fff;
        }

        .st-btn.st-size-small {
          padding: 8px 12px;
          font-size: 0.875rem;
          margin-top: 5px;
        }

        @media (max-width: 768px) {
          .st-payment-history-table {
            font-size: 0.875rem;
          }

          .st-payment-history-table th,
          .st-payment-history-table td {
            padding: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default PaymentHistory;
