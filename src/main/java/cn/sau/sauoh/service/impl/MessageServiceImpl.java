package cn.sau.sauoh.service.impl;

import cn.sau.sauoh.entity.Message;
import cn.sau.sauoh.repository.MessageMapper;
import cn.sau.sauoh.service.MessageService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author nullptr
 * @date 2020/1/16 11:58
 */
@Service("messageService")
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements MessageService {

    private MessageMapper messageMapper;

    @Autowired
    public void setMessageMapper(MessageMapper messageMapper) {
        this.messageMapper = messageMapper;
    }

    @Override
    public Integer countMessage(Integer receiverId) {
        QueryWrapper<Message> wrapper = new QueryWrapper<>();
        wrapper.eq("receiver_id", receiverId);
        return messageMapper.selectCount(wrapper);
    }

    @Override
    public List<Integer> allSenderId(Integer id) {
        return messageMapper.selectAllSenderId(id);
    }

    @Override
    public List<Message> userReceiveMsg(Integer senderId, Integer receiverId) {
        QueryWrapper<Message> wrapper = new QueryWrapper<>();
        wrapper.eq("sender_id", senderId);
        wrapper.eq("receiver_id", receiverId);
        List<Message> messageList = messageMapper.selectList(wrapper);
        messageMapper.delete(wrapper);
        return messageList;
    }
}
