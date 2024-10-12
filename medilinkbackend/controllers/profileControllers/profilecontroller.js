const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const HospitalAdminSchema = require('../../models/Hospital&Admin/HospitalAdminSchema');
const DoctorSchema = require('../../models/MedicalStaff/doctorModel');
const NurseSchema = require('../../models/MedicalStaff/nurseModel');
const MLTSchema = require('../../models/MedicalStaff/mltModel');

const login = async (req, res) => {
    const { userType, username, password } = req.body;

    try {
        let user = null;

        if (!userType || !username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check userType and search in the corresponding schema
        switch (userType.toLowerCase()) {
            case 'mlt':
                user = await MLTSchema.findOne({ email: username });
                break;
            case 'hospitaladmin':
                user = await HospitalAdminSchema.findOne({ adminEmail: username });
                break;
            case 'doctor':
                user = await DoctorSchema.findOne({ email: username });
                break;
            case 'nurse':
                user = await NurseSchema.findOne({ email: username });
                break;
            default:
                return res.status(400).json({ message: 'Invalid user type' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        let isMatch;
        if (userType.toLowerCase() === 'hospitaladmin') {
            // Compare password with adminID for hospital admin
            isMatch = password === user.adminID;
        } else {
            // Compare the password using bcrypt for other user types
            isMatch = await bcrypt.compare(password, user.password);
        }

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userid: user._id, email: user.email },
            'medilinkstaffsecret', // Replace this with your actual secret from your .env file
            { expiresIn: '1h' } // Token valid for 1 hour
        );

        // Return the token and user info
        res.status(200).json({
            usertype: userType,
            user: user,
            token: token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };
