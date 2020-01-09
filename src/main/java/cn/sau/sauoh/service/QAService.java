package cn.sau.sauoh.service;

import cn.sau.sauoh.entity.Doctor;
import cn.sau.sauoh.entity.QA;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author nullptr
 * @date 2020/1/6 23:19
 */
public interface QAService extends IService<QA> {
    public List<Doctor> selectDoctor(Page<QA> page);
}
