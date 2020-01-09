package cn.sau.sauoh.service.impl;

import cn.sau.sauoh.entity.Doctor;
import cn.sau.sauoh.entity.QA;
import cn.sau.sauoh.repository.DoctorMapper;
import cn.sau.sauoh.repository.QAMapper;
import cn.sau.sauoh.service.QAService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;

/**
 * @author nullptr
 * @date 2020/1/6 23:19
 */
@Service("qaService")
public class QAServiceImpl extends ServiceImpl<QAMapper, QA> implements QAService {

    @Autowired
    private DoctorMapper doctorMapper;

    @Override
    public List<Doctor> selectDoctor(Page<QA> page){
        List<QA> qaList= page.getRecords();
        List<Doctor> doctors = new ArrayList<>();
        for(QA qa:qaList){
            Doctor doctor;
            if(qa.getDoctorId() == null){
                Doctor myDoctor = new Doctor();
                myDoctor.setName("无回答");
                doctors.add(myDoctor);
                continue;
            }
            int doctorId = qa.getDoctorId();
            doctor = doctorMapper.selectById(doctorId);
            if(doctor != null){
                doctors.add(doctor);
            }
        }

        return doctors;
    }
}
