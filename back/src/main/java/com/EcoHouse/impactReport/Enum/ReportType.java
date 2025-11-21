package com.EcoHouse.impactReport.Enum;

public enum ReportType {
    MONTHLY("Monthly Report"),
    QUARTERLY("Quarterly Report"),
    ANNUAL("Annual Report"),
    CUSTOM("Custom Period Report"),
    ON_DEMAND("On Demand Report");

    private final String description;

    ReportType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}