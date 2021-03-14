import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AllStacks from "./userStacks/AllStacks";
import About from "../src/components/About";
import AllActivities from "../src/components/AdminPages/AllActivities";
import ShiftAllocation from "../src/components/AdminPages/ShiftAllocation";
import ReviewIncident from "../src/components/AdminPages/ReviewIncident";
import Communication from "../src/components/AdminPages/Communication";

import CommunicationUser from "../src/components/UserPages/CommunicationUser";
import MyActivities from "../src/components/UserPages/MyActivities";
import MyShiftHome from "../src/components/UserPages/MyShift";
import ReportIncident from "../src/components/UserPages/ReportIncident";
import ViewIncident from "../src/components/UserPages/ViewIncident";
import Home from "../src/components/controllers/Home";
import AllActivityStack from "../src/components/extraStackPages/adminStack/activityStack";
import MyActivityStack from "../src/components/extraStackPages/userStack/activityStack";
import CommunicationStack from "../src/components/extraStackPages/adminStack/communicationsStack";
import ShiftAllocationStack from "./components/extraStackPages/adminStack/shiftAllocationStack";
import CommunicationsUserStack from "./components/extraStackPages/userStack/communicationUserStacks";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-native";

import { logout } from "../src/redux/actions/userLogin";

const Drawer = createDrawerNavigator();

function AdminSideDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AllStacks"
        options={{ title: "Home" }}
        component={AllStacks}
      />
      <Drawer.Screen
        name="AllActivityStack"
        options={{ title: "All Activities" }}
        component={AllActivityStack}
      />
      {/* <Drawer.Screen
        name="ShiftAllocationStack"
        options={{ title: "Shift Allocation" }}
        component={ShiftAllocationStack}
      /> */}
      <Drawer.Screen
        name="ReviewIncident"
        options={{ title: "Review Incident" }}
        component={ReviewIncident}
      />
      <Drawer.Screen
        name="CommunicationStack"
        options={{ title: "Communication" }}
        component={CommunicationStack}
      />
      <Drawer.Screen
        name="About"
        options={{ title: "About" }}
        component={About}
      />
    </Drawer.Navigator>
  );
}

function UserSideDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AllStacks"
        options={{ title: "Home" }}
        component={AllStacks}
      />
      <Drawer.Screen
        name="MyActivityStack"
        options={{ title: "My Activities" }}
        component={MyActivityStack}
      />
      <Drawer.Screen
        name="MyShift"
        options={{ title: "My Shifts" }}
        component={MyShiftHome}
      />
      <Drawer.Screen
        name="ReportIncident"
        options={{ title: "Report Incident" }}
        component={ReportIncident}
      />
      <Drawer.Screen
        name="ViewIncident"
        options={{ title: "View Incident" }}
        component={ViewIncident}
      />
      <Drawer.Screen
        name="CommunicationsUserStack"
        options={{ title: "Communication" }}
        component={CommunicationsUserStack}
      />
      <Drawer.Screen
        name="About"
        options={{ title: "About" }}
        component={About}
      />
    </Drawer.Navigator>
  );
}

const AppDrawer = ({ currentUser }) => {
  return currentUser.accessLevel == "0" ? AdminSideDrawer() : UserSideDrawer();
};

const mapStateToProps = (store) => ({
  currentUser: store.userReducer.user,
});

const mapDispatchProps = (dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AppDrawer);
