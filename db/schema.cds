namespace supplylens.db;

/**
 * Customer Master
 */
entity T_CUSTOMER {

    key CUSTOMER_ID    : String(20); // Customer ID

        CUSTOMER_NAME  : String(100) not null; // Customer name
        CUSTOMER_TYPE  : String(30); // OEM, Distributor, Tier1
        COUNTRY_CODE   : String(3); // ISO country code
        REGION         : String(30); // Asia Pacific, North America, EMEA
        ACTIVE_FLG     : Boolean default true not null; // Soft delete flag

        CHIPSETS       : Composition of many T_CHIPSET
                             on CHIPSETS.CUSTOMER = $self; // Customer chipsets

        DEMAND_SIGNALS : Composition of many T_DEMAND_SIGNAL
                             on DEMAND_SIGNALS.CUSTOMER = $self; // Customer demand rows

        CREATED_AT     : Timestamp  @cds.on.insert: $now; // Created timestamp
        CHANGED_AT     : Timestamp  @cds.on.insert: $now  @cds.on.update: $now; // Modified timestamp
}

/**
 * Plant Master
 */
entity T_PLANT {

    key PLANT_ID     : String(20); // Plant ID

        PLANT_NAME   : String(100) not null; // Plant name
        PLANT_TYPE   : String(30); // OEM_WH, OSAT_FG, VMI
        COUNTRY_CODE : String(3); // ISO country code
        REGION       : String(30); // Asia Pacific, North America, EMEA
        ACTIVE_FLG   : Boolean default true not null; // Soft delete flag

        BOM_LINES    : Composition of many T_BOM_LINE
                           on BOM_LINES.PLANT = $self; // BOM plant lines

        OEM_STOCKS   : Composition of many T_OEM_STOCK
                           on OEM_STOCKS.PLANT = $self; // Plant stock snapshots

        CREATED_AT   : Timestamp  @cds.on.insert: $now; // Created timestamp
        CHANGED_AT   : Timestamp  @cds.on.insert: $now  @cds.on.update: $now; // Modified timestamp
}

/**
 * Chipset Master
 */
entity T_CHIPSET {

    key CHIPSET_ID          : String(20); // Business chipset ID (e.g. BC-A1)

        CHIPSET_RISK_SCORES : Composition of many T_RISK_SCORE_CHIPSET
                                  on CHIPSET_RISK_SCORES.CHIPSET = $self; // Daily chipset scores
        OEM_STOCKS          : Composition of many T_OEM_STOCK
                                  on OEM_STOCKS.CHIPSET = $self; // Plant stock snapshots
        DEMAND_SIGNALS      : Composition of many T_DEMAND_SIGNAL
                                  on DEMAND_SIGNALS.CHIPSET = $self; // Customer demand rows

        SUPPLY_PLANS        : Composition of many T_SUPPLY_PLAN
                                  on SUPPLY_PLANS.CHIPSET = $self; // 26-week supply plan


        CHIPSET_NAME        : String(100) not null; // Chipset display name
        DESCRIPTION         : String(200); // Short chipset description
        PRODUCT_FAMILY      : String(50); // AI/ML, RF/5G, Automotive, Industrial
        CUSTOMER            : Association to T_CUSTOMER; // FK -> T_CUSTOMER
        SINGLE_SOURCE_FLG   : Boolean default false not null; // Single-source supplier risk flag
        ASP_USD             : Decimal(10, 2) default 0; // Average Selling Price (USD)
        ACTIVE_FLG          : Boolean default true not null; // Soft delete flag

        BOM_LINES           : Composition of many T_BOM_LINE
                                  on BOM_LINES.CHIPSET = $self; // Child BOM lines

        CREATED_AT          : Timestamp  @cds.on.insert: $now; // Created timestamp
        CHANGED_AT          : Timestamp  @cds.on.insert: $now  @cds.on.update: $now; // Last modified timestamp
}

/**
 * Supplier Master
 */
entity T_SUPPLIER {

    key SUPPLIER_ID       : String(20); // Internal supplier ID

        SUPPLIER_NAME     : String(100) not null; // Supplier display name
        SUPPLIER_TYPE     : String(20) not null; // Foundry, Substrate, Raw Material, OSAT
        ARIBA_ANID        : String(50); // Ariba Network ID
        COUNTRY_CODE      : String(3); // ISO country code
        REGION            : String(30); // Asia Pacific, North America, EMEA
        SINGLE_SOURCE_FLG : Boolean default false not null; // Sole-source supplier flag
        ACTIVE_FLG        : Boolean default true not null; // Soft delete flag

        BOM_LINES         : Composition of many T_BOM_LINE
                                on BOM_LINES.SUPPLIER = $self; // Supplier BOM lines
}

