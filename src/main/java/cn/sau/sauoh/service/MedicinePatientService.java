package cn.sau.sauoh.service;


import cn.sau.sauoh.entity.MedicinePatient;

import java.util.List;

public interface MedicinePatientService {

    List<MedicinePatient> selectAll();

    int insert(MedicinePatient medicinePatient);
}
