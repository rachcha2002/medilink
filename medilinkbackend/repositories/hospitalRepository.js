// repositories/hospitalRepository.js

const Hospital = require("../models/Hospital&Admin/HospitalSchema");
const HospitalAdmin = require("../models/Hospital&Admin/HospitalAdminSchema");

class HospitalRepository {
  async create(hospitalData) {
    const hospital = new Hospital(hospitalData);
    return await hospital.save();
  }

  async findAll() {
    return await Hospital.find();
  }

  async findById(id) {
    return await Hospital.findById(id);
  }

  async findByAdminId(adminID) {
    return await Hospital.findOne({ adminID });
  }

  async updateById(id, updateData) {
    return await Hospital.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id) {
    return await Hospital.findByIdAndDelete(id);
  }

  async deleteByRegistrationID(registrationID) {
    const deletedHospital = await Hospital.findOneAndDelete({ registrationID });
    if (deletedHospital) {
      await HospitalAdmin.deleteMany({ hospitalName: deletedHospital.hospitalName });
      return deletedHospital;
    }
    return null;
  }
}

module.exports = new HospitalRepository();
