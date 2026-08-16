// js/ai-assistant.js
// Guide Dashboard용 AI Assistant 기본 구현
// - 명령어 입력
// - 관광지 이름 추출
// - /api/addPlace 로 요청 보내 Firestore에 저장 (백엔드에서 처리)

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("aiCommandInput");
    const sendBtn = document.getElementById("aiSendButton");
    const logBox = document.getElementById("aiLog");

    if (!input || !sendBtn || !logBox) {
        console.warn("AI Assistant UI 요소가 없습니다. HTML에 입력창/버튼/로그 영역을 추가하세요.");
        return;
    }

    sendBtn.addEventListener("click", () => {
        const command = input.value.trim();
        if (!command) {
            appendLog("⚠️ 명령어를 입력하세요.");
            return;
        }
        handleCommand(command);
        input.value = "";
    });

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            sendBtn.click();
        }
    });

    function appendLog(message) {
        const row = document.createElement("div");
        row.textContent = message;
        logBox.appendChild(row);
        logBox.scrollTop = logBox.scrollHeight;
    }

    async function handleCommand(command) {
        appendLog(`👤 명령어: ${command}`);

        // 예: "Dubai Frame 관광지 정보 입력해줘"
        if (command.includes("관광지") && command.includes("입력")) {
            const placeName = extractPlaceName(command);
            if (!placeName) {
                appendLog("⚠️ 관광지 이름을 찾을 수 없습니다. 예: 'Dubai Frame 관광지 정보 입력해줘'");
                return;
            }

            appendLog(`🤖 관광지 '${placeName}' 정보를 생성하고 Firestore에 저장합니다...`);

            try {
                const res = await fetch("/api/addPlace", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ placeName })
                });

                const data = await res.json();

                if (data.success) {
                    appendLog(`✅ '${placeName}' 관광지 정보가 Firestore에 저장되었습니다.`);
                } else {
                    appendLog(`❌ 저장 중 오류 발생: ${data.error || "알 수 없는 오류"}`);
                }
            } catch (err) {
                appendLog(`❌ 서버 통신 오류: ${err.message}`);
            }

            return;
        }

        // 예: "두바이 주요 관광지 20개 자동 생성해줘"
        if (command.includes("주요 관광지") && command.includes("자동 생성")) {
            appendLog("🤖 '주요 관광지 자동 생성' 기능은 아직 준비 중입니다.");
            return;
        }

        appendLog("ℹ️ 아직 지원하지 않는 명령어입니다. 예: 'Dubai Frame 관광지 정보 입력해줘'");
    }

    function extractPlaceName(command) {
        // 아주 단순한 버전: "관광지" 앞부분을 이름으로 가정
        // 예: "Dubai Frame 관광지 정보 입력해줘" → "Dubai Frame"
        const idx = command.indexOf("관광지");
        if (idx === -1) return null;
        return command.slice(0, idx).trim();
    }
}
);

