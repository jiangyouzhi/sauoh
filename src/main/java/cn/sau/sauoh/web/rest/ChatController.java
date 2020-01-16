package cn.sau.sauoh.web.rest;

import cn.sau.sauoh.entity.Message;
import cn.sau.sauoh.entity.User;
import cn.sau.sauoh.security.utils.CurrentUser;
import cn.sau.sauoh.service.MessageService;
import cn.sau.sauoh.utils.Constant;
import cn.sau.sauoh.utils.R;
import cn.sau.sauoh.utils.RRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

/**
 * @author nullptr
 * @date 2020/1/11 10:57
 */
@RestController
@RequestMapping("/msg")
public class ChatController {

    private MessageService messageService;
    private CurrentUser currentUser;

    @Autowired
    public void setMessageService(MessageService messageService) {
        this.messageService = messageService;
    }

    @Autowired
    public void setCurrentUser(CurrentUser currentUser) {
        this.currentUser = currentUser;
    }

    @PostMapping("/send")
    public R handleSendMsg(@RequestBody Message reqMsg, HttpServletResponse response) {
        if (reqMsg.getId() != null) {
            throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
        }
        if (messageService.save(reqMsg)) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }

    /**
     * 未读消息总数
     */
    @GetMapping("/unread/count")
    public R handleReceiveMsg() {
        //当前登陆人
        User user = currentUser.getCurrentUser();
        return R.ok().put("msgSize", messageService.countMessage(user.getId()));
    }

    /**
     * 未读消息的senderId
     */
    @GetMapping("/unread/senderid")
    public R getSenderId() {
        //当前登陆人
        User user = currentUser.getCurrentUser();
        return R.ok().put("allSenderId", messageService.allSenderId(user.getId()));
    }

    /**
     * 和另一个用户的全部未读消息
     */
    @GetMapping("/info/{senderId}")
    public R allReceiveMsg(@PathVariable Integer senderId) {
        //当前登陆人
        User user = currentUser.getCurrentUser();
        return R.ok().put("allMsg", messageService.userReceiveMsg(senderId, user.getId()));
    }


}
