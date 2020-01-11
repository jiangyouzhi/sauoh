package cn.sau.sauoh.web.vm;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author nullptr
 * @date 2020/1/11 13:27
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageVM {

    /**
     * userId 在 request msg 中是 receiverId，在 response msg 中是 senderId
     */
    private Integer userId;
    private String content;
    private Date time;

}
