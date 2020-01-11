package cn.sau.sauoh.web.rest;

import cn.sau.sauoh.entity.Department;
import cn.sau.sauoh.entity.Doctor;
import cn.sau.sauoh.repository.DepartmentMapper;
import cn.sau.sauoh.repository.DoctorMapper;
import cn.sau.sauoh.service.DepartmentService;
import cn.sau.sauoh.service.DoctorService;
import cn.sau.sauoh.service.SearchService;
import cn.sau.sauoh.utils.R;
import cn.sau.sauoh.utils.Score;
import cn.sau.sauoh.utils.TextRank;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.conditions.query.QueryChainWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.scripting.xmltags.ForEachSqlNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import javax.xml.crypto.dom.DOMCryptoContext;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;


    @PostMapping("/info")
    public R info(@RequestParam("val") String words){
        List<Score> scores = TextRank.excute(words);
        List<Doctor> doctors = searchService.searchInfo(scores);
        return R.ok().put("doctors",doctors);
    }

    @PostMapping("/hosInfo")
    public R hosInfo(@RequestParam String words){
        System.out.println(words);
        List<Score> scores = TextRank.excute(words);
        List<Doctor> doctors = searchService.searchHosInfo(scores);
        return R.ok().put("doctors",doctors);
    }

    @PostMapping("/depInfo")
    public R depInfo(@RequestParam String words){
        List<Score> scores = TextRank.excute(words);
        List<Doctor> doctors = searchService.searchDepInfo(scores);
        return R.ok().put("doctors",doctors);
    }

    @PostMapping("/decInfo")
    public R decInfo(@RequestParam("words") String words){
        List<Score> scores = TextRank.excute(words);
        List<Doctor> doctors = searchService.searchDecInfo(scores);
        return R.ok().put("doctors",doctors);
    }
}