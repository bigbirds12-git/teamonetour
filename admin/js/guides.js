import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.loadGuides = async function() {
    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>가이드 승인/관리</h2>
            <div id="guideList">불러오는 중...</div>
        </div>
    `;
    loadGuideList();
};

async function loadGuideList() {
    const listDiv = document.getElementById("guideList");
    listDiv.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "guides"));

    querySnapshot.forEach(docSnap => {
        const g = docSnap.data();
        const id = docSnap.id;

        listDiv.innerHTML += `
            <div style="padding:10px; border-bottom:1px solid #ddd;">
                <strong>${g.name}</strong><br>
                연락처: ${g.phone}<br>
                상태: <span>${g.status}</span><br><br>

                <button onclick="updateGuideStatus('${id}', 'approved')">승인</button>
                <button onclick="updateGuideStatus('${id}', 'rejected')">거절</button>
            </div>
        `;
    });
}

window.updateGuideStatus = async function(id, newStatus) {
    await updateDoc(doc(db, "guides", id), { status: newStatus });
    loadGuideList();
};
