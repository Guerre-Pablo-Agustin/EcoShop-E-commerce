package com.EcoHouse.impactReport.dtoRequest;

import com.EcoHouse.impactReport.Enum.ReportType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImpactReportRequestDto {

    @NotNull(message = "Customer ID is required")
    private Long customerId;

    @NotNull(message = "Start date is required")
    @PastOrPresent(message = "Start date cannot be in the future")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    @PastOrPresent(message = "End date cannot be in the future")
    private LocalDateTime endDate;

    @Builder.Default
    private ReportType reportType = ReportType.ON_DEMAND;

    @Builder.Default
        private boolean includeProductBreakdown = false;

    @Builder.Default
    private boolean includeCategoryAnalysis = false;

    @Builder.Default
    private boolean includeMonthlyTrend = false;

    @Builder.Default
    private boolean generateDetailedMetrics = true;
}