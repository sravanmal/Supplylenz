using supplylens.db as db from '../db/schema';

service ChipsetService @(path: 'ChipsetService') {

    // Endpoint for T_CHIPSET entity
    entity Chipsets as projection on db.T_CHIPSET{
        *
    };

    // endpoint for T_KF_TIME_SERIES entity
    entity KFTimeSeries as projection on db.T_KF_TIME_SERIES {
        *
    };

    // endpoint for T_KF_INVENTORY_SNAPSHOT entity
    entity KFInventorySnapshots as projection on db.T_KF_INVENTORY_SNAPSHOT {
        *
    };



}