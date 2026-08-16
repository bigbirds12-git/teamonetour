// /api/addPlace.js
// AI가 생성한 관광지 정보를 Firestore에 저장하는 API

import express from "express";
import { generatePlaceInfo } from "../js/ai-place-generator.js";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase 초기화
const firebaseConfig = {
    apiKey: "AIzaSyCgOSQsv_MRdaqrW4wJw0q2QY6wXZ-azQs",
    authDomain: "guidelogin-b0053.firebaseapp.com",
    projectId: "guidelogin-b0053",
    storageBucket: "guidelogin-b0053.firebasestorage.app",
    messagingSenderId: "981519805247",
    appId: "1:981519805247:web:cc32682b177a4957c0818a",
    measurementId: "G-2VR4TS6JND"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { placeName } = req.body;

        if (!placeName) {
            return res.status(400).json({
                success: false,
                error: "placeName이 없습니다."
            });
        }

        // 1) AI에게 관광지 정보 생성 요청
        const placeData = await generatePlaceInfo(placeName);

        if (!placeData || !placeData.id) {
            return res.status(500).json({
                success: false,
                error: "AI가 올바른 데이터를 생성하지 못했습니다."
            });
        }

        // 2) Firestore에 저장
        await setDoc(doc(db, "travel_places", placeData.id), placeData);

        // 3) 성공 응답
        return res.json({
            success: true,
            data: placeData
        });

    } catch (error) {
        console.error("addPlace 오류:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;

