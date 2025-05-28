package org.zerock.apiserver.dto.plan;


import lombok.Data;

@Data
public class PlanRequestDTO {

    private int areaCode;         // 지역 코드 (서울: 1, 부산: 6 등)
    private int contentTypeId;    // 관광지, 음식점, 카페 등 (예: 12, 39, 38)
    private int numOfDays;        // 여행일 수
    private boolean withFamily;   // 가족 동반 여부
    private int budgetLevel;      // 예산 레벨 (1~3)
    private String weather;       // sunny, rainy, cloudy 등

}