/**
 * BOM Line - Core Grain
 */
entity T_BOM_LINE {

    key LINE_ID              : String(30); // Surrogate BOM line key

        RISK_SIGNALS         : Composition of many T_RISK_SIGNAL
                                   on RISK_SIGNALS.BOM_LINE = $self; // Fired risk signals

        CHIPSET              : Association to T_CHIPSET not null; // Parent chipset
        SUPPLIER             : Association to T_SUPPLIER not null; // Supplier for BOM line
        KF_DEFINITIONS       : Composition of many T_KF_DEFINITION
                                   on KF_DEFINITIONS.BOM_LINE = $self; // KF templates
        RISK_SCORES          : Composition of many T_RISK_SCORE_BOM_LINE
                                   on RISK_SCORES.BOM_LINE = $self; // Daily line risk scores
        SYNC_LOGS            : Composition of many T_SYNC_LOG
                                   on SYNC_LOGS.BOM_LINE = $self; // Integration sync logs

        LINE_NUMBER          : String(5) not null; // BOM item number from S/4
        MATERIAL_ID          : String(30) not null; // S/4 material number
        MATERIAL_DESC        : String(200); // Material description
        TIER                 : String(20) not null; // foundry, substrate, raw_material
        PROCESS_NODE         : String(30); // Process/node info
        VOLUME_PCT           : Decimal(5, 2) default 100 not null; // Supplier volume split %
        PLANT                : Association to T_PLANT; // Production plant
        ARIBA_ANID           : String(50); // Ariba Network ID
        SHARED_COMPONENT_FLG : Boolean default false not null; // Shared component flag
        COMPONENT_SCRAP_PCT  : Decimal(5, 2); // Scrap % from S/4 BOM
        ACTIVE_FLG           : Boolean default true not null; // Soft delete flag
        VALID_FROM           : Date; // BOM validity start
        VALID_TO             : Date; // BOM validity end
}

/**
 * Key Figure Definition Master
 */
entity T_KF_DEFINITION {

    key KF_DEF_ID           : String(30); // Key figure definition ID

        TIME_SERIES         : Composition of many T_KF_TIME_SERIES
                                  on TIME_SERIES.KF_DEF = $self; // KF period values
        INVENTORY_SNAPSHOTS : Composition of many T_KF_INVENTORY_SNAPSHOT
                                  on INVENTORY_SNAPSHOTS.KF_DEF = $self; // Latest inventory snapshots
        RISK_SIGNALS        : Composition of many T_RISK_SIGNAL
                                  on RISK_SIGNALS.KF_DEF = $self; // KF risk signals

        BOM_LINE            : Association to T_BOM_LINE not null; // Parent BOM line
        KF_CODE             : String(10) not null; // F01-F07, S01-S05, inventory codes
        KF_NAME             : String(100) not null; // Key figure display name
        BUCKET_TYPE         : String(20) not null; // TS-WEEKLY, TS-MONTHLY, INVENTORY
        UOM                 : String(20); // Unit of measure
        THRESHOLD_WATCH     : Decimal(12, 4); // Watch threshold value
        THRESHOLD_CRITICAL  : Decimal(12, 4); // Critical threshold value
        DIRECTION           : String(5) default 'LOW' not null; // LOW or HIGH risk direction
        ACTIVE_FLG          : Boolean default true not null; // Soft delete flag
}

/**
 * Rolling KF Time Series
 */
entity T_KF_TIME_SERIES {

    key TS_ID             : Integer64; // Surrogate generated ID

        KF_DEF            : Association to T_KF_DEFINITION not null; // Parent KF definition
        LINE_ID           : String(30) not null; // Denormalized BOM line ID
        CHIPSET_ID        : String(20) not null; // Denormalized chipset ID
        PERIOD_LABEL      : String(10) not null; // W1, W2, M1, Jan-25
        PERIOD_START_DATE : Date not null; // Period start date
        PERIOD_END_DATE   : Date; // Period end date
        KF_VALUE          : Decimal(18, 4); // Numeric KF value
        KF_VALUE_STR      : String(50); // Display value from iFlow
        PUBLISHED_AT      : Timestamp; // Supplier publish timestamp
        RECEIVED_AT       : Timestamp
        @cds.on.insert: $now; // BTP received timestamp
        SOURCE            : String(20) default 'ARIBA_SCC' not null; // Source system
}

