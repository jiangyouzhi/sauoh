package cn.sau.sauoh.web.rest;

import cn.sau.sauoh.entity.User;
import cn.sau.sauoh.service.UserService;
import cn.sau.sauoh.utils.Constant;
import cn.sau.sauoh.utils.R;
import cn.sau.sauoh.utils.RRException;
import cn.sau.sauoh.web.vm.UserVM;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

/**
 * 账户相关的 restcontroller，使用 UserVM（user+role）
 */
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 列表
     */
    @GetMapping("/list")
    public R list(@RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
                  @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
                  @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
                  @RequestParam(value = "sortOf", defaultValue = "ASC") String sortOf) {
        if ((!Constant.SORTOF_ASC.equalsIgnoreCase(sortOf))) {
            if ((!Constant.SORTOF_DESC.equalsIgnoreCase(sortOf))) {
                throw RRException.badRequest("sortOf allow ASC or DESC");
            }
        }
        Page<User> page = new Page<>(pageNum, pageSize);
        if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.asc(sortBy));
        } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.desc(sortBy));
        }
        userService.page(page);
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
        UserVM vm = userService.getById(id);
        if (vm == null) {
            throw RRException.notFound("指定Id不存在");
        }
        return R.ok().put("uservm", vm);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public R save(@Valid @RequestBody UserVM vm, HttpServletResponse response) {
        if (vm.getId() != null) {
            throw RRException.badRequest("插入时不能指明Id");
        }
        if (userService.saveVm(vm)) {
            return R.created(response).put("uservm", vm);
        }
        throw RRException.serverError();
    }

    /**
     * 批量保存
     */
    @PostMapping("/batch/save")
    public R save(@RequestBody List<UserVM> vmList, HttpServletResponse response) {
        vmList.forEach(vm -> {
            if (vm.getId() != null) {
                throw RRException.badRequest("插入时不能指明Id");
            }
        });
        if (userService.saveVmBatch(vmList)) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public R update(@Valid @RequestBody UserVM vm, HttpServletResponse response) {
        if (vm.getId() == null) {
            throw RRException.badRequest("修改时必须指明Id");
        }
        if (userService.updateById(vm)) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }

    /**
     * 批量修改
     */
    @PutMapping("/batch/update")
    public R updateBatch(@RequestBody List<UserVM> vmList, HttpServletResponse response) {
        vmList.forEach(vm -> {
            if (vm.getId() == null) {
                throw RRException.badRequest("修改时必须指明Id");
            }
        });
        if (userService.updateBatchById(vmList)) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable Integer id, HttpServletResponse response) {
        if (userService.removeById(id)) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }

    /**
     * 批量删除
     */
    @PostMapping("/batch/delete")
    public R delete(@RequestBody Integer[] ids, HttpServletResponse response) {
        if (userService.removeByIds(Arrays.asList(ids))) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }
}
