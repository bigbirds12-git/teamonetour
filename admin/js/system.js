import { db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.loadSystem = async function() {
    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>시스템 설정</h2>
            <p>공지사항을 등록하거나 시스템 메시지를 수정할 수 있습니다.</p>

            <textarea id="noticeText" placeholder="공지사항 입력" 
                      style="width:100%; height:120px;"></textarea><br><br>

            <button onclick="saveNotice()" 
                    style="background:#2563eb; color:white; padding:10px 20px;">
                공지사항 저장
            </button>

            <div id="noticeStatus" style="margin-top:10px;"></div>
        </div>
    `;

    loadNotice();
};

async function loadNotice() {
    const docRef = doc(db, "system", "notice");
    const snap = await getDoc(docRef);

    if (snap.exists()) {
        document.getElementById("noticeText").value = snap.data().message;
    }
}

window.saveNotice = async function() {
    const message = document.getElementById("noticeText").value;
    const status = document.getElementById("noticeStatus");

    await setDoc(doc(db, "system", "notice"), { message });

    status.innerText = "공지사항이 저장되었습니다.";
    status.style.color = "green";
};
