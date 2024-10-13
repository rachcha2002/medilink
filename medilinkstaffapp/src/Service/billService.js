import axios from 'axios';
import moment from 'moment';


// Function to generate a unique bill number
const generateBillNo = () => {
  const datePart = moment().format('YYYYMMDD');
  const timePart = moment().format('HHmm');
  return `B${datePart}${timePart}`;
};

// Function to fetch hospital details
const fetchHospitalDetails = async (registrationID) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/gethospital/${registrationID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hospital details:', error);
    throw error;
  }
};

// Function to handle bill submission
export const submitBilling = async (type,appointment, payment,user) => {
   // Use AuthContext to get user details
  const billNo = generateBillNo();

  try {
    // Fetch hospital details using the user's registration ID
    const hospitalDetails = await fetchHospitalDetails(user.registrationID);

    // Create the bill details object
    const billDetails = {
      billingType: 'Appointment',
      patientName: appointment.username,
      patientID: appointment.userid,
      contactNumber: appointment.mobile,
      patientEmail: appointment.email,
      totalAmount: payment,
      paymentMethod: 'Cash', // Can be made dynamic if necessary
      paymentStatus: 'Pending',
      billNo: billNo,
      serviceDetails: [{ description: 'Appointment', cost: payment }],
      // Adding hospital details to the bill
      hospitalName: hospitalDetails.hospitalName,
      hospitalID: hospitalDetails.registrationID,
      hospitalEmail: hospitalDetails.hospitalEmail,
      hospitalPhone: hospitalDetails.contactNumber,
      hospitalAddress: hospitalDetails.address,
      hospitalMongoID: user.registrationID,
      isAppointment: true,
      appointmentType: type,
      appointmentID: appointment._id,
    };

    // Make the POST request to submit the billing
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/payment/billing`, billDetails);
    if (response.status === 200) {
      console.log('Billing submitted successfully:', response.data);
    } else {
      console.error('Failed to submit billing:', response);
    }
  } catch (error) {
    console.error('Error submitting billing:', error);
  }
};
