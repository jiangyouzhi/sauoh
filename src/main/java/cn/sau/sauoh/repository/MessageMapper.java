package cn.sau.sauoh.repository;

import cn.sau.sauoh.entity.Message;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author nullptr
 * @date 2020/1/16 11:56
 */
@Mapper
@Repository
public interface MessageMapper extends BaseMapper<Message> {

    List<Integer> selectAllSenderId(Integer receiverId);
}
