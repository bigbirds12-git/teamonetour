import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.loadPlaces = async function() {
    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>관광지 등록</h2>
            <input id="placeName" placeholder="이름"><br><br>
            <input id="placeAddress" placeholder="주소"><br><br>
            <button onclick="submitPlace()">등록</button>
            <div id="placeStatus"></div>
        </div>

        <div class="card">
            <h2>관광지 목록</h2>
            <div id="placeList">불러오는 중...</div>
        </div>
    `;
    loadPlaceList();
};

window.submitPlace = async function() {
    const name = document.getElementById("placeName").value;
    const address = document.getElementById("placeAddress").value;

    await addDoc(collection(db, "places"), { name, address });
    loadPlaceList();
};

async function loadPlaceList() {
    const listDiv = document.getElementById("placeList");
    listDiv.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "places"));

    querySnapshot.forEach(docSnap => {
        const p = docSnap.data();
        const id = docSnap.id;

        listDiv.innerHTML += `
            <div style="padding:10px; border-bottom:1px solid #ddd;">
                <strong>${p.name}</strong><br>
                ${p.address}<br><br>
                <button onclick="deletePlace('${id}')">삭제</button>
            </div>
        `;
    });
}

window.deletePlace = async function(id) {
    await deleteDoc(doc(db, "places", id));
    loadPlaceList();
};
