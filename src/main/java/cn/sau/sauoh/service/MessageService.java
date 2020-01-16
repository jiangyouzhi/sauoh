package cn.sau.sauoh.service;

import cn.sau.sauoh.entity.Message;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author nullptr
 * @date 2020/1/16 11:58
 */
public interface MessageService extends IService<Message> {

    Integer countMessage(Integer receiverId);

    List<Integer> allSenderId(Integer id);

    List<Message> userReceiveMsg(Integer senderId, Integer id);
}
