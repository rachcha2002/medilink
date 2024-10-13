// services/hospitalService.js

const hospitalRepository = require("../repositories/hospitalRepository");

class HospitalService {
  async createHospital(hospitalData) {
    return await hospitalRepository.create(hospitalData);
  }

  async getAllHospitals() {
    return await hospitalRepository.findAll();
  }

  async getHospitalById(id) {
    return await hospitalRepository.findById(id);
  }

  async getHospitalByAdminId(adminID) {
    return await hospitalRepository.findByAdminId(adminID);
  }

  async updateHospitalById(id, updateData) {
    return await hospitalRepository.updateById(id, updateData);
  }

  async deleteHospitalById(id) {
    return await hospitalRepository.deleteById(id);
  }

  async deleteHospitalByRegistrationID(registrationID) {
    return await hospitalRepository.deleteByRegistrationID(registrationID);
  }
}

module.exports = new HospitalService();
