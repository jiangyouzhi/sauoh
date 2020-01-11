package cn.sau.sauoh.web.rest;

import cn.sau.sauoh.entity.MedicinePatient;
import cn.sau.sauoh.service.MedicinePatientService;
import cn.sau.sauoh.service.MedicineService;
import cn.sau.sauoh.utils.Constant;
import cn.sau.sauoh.utils.R;
import cn.sau.sauoh.utils.RRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api/mp")
public class MedicinePatientController {

    @Autowired
    private MedicinePatientService medicinePatientService;


    @GetMapping("list")
    public R list(){
        List<MedicinePatient> medicinePatientList = medicinePatientService.selectAll();
        return R.ok().put("medicinePatientList",medicinePatientList);
    }

    @PostMapping("save")
    public R save(@RequestBody MedicinePatient medicinePatient, HttpServletResponse response){
        if(medicinePatient.getId() != null){
            throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
        }
        if(medicinePatientService.insert(medicinePatient) == 1){
            return R.created(response).put("medicinePatient",medicinePatient);
        }
        throw RRException.serverError();
    }
}
