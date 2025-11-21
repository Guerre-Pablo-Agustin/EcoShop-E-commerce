package com.EcoHouse.impactReport.repository;

import com.EcoHouse.impactReport.entities.ImpactReport;
import com.EcoHouse.impactReport.Enum.ReportType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ImpactReportRepository extends JpaRepository<ImpactReport, Long> {

    // Buscar reportes por customer ordenados por fecha de creación
    List<ImpactReport> findByCustomerIdOrderByCreatedAtDesc(Long customerId);

    // Buscar por customer y tipo de reporte
    List<ImpactReport> findByCustomerIdAndReportType(Long customerId, ReportType reportType);

    // Buscar el último reporte de un customer
    Optional<ImpactReport> findFirstByCustomerIdOrderByCreatedAtDesc(Long customerId);

    // Buscar reportes por rango de fechas
    List<ImpactReport> findByCustomerIdAndStartDateBetween(
            Long customerId,
            LocalDateTime start,
            LocalDateTime end
    );

    // Buscar reportes activos por customer
    List<ImpactReport> findByCustomerIdAndIsActiveTrueOrderByCreatedAtDesc(Long customerId);

    // Buscar reportes por período específico
    @Query("SELECT ir FROM ImpactReport ir WHERE " +
            "ir.customerId = :customerId AND " +
            "ir.startDate >= :startDate AND " +
            "ir.endDate <= :endDate AND " +
            "ir.isActive = true")
    List<ImpactReport> findByCustomerAndPeriod(
            @Param("customerId") Long customerId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    // Query para obtener total de CO2 ahorrado por customer
    @Query("SELECT COALESCE(SUM(ir.totalCO2Saved), 0) FROM ImpactReport ir " +
            "WHERE ir.customerId = :customerId AND ir.isActive = true")
    BigDecimal getTotalCO2SavedByCustomer(@Param("customerId") Long customerId);

    // Query para obtener total de puntos eco por customer
    @Query("SELECT COALESCE(SUM(ir.ecoPointsEarned), 0) FROM ImpactReport ir " +
            "WHERE ir.customerId = :customerId AND ir.isActive = true")
    Integer getTotalEcoPointsByCustomer(@Param("customerId") Long customerId);

    // Query para obtener estadísticas generales por customer
//    @Query("SELECT NEW com.ecoshop.backend4.dto.projection.CustomerImpactStatsDto(" +
//            "COALESCE(SUM(ir.totalCO2Saved), 0), " +
//            "COALESCE(SUM(ir.totalCO2Footprint), 0), " +
//            "COALESCE(SUM(ir.totalOrders), 0), " +
//            "COALESCE(SUM(ir.ecoPointsEarned), 0), " +
//            "COALESCE(SUM(ir.totalAmountSpent), 0), " +
//            "COALESCE(SUM(ir.sustainableChoicesCount), 0)" +
//            ") FROM ImpactReport ir " +
//            "WHERE ir.customerId = :customerId AND ir.isActive = true")
//    Optional<CustomerImpactStatsDto> getCustomerImpactStats(@Param("customerId") Long customerId);

    // Query para reportes por rango de fechas con paginación
    @Query("SELECT ir FROM ImpactReport ir WHERE " +
            "ir.createdAt >= :fromDate AND ir.createdAt <= :toDate AND ir.isActive = true")
    Page<ImpactReport> findReportsByPeriod(
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate,
            Pageable pageable
    );

    // Query para obtener el promedio de eficiencia ecológica por customer
    @Query("SELECT AVG(ir.totalCO2Saved / NULLIF(ir.totalCO2Footprint, 0) * 100) " +
            "FROM ImpactReport ir " +
            "WHERE ir.customerId = :customerId AND ir.isActive = true AND ir.totalCO2Footprint > 0")
    Optional<BigDecimal> getAverageEcoEfficiencyByCustomer(@Param("customerId") Long customerId);

    // Query para buscar reportes de customers más sostenibles
    @Query("SELECT ir.customerId, SUM(ir.totalCO2Saved) as totalSaved " +
            "FROM ImpactReport ir " +
            "WHERE ir.isActive = true " +
            "GROUP BY ir.customerId " +
            "ORDER BY totalSaved DESC")
    List<Object[]> findTopEcoCustomers(Pageable pageable);

    // Verificar si existe reporte para un período específico
    @Query("SELECT COUNT(ir) > 0 FROM ImpactReport ir WHERE " +
            "ir.customerId = :customerId AND " +
            "ir.reportType = :reportType AND " +
            "ir.startDate = :startDate AND " +
            "ir.endDate = :endDate AND " +
            "ir.isActive = true")
    boolean existsByCustomerAndPeriod(
            @Param("customerId") Long customerId,
            @Param("reportType") ReportType reportType,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}