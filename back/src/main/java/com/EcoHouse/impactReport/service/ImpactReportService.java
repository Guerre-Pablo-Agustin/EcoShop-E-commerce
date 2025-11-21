package com.EcoHouse.impactReport.service;

import com.EcoHouse.impactReport.dtoRequest.ImpactReportRequestDto;
import com.EcoHouse.impactReport.dtoResponse.ImpactReportResponseDto;
import com.EcoHouse.impactReport.entities.ImpactReport;
import com.EcoHouse.impactReport.repository.ImpactReportRepository;
//import com.EcoHouse.service.external.OrderService;
//import com.EcoHouse.service.external.ProductService;
import com.EcoHouse.impactReport.mapper.ImpactReportMapper;
//import com.EcoHouse.backend4.exception.ReportAlreadyExistsException;
//import com.EcoHouse.backend4.exception.InvalidDateRangeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImpactReportService {

    private final ImpactReportRepository impactReportRepository;
//    private final OrderService orderService;
//    private final ProductService productService;
    private final ImpactReportMapper mapper;
//    private final ImpactCalculationService calculationService;

    @Transactional
    public ImpactReportResponseDto generateReport(ImpactReportRequestDto request) {
        log.info("Generating impact report for customer: {} from {} to {}",
                request.getCustomerId(), request.getStartDate(), request.getEndDate());

        // Validaciones
        validateRequest(request);
        checkIfReportAlreadyExists(request);

        // 1. Obtener datos de órdenes del Backend 3
//        List<OrderDto> customerOrders = orderService.getOrdersByCustomerAndDateRange(
//                request.getCustomerId(),
//                request.getStartDate(),
//                request.getEndDate()
//        );

//        if (customerOrders.isEmpty()) {
//            log.warn("No orders found for customer {} in the specified date range",
//                    request.getCustomerId());
//        }

        // 2. Calcular métricas de impacto
//        ImpactMetrics metrics = calculationService.calculateImpactMetrics(customerOrders);

        // 3. Obtener datos adicionales si se solicitan
        String sustainableProductIds = null;
        String categoryBreakdown = null;
        String monthlyTrend = null;

//        if (request.getIncludeProductBreakdown()) {
//            sustainableProductIds = calculationService.getSustainableProductIdsAsJson(customerOrders);
//        }
//
//        if (request.getIncludeCategoryAnalysis()) {
//            categoryBreakdown = calculationService.getCategoryBreakdownAsJson(customerOrders);
//        }
//
//        if (request.getIncludeMonthlyTrend()) {
//            monthlyTrend = calculationService.getMonthlyTrendAsJson(customerOrders, request.getStartDate(), request.getEndDate());
//        }

        // 4. Crear y guardar entidad ImpactReport
        ImpactReport report = ImpactReport.builder()
                .customerId(request.getCustomerId())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .totalCO2Saved(metrics.getTotalCO2Saved())
                .totalCO2Footprint(metrics.getTotalCO2Footprint())
                .totalOrders(customerOrders.size())
                .ecoPointsEarned(metrics.getTotalEcoPoints())
                .totalAmountSpent(metrics.getTotalAmount())
                .sustainableChoicesCount(metrics.getSustainableChoicesCount())
                .reportType(request.getReportType())
                .sustainableProductIds(sustainableProductIds)
                .categoryBreakdown(categoryBreakdown)
                .monthlyTrend(monthlyTrend)
                .build();

        ImpactReport savedReport = impactReportRepository.save(report);
        log.info("Successfully generated impact report with ID: {}", savedReport.getId());

        // 5. Convertir a DTO response y enriquecer con cálculos
        ImpactReportResponseDto response = mapper.toResponseDto(savedReport);
        enrichResponseWithCalculations(response, metrics, customerOrders, request);

        return response;
    }

    @Transactional(readOnly = true)
    public List<ImpactReportResponseDto> getReportsByCustomer(Long customerId) {
        log.debug("Retrieving reports for customer: {}", customerId);

        List<ImpactReport> reports = impactReportRepository
                .findByCustomerIdAndIsActiveTrueOrderByCreatedAtDesc(customerId);

        return reports.stream()
                .map(mapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ImpactReportResponseDto> getLatestReport(Long customerId) {
        log.debug("Retrieving latest report for customer: {}", customerId);

        return impactReportRepository
                .findFirstByCustomerIdOrderByCreatedAtDesc(customerId)
                .map(mapper::toResponseDto);
    }

    @Transactional(readOnly = true)
    public BigDecimal getCustomerTotalCO2Saved(Long customerId) {
        return impactReportRepository.getTotalCO2SavedByCustomer(customerId);
    }

    @Transactional(readOnly = true)
    public Integer getCustomerTotalEcoPoints(Long customerId) {
        return impactReportRepository.getTotalEcoPointsByCustomer(customerId);
    }

//    @Transactional
//    public void deleteReport(Long reportId) {
//        log.info("Soft deleting report with ID: {}", reportId);
//
//        ImpactReport report = impactReportRepository.findById(reportId)
//                .orElseThrow(() -> new EntityNotFoundException("Report not found with ID: " + reportId));
//
//        report.setIsActive(false);
//        impactReportRepository.save(report);
//    }

    // Métodos privados
    private void validateRequest(ImpactReportRequestDto request) {
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new InvalidDateRangeException("Start date must be before end date");
        }

        if (request.getStartDate().isAfter(LocalDateTime.now())) {
            throw new InvalidDateRangeException("Start date cannot be in the future");
        }

        long daysBetween = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate());
        if (daysBetween > 365) {
            throw new InvalidDateRangeException("Date range cannot exceed 365 days");
        }
    }

    private void checkIfReportAlreadyExists(ImpactReportRequestDto request) {
        boolean exists = impactReportRepository.existsByCustomerAndPeriod(
                request.getCustomerId(),
                request.getReportType(),
                request.getStartDate(),
                request.getEndDate()
        );

        if (exists) {
            throw new ReportAlreadyExistsException(
                    "A report already exists for this customer and period"
            );
        }
    }

    private void enrichResponseWithCalculations(
            ImpactReportResponseDto response,
            ImpactMetrics metrics,
            List<OrderDto> orders,
            ImpactReportRequestDto request
    ) {
        // Calcular promedio de CO2 por orden
        if (response.getTotalOrders() > 0) {
            BigDecimal avgCO2 = metrics.getTotalCO2Footprint()
                    .divide(BigDecimal.valueOf(response.getTotalOrders()), 3, RoundingMode.HALF_UP);
            response.setAverageOrderCO2(avgCO2);

            BigDecimal avgOrderValue = metrics.getTotalAmount()
                    .divide(BigDecimal.valueOf(response.getTotalOrders()), 2, RoundingMode.HALF_UP);
            response.setAverageOrderValue(avgOrderValue);
        }

        // Calcular score de eficiencia ecológica (0-100)
        BigDecimal ecoScore = calculationService.calculateEcoEfficiencyScore(metrics);
        response.setEcoEfficiencyScore(ecoScore);

        // Determinar nivel de impacto
        response.setImpactLevel(calculationService.determineImpactLevel(ecoScore));

        // Calcular porcentaje de sostenibilidad
        if (response.getTotalOrders() > 0) {
            BigDecimal sustainabilityPercentage = BigDecimal.valueOf(response.getSustainableChoicesCount())
                    .divide(BigDecimal.valueOf(response.getTotalOrders()), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
            response.setSustainabilityPercentage(sustainabilityPercentage);
        }

        // Agregar datos adicionales si se solicitaron
        if (request.getIncludeProductBreakdown()) {
            response.setTopSustainableProducts(
                    calculationService.getTopSustainableProducts(orders)
            );
        }

        if (request.getIncludeCategoryAnalysis()) {
            response.setCategoryImpactBreakdown(
                    calculationService.getCategoryImpactBreakdown(orders)
            );
        }

        if (request.getIncludeMonthlyTrend()) {
            response.setMonthlyTrend(
                    calculationService.getMonthlyTrend(orders, request.getStartDate(), request.getEndDate())
            );
        }

        // Calcular achievements
        response.setAchievements(
                calculationService.calculateEcoAchievements(response)
        );
    }
}