package com.EcoHouse.impactReport.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class ImpactReport {

    @Id
    @generatedValue(GenerationType.IDENTITY)
    private long id;

    @Column(name= "customerId", nullable = false)
    private long customerId;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "total_co2_saved", precision = 10, scale = 3)
    private BigDecimal totalCO2Saved;

    @Column(name = "total_co2_footprint", precision = 10, scale = 3)
    private BigDecimal totalCO2Footprint;

    @Column(name = "total_orders")
    private Integer totalOrders;

    @Column(name = "eco_points_earned")
    private Integer ecoPointsEarned;

    @Column(name = "total_amount_spent", precision = 12, scale = 2)
    private BigDecimal totalAmountSpent;

    @Column(name = "sustainable_choices_count")
    private Integer sustainableChoicesCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "report_type", nullable = false, length = 20)
    private ReportType reportType;

    @Column(name = "sustainable_product_ids", columnDefinition = "TEXT")
    private String sustainableProductIds;

    @Column(name = "category_breakdown", columnDefinition = "TEXT")
    private String categoryBreakdown;

    @Column(name = "monthly_trend", columnDefinition = "TEXT")
    private String monthlyTrend;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;


}
