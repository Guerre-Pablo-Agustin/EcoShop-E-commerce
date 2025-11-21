package com.EcoHouse.impactReport.dtoResponse;

import com.EcoHouse.impactReport.Enum.ReportType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImpactReportResponseDto {

    private Long id;
    private Long customerId;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;

    private BigDecimal totalCO2Saved;
    private BigDecimal totalCO2Footprint;
    private Integer totalOrders;
    private Integer ecoPointsEarned;
    private BigDecimal totalAmountSpent;
    private Integer sustainableChoicesCount;
    private ReportType reportType;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    // Métricas calculadas
    private BigDecimal averageOrderCO2;
    private BigDecimal ecoEfficiencyScore;
    private String impactLevel;
    private BigDecimal averageOrderValue;
    private BigDecimal sustainabilityPercentage;

    // Datos opcionales detallados
    private Map<String, BigDecimal> categoryImpactBreakdown;
    private List<SustainableProductDto> topSustainableProducts;
    private List<MonthlyImpactDto> monthlyTrend;
    private EcoAchievementsDto achievements;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SustainableProductDto {
        private Long productId;
        private String productName;
        private BigDecimal co2Saved;
        private Integer timesPurchased;
        private BigDecimal totalSpent;
        private String ecoImpactLevel;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlyImpactDto {
        private String month;
        private BigDecimal co2Saved;
        private BigDecimal co2Footprint;
        private Integer ordersCount;
        private Integer ecoPoints;
        private BigDecimal amountSpent;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EcoAchievementsDto {
        private List<String> badges;
        private Integer sustainabilityRank;
        private String nextMilestone;
        private BigDecimal progressToNextLevel;
    }
}