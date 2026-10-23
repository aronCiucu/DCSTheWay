// Change this one value before building:
//
// true  = your preferred Unit Import setup
// false = customer/general-release setup
//
export const PERSONAL_BUILD = false;

export const UNIT_IMPORT_CONFIG = PERSONAL_BUILD
  ? {
      showWithinFilter: true,
      maxWithinRadius: 1000,
    }
  : {
      showWithinFilter: false,
      maxWithinRadius: 10,
    };
