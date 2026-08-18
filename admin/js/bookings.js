import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.loadBookings = async function() {
    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>예약 전체 관리</h2>
            <p>예약 목록을 확인하고 상태를 변경할 수 있습니다.</p>
            <div id="bookingList">불러오는 중...</div>
        </div>
    `;
    loadBookingList();
};

async function loadBookingList() {
    const listDiv = document.getElementById("bookingList");
    listDiv.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "bookings"));

    querySnapshot.forEach(docSnap => {
        const b = docSnap.data();
        const id = docSnap.id;

        listDiv.innerHTML += `
            <div style="padding:10px; border-bottom:1px solid #ddd;">
                <strong>${b.userName}</strong> 님<br>
                가이드: ${b.guideName}<br>
                날짜: ${b.date}<br>
                상태: <span style="color:blue;">${b.status}</span><br><br>

                <button onclick="updateBookingStatus('${id}', 'confirmed')" 
                        style="background:#10b981; color:white; padding:5px 10px; margin-right:10px;">
                    예약 확정
                </button>

                <button onclick="updateBookingStatus('${id}', 'cancelled')" 
                        style="background:#ef4444; color:white; padding:5px 10px;">
                    예약 취소
                </button>
            </div>
        `;
    });
}

window.updateBookingStatus = async function(id, newStatus) {
    await updateDoc(doc(db, "bookings", id), { status: newStatus });
    loadBookingList();
};
