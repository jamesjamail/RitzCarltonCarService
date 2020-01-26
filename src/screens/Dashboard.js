import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { units } from '../core/untilities';
import Bread from '../components/Bread';
import Toast from '../components/Toast';
import NewPickup from '../layouts/Home-SubComponents/NewPickup';
import MenuButton from '../components/MenuButton';
import MainScreen from '../layouts/Home-SubComponents/MainScreen';
import MapBackground from '../components/MapBackground';
import PrePickupInfo from '../layouts/PickupInfo-SubComponents/PrePickupInfo';
import { setUserData } from '../redux/actions';

const Home = ({ region, userData, navigation, fromLocation, toLocation }) => {
   const [page, setPage] = useState("home");
   // Boolean to indicate whether this is a scheduled ride or an immediate request
   const [scheduled, setScheduled] = useState(true);
   const [toast, setToast] = useState({ value: "", type: "" });
   const [visible, setVisibility] = useState(false);

   useEffect(() => {
      if (userData.displayName) {
         setToast({
            type: "success",
            value: `Welcome, ${userData.displayName}`
         });
      };
   }, [userData.displayName]);

   return (
      <>
         <MapBackground region={region} fromLocation={fromLocation} toLocation={toLocation} />
         <View style={styles.container}>
            {(() => {
               switch (page) {
                  case "new pickup":
                     return (
                        <NewPickup setPage={setPage} scheduled={scheduled} />
                     )
                  case "pickup info":
                     return (
                        <PrePickupInfo setPage={setPage} />
                     )
                  default:
                     return (
                        <MainScreen setPage={setPage} setScheduled={setScheduled} />
                     )
               }
            })()}
         </View>

         <Bread
            visible={visible}
            navigation={navigation}
            setPage={setPage}
            userData={userData}
            setUserData={setUserData}
            onDismiss={() => setVisibility(false)}
         />

         <Toast
            type={toast.type}
            message={toast.value}
            onDismiss={() => setToast({ value: "", type: "" })}
         />
         <MenuButton onPress={() => setVisibility(true)} setVisibility={setVisibility} />
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      height: 100 * units.vh,
      width: 100 * units.vw,
      alignItems: "center"
   }
});

const mapStateToProps = ({ geoLocation, userData, fromLocation, toLocation }) => {
   return {
      region: geoLocation,
      userData: userData,
      fromLocation: fromLocation,
      toLocation: toLocation
   }
};

const mapDispatchToProps = {
   setUserData: setUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);