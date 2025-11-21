package com.EcoHouse.impactReport.controller;

import com.EcoHouse.impactReport.dtoRequest.ImpactReportRequestDto;
import com.EcoHouse.impactReport.dtoResponse.ImpactReportResponseDto;
import com.EcoHouse.impactReport.service.ImpactReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Impact Reports", description = "Environmental Impact Reports Management API")
public class ImpactReportController {

    private final ImpactReportService impactReportService;

    @PostMapping("/impact")
    @Operation(
            summary = "Generate Impact Report",
            description = "Generate a comprehensive environmental impact report for a customer within a specified date range"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Report generated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request parameters"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "409", description = "Report already exists for this period")
    })
//    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<ImpactReportResponseDto> generateReport(
            @Valid @RequestBody ImpactReportRequestDto request) {

        log.info("Received request to generate impact report for customer: {}", request.getCustomerId());

        ImpactReportResponseDto report = impactReportService.generateReport(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(report);
    }

    @GetMapping("/customer/{customerId}")
    @Operation(
            summary = "Get Customer Reports",
            description = "Retrieve all impact reports for a specific customer"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reports retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Customer not found")
    })
    //@PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<List<ImpactReportResponseDto>> getCustomerReports(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable Long customerId) {

        log.debug("Retrieving reports for customer: {}", customerId);

        List<ImpactReportResponseDto> reports = impactReportService.getReportsByCustomer(customerId);

        return ResponseEntity.ok(reports);
    }

    @GetMapping("/customer/{customerId}/latest")
    @Operation(
            summary = "Get Latest Report",
            description = "Retrieve the most recent impact report for a customer"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Latest report retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "No reports found for customer")
    })
    //@PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<ImpactReportResponseDto> getLatestReport(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable Long customerId) {

        log.debug("Retrieving latest report for customer: {}", customerId);

        return impactReportService.getLatestReport(customerId)
                .map(report -> ResponseEntity.ok(report))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{reportId}")
    @Operation(
            summary = "Get Report by ID",
            description = "Retrieve a specific impact report by its ID"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Report retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Report not found")
    })
    //@PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<ImpactReportResponseDto> getReportById(
            @Parameter(description = "Report ID", required = true)
            @PathVariable Long reportId) {

        log.debug("Retrieving report with ID: {}", reportId);

        // Este método necesitaría ser implementado en el service
        // return impactReportService.getReportById(reportId)
        //     .map(report -> ResponseEntity.ok(report))
        //     .orElse(ResponseEntity.notFound().build());

        return ResponseEntity.notFound().build(); // Placeholder
    }

    @GetMapping("/customer/{customerId}/stats")
    @Operation(
            summary = "Get Customer Impact Statistics",
            description = "Get aggregated impact statistics for a customer"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Statistics retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    //@PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<CustomerStatsDto> getCustomerStats(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable Long customerId) {

        log.debug("Retrieving stats for customer: {}", customerId);

        BigDecimal totalCO2Saved = impactReportService.getCustomerTotalCO2Saved(customerId);
        Integer totalEcoPoints = impactReportService.getCustomerTotalEcoPoints(customerId);

        CustomerStatsDto stats = CustomerStatsDto.builder()
                .customerId(customerId)
                .totalCO2Saved(totalCO2Saved)
                .totalEcoPoints(totalEcoPoints)
                .build();

        return ResponseEntity.ok(stats);
    }

    @DeleteMapping("/{reportId}")
    @Operation(
            summary = "Delete Report",
            description = "Soft delete an impact report"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Report deleted successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Report not found")
    })
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteReport(
            @Parameter(description = "Report ID", required = true)
            @PathVariable Long reportId) {

        log.info("Deleting report with ID: {}", reportId);

        impactReportService.deleteReport(reportId);

        return ResponseEntity.noContent().build();
    }

    // DTO interno para estadísticas del customer
    @lombok.Data
    @lombok.Builder
    private static class CustomerStatsDto {
        private Long customerId;
        private BigDecimal totalCO2Saved;
        private Integer totalEcoPoints;
    }
}