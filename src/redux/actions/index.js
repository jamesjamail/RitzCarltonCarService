// ----------------------
// Constants
// ----------------------
export const NAVIGATE = "NAVIGATE";
export const TO_HOME = "TO_HOME";
export const UPDATE_SCHEDULED_PICKUPS = "UPDATE_SCHEDULED_PICKUPS";
export const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';
export const UPDATE_CURRENT_PICKUP = "UPDATE_CURRENT_PICKUP";
export const SET_USER_DATA = 'SET_USER_DATA';

// ----------------------
// Actions
// ----------------------
export function navigate(page, formNum) {
    return { type: NAVIGATE, page: page, form: formNum };
};

export function toHome() {
    return { type: TO_HOME };
};

export function updateScheduledPickups(scheduledPickups) {
    return { type: UPDATE_SCHEDULED_PICKUPS, scheduledPickups: scheduledPickups };
};

export function updateGeoLocation(position) {
    return { type: GET_CURRENT_LOCATION, payload: position }
};

export function updateCurrentPickup(newPickup) {
    return { type: UPDATE_CURRENT_PICKUP, newPickup: newPickup }
};

export function setUserData(payload) {
    return { type: SET_USER_DATA, payload }
};
