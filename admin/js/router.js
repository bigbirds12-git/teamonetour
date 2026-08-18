import { auth } from "./firebase.js";

window.navigate = function(page) {
    if (page === "dashboard") window.loadDashboard();
    if (page === "places") window.loadPlaces();
    if (page === "guides") window.loadGuides();
    if (page === "bookings") window.loadBookings();
    if (page === "system") window.loadSystem();
};

window.logout = function() {
    auth.signOut();
};