/**
 * Inventory Snapshots
 */
entity T_KF_INVENTORY_SNAPSHOT {

    key SNAP_ID      : Integer64; // Surrogate generated ID

        KF_DEF       : Association to T_KF_DEFINITION not null; // Parent KF definition
        LINE_ID      : String(30) not null; // Denormalized BOM line ID
        CHIPSET_ID   : String(20) not null; // Denormalized chipset ID
        KF_VALUE     : Decimal(18, 4); // Current snapshot value
        KF_VALUE_STR : String(50); // Display value from iFlow
        SNAPSHOT_AT  : Timestamp not null; // Snapshot effective timestamp
        RECEIVED_AT  : Timestamp
        @cds.on.insert: $now; // BTP received timestamp
        OWNER_TYPE   : String(10); // supplier or transit
}

/**
 * Daily BOM Line Risk Scores
 */
entity T_RISK_SCORE_BOM_LINE {

    key SCORE_ID         : Integer64; // Surrogate generated ID

        BOM_LINE         : Association to T_BOM_LINE not null; // BOM line scored
        CHIPSET_ID       : String(20) not null; // Denormalized chipset ID
        SCORE_DATE       : Date not null; // Scoring date
        COMPOSITE_SCORE  : Decimal(5, 1) not null; // Final BOM line risk score
        RISK_BAND        : String(20) not null; // Healthy, Watch, At Risk, Critical
        CAPACITY_SCORE   : Decimal(5, 1); // Capacity category score
        RAW_MAT_SCORE    : Decimal(5, 1); // Raw material category score
        CYCLE_TIME_SCORE : Decimal(5, 1); // Cycle time category score
        YIELD_SCORE      : Decimal(5, 1); // Yield category score
        EQUIPMENT_SCORE  : Decimal(5, 1); // Equipment category score
        QUALITY_SCORE    : Decimal(5, 1); // Quality/adherence score
        COMMERCIAL_SCORE : Decimal(5, 1); // Commercial category score
        FIRED_RULES      : Integer default 0 not null; // Total active fired rules
        CRITICAL_RULES   : Integer default 0 not null; // Critical severity rules
        CALC_TIMESTAMP   : Timestamp not null; // Score calculation timestamp
}

/**
 * Chipset Composite Risk Score
 */
entity T_RISK_SCORE_CHIPSET {

    key SCORE_ID        : Integer64; // Surrogate generated ID

        CHIPSET         : Association to T_CHIPSET not null; // Chipset scored
        SCORE_DATE      : Date not null; // Scoring date
        COMPOSITE_SCORE : Decimal(5, 1) not null; // MAX BOM line score
        RISK_BAND       : String(20) not null; // Healthy, Watch, At Risk, Critical
        WEAKEST_LINE    : Association to T_BOM_LINE; // Highest-risk BOM line
        FOUNDRY_SCORE   : Decimal(5, 1); // MAX foundry line score
        SUBSTRATE_SCORE : Decimal(5, 1); // MAX substrate line score
        CALC_TIMESTAMP  : Timestamp not null; // Score calculation timestamp
}

/**
 * Risk Signal Audit Log
 */
entity T_RISK_SIGNAL {

    key SIGNAL_ID      : Integer64; // Surrogate generated ID

        BOM_LINE       : Association to T_BOM_LINE not null; // BOM line where rule fired
        KF_DEF         : Association to T_KF_DEFINITION; // KF that triggered rule
        RULE_ID        : String(30); // Risk rule ID
        CATEGORY       : String(30) not null; // Capacity, Yield, Cycle Time, etc.
        SEVERITY       : String(10) not null; // LOW, MEDIUM, HIGH, CRITICAL
        SEV_MULTIPLIER : Decimal(4, 1) not null; // Severity multiplier
        FIRED_AT       : Timestamp not null; // Rule fired timestamp
        RESOLVED_AT    : Timestamp; // Rule resolved timestamp
        CONTRIBUTION   : Decimal(8, 4); // Last scoring contribution
        NOTES          : String(500); // Signal context notes
}

/**
 * OEM Chipset Stock per Plant
 */
