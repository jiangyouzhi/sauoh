package cn.sau.sauoh.service.impl;

import cn.sau.sauoh.entity.Department;
import cn.sau.sauoh.entity.Doctor;
import cn.sau.sauoh.entity.Illness;
import cn.sau.sauoh.repository.DepartmentMapper;
import cn.sau.sauoh.repository.DoctorMapper;
import cn.sau.sauoh.repository.IllnessMapper;
import cn.sau.sauoh.utils.Score;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;

@Service("searchService")
public class SearchServiceImpl implements cn.sau.sauoh.service.SearchService {

    @Autowired
    private DepartmentMapper departmentMapper;

    @Autowired
    private DoctorMapper doctorMapper;

    @Autowired
    private IllnessMapper illnessMapper;

    @Override
    public List<Doctor> searchInfo(List<Score> scores){
        List<Doctor> doctors = new ArrayList<>();
        //提取出关键字 score.getKey()
        for(Score score : scores){
            //将关键词按照科室名模糊查询
            QueryWrapper<Department> departmentQueryWrapper = new QueryWrapper<>();
            departmentQueryWrapper.like("name",score.getKey());
            List<Department> departmentLists = departmentMapper.selectList(departmentQueryWrapper);

            //将关键词按照医院名模糊查询
            QueryWrapper<Doctor> doctorQueryWrapper = new QueryWrapper<>();
            doctorQueryWrapper.like("hospital",score.getKey());
            List<Doctor> doctorLists = doctorMapper.selectList(doctorQueryWrapper);

            //分别将两种模糊查询的结果加入到doctors
            List<Doctor> doctorList = null;
            for (Department department : departmentLists){
                QueryWrapper<Doctor> doctorQueryWrapper1 = new QueryWrapper<>();
                doctorQueryWrapper1.eq("department_id",department.getId());
                doctorList = doctorMapper.selectList(doctorQueryWrapper1);
                for(Doctor doctor : doctorList){
                    if(this.checkDoctor(doctors,doctor.getId())){
                        doctors.add(doctor);
                    }
                }
            }
            for(Doctor doctor : doctorLists){
                if(this.checkDoctor(doctors,doctor.getId())){
                        doctors.add(doctor);
                }
            }

        }


        return doctors;
    }

    @Override
    public List<Doctor> searchHosInfo(List<Score> scores){
        List<Doctor> doctors = new ArrayList<>();
        for(Score score : scores){
            QueryWrapper<Doctor> doctorQueryWrapper = new QueryWrapper<>();
            doctorQueryWrapper.like("hospital",score.getKey());
            List<Doctor> doctorLists = doctorMapper.selectList(doctorQueryWrapper);

            for(Doctor doctor : doctorLists){
                if(this.checkDoctor(doctors,doctor.getId())){
                    doctors.add(doctor);
                }
            }
        }
        return doctors;
    }

    @Override
    public List<Doctor> searchDepInfo(List<Score> scores){
        List<Doctor> doctors = new ArrayList<>();
        for(Score score : scores){
            QueryWrapper<Department> departmentQueryWrapper = new QueryWrapper<>();
            departmentQueryWrapper.like("name",score.getKey());
            List<Department> departmentLists = departmentMapper.selectList(departmentQueryWrapper);

            List<Doctor> doctorList = null;
            for (Department department : departmentLists){
                QueryWrapper<Doctor> doctorQueryWrapper1 = new QueryWrapper<>();
                doctorQueryWrapper1.eq("department_id",department.getId());
                doctorList = doctorMapper.selectList(doctorQueryWrapper1);
                for(Doctor doctor : doctorList){
                    if(this.checkDoctor(doctors,doctor.getId())){
                        doctors.add(doctor);
                    }
                }
            }
        }

        return doctors;
    }

    @Override
    public List<Doctor> searchDecInfo(List<Score> scores){
        List<Doctor> doctors = new ArrayList<>();
        for(Score score : scores){
            QueryWrapper<Illness> illnessQueryWrapper = new QueryWrapper<>();
            illnessQueryWrapper.like("name",score.getKey());
            List<Illness> illnessList = illnessMapper.selectList(illnessQueryWrapper);

            List<Department> departmentList = new ArrayList<>();
            for(Illness illness:illnessList){
                QueryWrapper<Department> departmentQueryWrapper = new QueryWrapper<>();
                departmentQueryWrapper.eq("name",illness.getDepartmentName());
                Department department = departmentMapper.selectOne(departmentQueryWrapper);
                if(this.checkDep(departmentList,department.getId())){
                    departmentList.add(department);
                }
            }

            List<Doctor> doctorList = null;
            for (Department department : departmentList){
                QueryWrapper<Doctor> doctorQueryWrapper1 = new QueryWrapper<>();
                doctorQueryWrapper1.eq("department_id",department.getId());
                doctorList = doctorMapper.selectList(doctorQueryWrapper1);
                for(Doctor doctor : doctorList){
                    if(this.checkDoctor(doctors,doctor.getId())){
                        doctors.add(doctor);
                    }
                }
            }
        }

        return doctors;
    }

    public boolean checkDoctor(List<Doctor> doctors,int id){
        boolean flag = true;
        for(Doctor doctor : doctors){
            if(doctor.getId() == id){
                flag = false;
                break;
            }
        }
        return flag;
    }

    public boolean checkDep(List<Department> departments,int id){
        boolean flag = true;
        if(departments == null){
            return true;
        }
        for(Department department : departments){
            if(department.getId() == id){
                flag = false;
                break;
            }
        }
        return flag;
    }
}
