package com.EcoHouse.impactReport.mapper;

import com.EcoHouse.impactReport.dtoResponse.ImpactReportResponseDto;
import com.EcoHouse.impactReport.entities.ImpactReport;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ImpactReportMapper {

    @Mapping(target = "averageOrderCO2", ignore = true)
    @Mapping(target = "ecoEfficiencyScore", ignore = true)
    @Mapping(target = "impactLevel", ignore = true)
    @Mapping(target = "averageOrderValue", ignore = true)
    @Mapping(target = "sustainabilityPercentage", ignore = true)
    @Mapping(target = "categoryImpactBreakdown", ignore = true)
    @Mapping(target = "topSustainableProducts", ignore = true)
    @Mapping(target = "monthlyTrend", ignore = true)
    @Mapping(target = "achievements", ignore = true)
    ImpactReportResponseDto toResponseDto(ImpactReport entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "sustainableProductIds", ignore = true)
    @Mapping(target = "categoryBreakdown", ignore = true)
    @Mapping(target = "monthlyTrend", ignore = true)
    ImpactReport toEntity(ImpactReportResponseDto dto);

    // Mapeo personalizado para actualizar entidad existente
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromDto(ImpactReportResponseDto dto, @MappingTarget ImpactReport entity);
}