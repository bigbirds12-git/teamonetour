// js/ai-place-generator.js
// AI에게 관광지 정보를 생성하도록 요청하는 모듈
// - placeName을 받아 AI API로 전송
// - AI가 JSON 형태로 관광지 정보를 생성하여 반환

export async function generatePlaceInfo(placeName) {
    if (!placeName) {
        throw new Error("placeName이 비어 있습니다.");
    }

    // AI에게 보낼 프롬프트
    const prompt = `
'${placeName}' 관광지 정보를 JSON으로 생성해줘.
필드는 다음과 같아야 합니다:

{
  "id": "",
  "name": "",
  "city": "",
  "country": "",
  "description": "",
  "category": [],
  "highlights": [],
  "opening_hours": "",
  "recommended_time": "",
  "ticket_price": "",
  "source": "AI Generated"
}

설명은 1~2문장으로 작성하고,
category와 highlights는 2~4개 정도로 구성해줘.
`;

    try {
        // AI API 호출
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const result = await response.json();

        if (!result || !result.data) {
            throw new Error("AI 응답이 올바르지 않습니다.");
        }

        // Firestore 저장용 ID 생성
        result.data.id = placeName.toLowerCase().replace(/\s+/g, "_");

        return result.data;

    } catch (error) {
        console.error("AI 관광지 생성 오류:", error);
        throw new Error("AI 관광지 생성 중 오류 발생: " + error.message);
    }
}

