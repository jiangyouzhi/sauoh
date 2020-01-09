package cn.sau.sauoh.service.impl;

import cn.sau.sauoh.entity.*;
import cn.sau.sauoh.repository.DoctorMapper;
import cn.sau.sauoh.repository.MedicalRecordMapper;
import cn.sau.sauoh.repository.MedicineOrderMapper;
import cn.sau.sauoh.repository.PatientMapper;
import cn.sau.sauoh.service.MedicalRecordService;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service("medicalRecordService")
public class MedicalRecordServiceImpl extends ServiceImpl<MedicalRecordMapper, MedicalRecord> implements MedicalRecordService {

    @Autowired
    private DoctorMapper doctorMapper;

    @Autowired
    private PatientMapper patientMapper;

    @Autowired
    private MedicineOrderMapper medicineOrderMapper;

    @Override
    public List<Doctor> selectDoctor(Page<MedicalRecord> page){
        List<MedicalRecord> medicalRecordList= page.getRecords();
        List<Doctor> doctors = new ArrayList<>();
        for(MedicalRecord medicalRecord:medicalRecordList){
            Doctor doctor;
            int doctorId = medicalRecord.getDoctorId();
            doctor = doctorMapper.selectById(doctorId);
            if(doctor != null){
                doctors.add(doctor);
            }
        }

        return doctors;
    }

    @Override
    public List<Patient> selectPatient(Page<MedicalRecord> page){
        List<MedicalRecord> medicalRecordList = page.getRecords();
        List<Patient> patients = new ArrayList<>();
        for(MedicalRecord medicalRecord:medicalRecordList){
            Patient patient;
            int patientId = medicalRecord.getPatientId();
            patient = patientMapper.selectById(patientId);
            if(patient != null){
                patients.add(patient);
            }
        }

        return patients;
    }

    @Override
    public List<MedicineOrder> selectMedicineOrder(Page<MedicalRecord> page){
        List<MedicalRecord> medicalRecordList = page.getRecords();
        List<MedicineOrder> medicineOrders = new ArrayList<>();
        for(MedicalRecord medicalRecord:medicalRecordList){
            QueryWrapper<MedicineOrder> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("medical_record_id",medicalRecord.getId());
             List<MedicineOrder> medicineOrderList = medicineOrderMapper.selectList(queryWrapper);
            if(medicineOrderList != null){
                medicineOrders.addAll(medicineOrderList);
            }
        }
        return medicineOrders;
    }
}