package cn.sau.sauoh.web.rest;

import cn.sau.sauoh.security.utils.JwtTokenUtils;
import cn.sau.sauoh.service.DoctorService;
import cn.sau.sauoh.service.UserService;
import cn.sau.sauoh.utils.R;
import cn.sau.sauoh.utils.RRException;
import cn.sau.sauoh.web.vm.MessageVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * @author nullptr
 * @date 2020/1/11 10:57
 */
@RestController("/chat")
public class ChatController {

    private UserService userService;
    private DoctorService doctorService;

    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setDoctorService(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @Autowired
    public void setMessagingTemplate(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * 前置检查：医生是否在线
     */
    @GetMapping("/check")
    public R prevCheck(@RequestParam("doctorId") Integer doctorId) {
        if (!doctorService.isOnline(doctorId)) {
            return R.ok().put("message", "已准备好网页聊天");
        } else {
            return R.ok().put("message", "该医生当前不在线");
        }
    }

    /**
     * 初始化聊天，包括通知医生打开聊天页面
     */
    @GetMapping("/init")
    public R initCheck(@RequestParam("doctorId") Integer doctorId) {
        if (!doctorService.alertMessage(doctorId)) {
            return R.ok().put("message", "已通知医生，请稍等");
        }
        throw RRException.serverError();
    }

    @MessageMapping("/msg")
    public void handleMsg(@Header("Authorization") String senderToken, @Payload MessageVM reqMsg) {
        Integer senderId = userService.getByUsername(JwtTokenUtils.getUsernameByToken(senderToken)).getId();
        Integer receiverId = reqMsg.getUserId();
        String destination = "/topic/" + receiverId;
        MessageVM resMsg = MessageVM.builder().userId(senderId).content(reqMsg.getContent()).time(new Date()).build();
        messagingTemplate.convertAndSend(destination, resMsg);
    }

}
