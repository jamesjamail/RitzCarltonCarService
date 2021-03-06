import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate, updateToLocation, updateFromLocation } from '../../redux/actions';
import CancelModal from './CancelModal';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper'
import Button from '../../components/Button';
import { theme } from '../../core/theme';
import { units } from '../../core/untilities'
import dateParser from '../../components/dateParser';
import DetailsModal from './DetailsModal';

const PrePickupInfo = props => {
    let [modalOpen, setModalOpen] = useState(false);
    let [detailsOpen, setDetailsOpen] = useState(false);

    const pickup = props.scheduledPickups[props.currentPickup];

    return (
        <>
            <View style={styles.statusContainer}>
                <Text style={styles.bannerText}>
                    Ride Scheduled For: {dateParser.getDateFromDate(pickup.estimatedStartTime)}
                </Text>
            </View>

            <View style={styles.pickupTimeContainer}>
                <Text style={styles.bannerText}>
                    Departure Time: {dateParser.getTimeFromDate(pickup.estimatedStartTime)}
                </Text>
            </View>

            <View style={styles.contactButtonPosition}>
                <Button
                    style={styles.contactButton}
                    labelStyle={styles.contactButtonText}
                    onPress={() => { setDetailsOpen(true) }}
                >
                    <Text>
                        View Details
                    </Text>
                </Button>
            </View>

            <Button
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonText}
                onPress={() => { setModalOpen(true) }}
            >
                Cancel Request
            </Button>

            <View style={styles.buttonContainer}>
                <Button onPress={() => { 
                    // Reset both the From and To Locations to be the same
                    let resetOrigin = {};
                    resetOrigin['lat'] = props.geoLocation.latitude;
                    resetOrigin['lng'] = props.geoLocation.longitude; 
                    
                    props.updateToLocation(null);
                    props.updateFromLocation(resetOrigin);
                    props.setPage("home")
                    
                }}>
                Back
                </Button>
            </View>

            <Provider>
                <Portal>
                    <Modal
                        visible={modalOpen}
                    >
                        <CancelModal setModalOpen={setModalOpen} setPage={props.setPage} id={pickup.pickupId} />
                    </Modal>
                </Portal>
            </Provider>

            <Provider>
                <Portal>
                    <Modal visible={detailsOpen}>
                        <DetailsModal setDetailsOpen={setDetailsOpen} pickup={pickup} />
                    </Modal>
                </Portal>
            </Provider>

        </>
    )
}

const mapStateToProps = state => {
    return {
        scheduledPickups: state.scheduledPickups,
        currentPickup: state.currentPickup,
        geoLocation: state.geoLocation
    }
}

const mapDispatchToProps = {
    navigate: navigate,
    updateToLocation: updateToLocation,
    updateFromLocation: updateFromLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(PrePickupInfo);

const styles = StyleSheet.create({
    statusContainer: {
        width: 100 * units.vw,
        height: 4 * units.vh,
        top: 12 * units.vh,
        backgroundColor: theme.colors.accentSecondary,
        alignItems: "center",
        justifyContent: "center"
    },
    pickupTimeContainer: {
        width: 100 * units.vw,
        height: 4 * units.vh,
        top: 14 * units.vh,
        backgroundColor: theme.colors.accentSecondary,
        alignItems: "center",
        justifyContent: "center"
    },
    bannerText: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        color: theme.colors.secondary,
        fontSize: 22,
        letterSpacing: 2
    },
    contactButtonPosition: {
        width: 80 * units.vw,
        height: 5 * units.vh,
        top: 14 * units.vh
    },
    contactButton: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.primary,
    },
    contactButtonText: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        letterSpacing: 2,
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 28,
        color: theme.colors.secondary,
    },
    bottomContainer: {
        width: 94 * units.vw,
        height: 15 * units.vh,
        borderRadius: 10,
        top: 62 * units.vh,
        backgroundColor: theme.colors.secondary,
        alignItems: "center"
    },
    cancelButton: {
        width: 94 * units.vw,
        backgroundColor: "red",
        borderRadius: 10,
        height: 8 * units.vh,
        top: 60 * units.vh
    },
    cancelButtonText: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        letterSpacing: 2,
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: 50,
        color: theme.colors.secondary,
    },
    driverInfo: {
        flex: 1,
        flexDirection: "row"
    },
    driverPic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    driverName: {
        flex: 4,
        alignItems: "center"
    },
    buttonContainer: {
        top: 58 * units.vh,
        width: 94 * units.vw
    },
    backButton: {
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
    }
})