package cn.sau.sauoh.repository;

import cn.sau.sauoh.entity.MedicinePatient;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MedicinePatientMapper {

    List<MedicinePatient> selectAll();

    int insert(MedicinePatient medicinePatient);
}