entity T_OEM_STOCK {

    key STOCK_ID         : Integer64; // Surrogate generated ID

        CHIPSET          : Association to T_CHIPSET not null; // Chipset stocked
        PLANT            : Association to T_PLANT not null; // OEM plant
        STOCK_DATE       : Date not null; // Stock snapshot date
        UNRESTRICTED_QTY : Decimal(18, 3) default 0 not null; // Available-to-ship qty
        QUALITY_QTY      : Decimal(18, 3) default 0 not null; // Quality inspection qty
        BLOCKED_QTY      : Decimal(18, 3) default 0 not null; // Blocked stock qty
        WEEKLY_DEMAND    : Decimal(18, 3); // Rolling 4-week avg demand
        WOS              : Decimal(6, 2); // Weeks of supply
        SYNCED_AT        : Timestamp not null; // iFlow sync timestamp
}

/**
 * Customer Demand from S/4HANA
 */
entity T_DEMAND_SIGNAL {

    key DEMAND_ID     : Integer64; // Surrogate generated ID

        CHIPSET       : Association to T_CHIPSET not null; // Demanded chipset
        CUSTOMER      : Association to T_CUSTOMER; // Requesting customer
        DELIVERY_WEEK : String(10) not null; // ISO week (e.g. 2026-W25)
        DELKZ_TYPE    : String(10) not null; // AUFTR, EINTEI, PROGNOSE
        COMMITTED_QTY : Decimal(18, 3) default 0 not null; // Confirmed demand qty
        OPEN_QTY      : Decimal(18, 3) default 0 not null; // Forecast/PIR qty
        SO_NUMBER     : String(20); // Sales order or schedule agreement
        EXTRACTED_AT  : Timestamp not null; // iFlow extraction timestamp
}

/**
 * 26-Week Supply Plan
 */
entity T_SUPPLY_PLAN {

    key PLAN_ID         : Integer64; // Surrogate generated ID

        CHIPSET         : Association to T_CHIPSET not null; // Planned chipset

        PLAN_WEEK       : String(10) not null; // ISO week (e.g. 2026-W25)

        WEEK_START_DATE : Date not null; // Monday of plan week

        FIRM_QTY        : Decimal(18, 3) default 0 not null; // Confirmed PO receipts

        PLANNED_QTY     : Decimal(18, 3) default 0 not null; // Planned order qty

        FORECAST_DEMAND : Decimal(18, 3) default 0 not null; // Weekly demand qty

        OPENING_OH      : Decimal(18, 3); // Opening on-hand qty

        CLOSING_OH      : Decimal(18, 3); // Closing on-hand qty

        IS_DEFICIT      : Boolean; // TRUE if closing stock < 0

        PLAN_VERSION    : String(10) default 'CURRENT' not null; // CURRENT or ARCHIVE

        CREATED_AT      : Timestamp
        @cds.on.insert: $now; // Created timestamp
}

/**
 * Risk Engine Configuration
 */
entity T_RISK_CONFIG {

    key CONFIG_ID       : String(50); // Config key

        CONFIG_CATEGORY : String(30) not null; // DECAY, CAT_WEIGHT, SEV_MULT, THRESHOLD, BAND
        CONFIG_VALUE    : Decimal(12, 4) not null; // Numeric config value
        DESCRIPTION     : String(200); // Config description
        LAST_CHANGED_BY : String(50); // Last changed user
        CHANGED_AT      : Timestamp; // Last changed timestamp
}

/**
 * Integration Audit Log
 */
entity T_SYNC_LOG {

    key LOG_ID           : Integer64; // Surrogate generated ID

        BOM_LINE         : Association to T_BOM_LINE; // BOM line or null for batch
        SOURCE_TYPE      : String(20) not null; // ARIBA_SCC, S4HANA, MANUAL
        SYNC_TYPE        : String(20) not null; // KF, INVENTORY, DEMAND, BOM, STOCK, SCORE
        SYNC_START       : Timestamp; // Sync start timestamp
        SYNC_END         : Timestamp; // Sync end timestamp
        STATUS           : String(10) not null; // OK, WARNING, FAILED
        RECORDS_RECEIVED : Integer default 0 not null; // Records received
        RECORDS_WRITTEN  : Integer default 0 not null; // Records written
        ERROR_MESSAGE    : String(500); // Error message
        TRIGGERED_BY     : String(50) default 'SCHEDULER' not null; // SCHEDULER, USER:<id>, EVENT
}
