package cn.sau.sauoh.service.impl;

import cn.sau.sauoh.entity.MedicinePatient;
import cn.sau.sauoh.repository.MedicinePatientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("MedicinePatientService")
public class MedicinePatientServiceImpl implements cn.sau.sauoh.service.MedicinePatientService {

    @Autowired
    private MedicinePatientMapper medicinePatientMapper;

    @Override
    public List<MedicinePatient> selectAll(){
        return medicinePatientMapper.selectAll();
    }

    @Override
    public int insert(MedicinePatient medicinePatient){
        return medicinePatientMapper.insert(medicinePatient);
    }
}
