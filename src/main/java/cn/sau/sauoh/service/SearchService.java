package cn.sau.sauoh.service;

import cn.sau.sauoh.entity.Doctor;
import cn.sau.sauoh.utils.Score;

import java.util.List;

public interface SearchService {
    List<Doctor> searchInfo(List<Score> scores);

    List<Doctor> searchHosInfo(List<Score> scores);

    List<Doctor> searchDepInfo(List<Score> scores);

    List<Doctor> searchDecInfo(List<Score> scores);
}
