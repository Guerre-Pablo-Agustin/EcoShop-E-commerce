-- V001__Create_impact_reports_table.sql
-- Migration para crear la tabla impact_reports

CREATE TABLE IF NOT EXISTS impact_reports (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    total_co2_saved DECIMAL(10,3) DEFAULT 0.000,
    total_co2_footprint DECIMAL(10,3) DEFAULT 0.000,
    total_orders INTEGER DEFAULT 0,
    eco_points_earned INTEGER DEFAULT 0,
    total_amount_spent DECIMAL(12,2) DEFAULT 0.00,
    sustainable_choices_count INTEGER DEFAULT 0,
    report_type VARCHAR(20) NOT NULL DEFAULT 'ON_DEMAND',
    sustainable_product_ids TEXT,
    category_breakdown TEXT,
    monthly_trend TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_impact_reports_customer_id ON impact_reports(customer_id);
CREATE INDEX IF NOT EXISTS idx_impact_reports_date_range ON impact_reports(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_impact_reports_type ON impact_reports(report_type);
CREATE INDEX IF NOT EXISTS idx_impact_reports_created_at ON impact_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_impact_reports_active ON impact_reports(is_active);

-- Índice compuesto para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_impact_reports_customer_active_created
ON impact_reports(customer_id, is_active, created_at DESC);

-- Índice para búsquedas por período
CREATE INDEX IF NOT EXISTS idx_impact_reports_customer_period
ON impact_reports(customer_id, report_type, start_date, end_date)
WHERE is_active = true;

-- Constraints adicionales
ALTER TABLE impact_reports
ADD CONSTRAINT chk_impact_reports_date_range
CHECK (start_date <= end_date);

ALTER TABLE impact_reports
ADD CONSTRAINT chk_impact_reports_co2_positive
CHECK (total_co2_saved >= 0 AND total_co2_footprint >= 0);

ALTER TABLE impact_reports
ADD CONSTRAINT chk_impact_reports_orders_positive
CHECK (total_orders >= 0);

ALTER TABLE impact_reports
ADD CONSTRAINT chk_impact_reports_points_positive
CHECK (eco_points_earned >= 0);

ALTER TABLE impact_reports
ADD CONSTRAINT chk_impact_reports_amount_positive
CHECK (total_amount_spent >= 0);

-- Comentarios para documentación
COMMENT ON TABLE impact_reports IS 'Tabla para almacenar reportes de impacto ambiental de customers';
COMMENT ON COLUMN impact_reports.customer_id IS 'ID del customer (FK hacia backend1)';
COMMENT ON COLUMN impact_reports.start_date IS 'Fecha de inicio del período del reporte';
COMMENT ON COLUMN impact_reports.end_date IS 'Fecha de fin del período del reporte';
COMMENT ON COLUMN impact_reports.total_co2_saved IS 'Total de CO2 ahorrado en kg';
COMMENT ON COLUMN impact_reports.total_co2_footprint IS 'Huella de carbono total en kg';
COMMENT ON COLUMN impact_reports.sustainable_product_ids IS 'JSON array con IDs de productos sostenibles';
COMMENT ON COLUMN impact_reports.category_breakdown IS 'JSON con breakdown de impacto por categoría';
COMMENT ON COLUMN impact_reports.monthly_trend IS 'JSON con tendencia mensual de impacto';
COMMENT ON COLUMN impact_reports.is_active IS 'Flag para soft delete';

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_impact_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_impact_reports_updated_at ON impact_reports;
CREATE TRIGGER trigger_update_impact_reports_updated_at
    BEFORE UPDATE ON impact_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_impact_reports_updated_at();

-- Datos de ejemplo para testing (opcional)
INSERT INTO impact_reports (
    customer_id,
    start_date,
    end_date,
    total_co2_saved,
    total_co2_footprint,
    total_orders,
    eco_points_earned,
    total_amount_spent,
    sustainable_choices_count,
    report_type
) VALUES
(1, '2024-01-01 00:00:00', '2024-01-31 23:59:59', 15.500, 25.750, 8, 120, 450.00, 5, 'MONTHLY'),
(1, '2024-02-01 00:00:00', '2024-02-29 23:59:59', 22.300, 30.200, 12, 180, 680.50, 8, 'MONTHLY'),
(2, '2024-01-01 00:00:00', '2024-01-31 23:59:59', 8.200, 18.400, 5, 75, 320.00, 3, 'MONTHLY')
ON CONFLICT DO NOTHING;