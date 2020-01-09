package cn.sau.sauoh.service;

import cn.sau.sauoh.entity.Doctor;
import cn.sau.sauoh.entity.MedicalRecord;
import cn.sau.sauoh.entity.MedicineOrder;
import cn.sau.sauoh.entity.Patient;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author nullptr
 * @email justitacsl@outlook.com
 * @date 2019-12-25 19:33:28
 */
public interface MedicalRecordService extends IService<MedicalRecord> {
    public List<Doctor> selectDoctor(Page<MedicalRecord> page);

    public List<Patient> selectPatient(Page<MedicalRecord> page);

    public List<MedicineOrder> selectMedicineOrder(Page<MedicalRecord> page);
}

