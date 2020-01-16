package cn.sau.sauoh.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * @author nullptr
 * @date 2020/1/16 11:50
 */
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("message")
public class Message {
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;
    @NotNull
    private Integer senderId;
    @NotNull
    private Integer receiverId;
    @NotNull
    private String content;
    private Date time;
}
