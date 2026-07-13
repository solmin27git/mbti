/* --- 데이터 정의 (총 12문항, 주제별 3개씩) --- */
// 답변 원칙: 
// 매우그렇다(type1에 +3), 약간그렇다(type1에 +1), 
// 약간아니다(type2에 +1), 매우아니다(type2에 +3)
const questions = [
    // E (외향) vs I (내향)
    { type1: "E", type2: "I", q: "처음 보는 사람들과도 스스럼없이 대화를 시작하는 편이다." },
    { type1: "E", type2: "I", q: "여러 친구와 모여 왁자지껄하게 노는 것이 혼자 있는 것보다 좋다." },
    { type1: "E", type2: "I", q: "주말에 집에만 있으면 무기력해지고 에너지가 빠지는 기분이다." },
    // N (직관) vs S (감각)
    { type1: "N", type2: "S", q: "이야기를 들을 때 사실 관계보다는 그 뒤에 숨겨진 의미가 더 궁금하다." },
    { type1: "N", type2: "S", q: "현실의 문제를 해결하는 것보다 미래의 가능성을 상상하는 것이 더 즐겁다." },
    { type1: "N", type2: "S", q: "종종 '엉뚱하다'거나 '생각이 너무 많다'는 말을 듣는다." },
    // T (사고) vs F (감정)
    { type1: "T", type2: "F", q: "친구가 고민을 털어놓으면 감정적 공감보다는 현실적인 조언이 먼저 떠오른다." },
    { type1: "T", type2: "F", q: "중요한 결정을 내릴 때 내 감정보다는 논리적 근거가 더 중요하다." },
    { type1: "T", type2: "F", q: "옳고 그름을 따지는 과정에서 타인의 기분이 상하더라도 할 말은 해야 한다." },
    // J (판단) vs P (인식)
    { type1: "J", type2: "P", q: "여행을 갈 때는 시간 단위로 꼼꼼하게 계획을 세워야 마음이 편하다." },
    { type1: "J", type2: "P", q: "과제나 일은 마감 기한보다 훨씬 일찍 끝내 두는 편이다." },
    { type1: "J", type2: "P", q: "주변 환경(방, 책상 등)이 항상 정돈되어 있어야 집중이 잘 된다." }
];

const mbtiDescriptions = {
    "ENFJ": "따뜻하고 책임감이 강하며 사교적인 정이 많은 정의로운 사회운동가",
    "ENFP": "열정적이고 창의적이며 항상 웃음을 잃지 않는 자유로운 영혼의 소유자",
    "ENTJ": "철저하게 준비하며 열정적으로 일을 추진하는 대담한 지도자",
    "ENTP": "풍부한 상상력을 가지고 새로운 도전을 즐기는 뜨거운 논쟁을 즐기는 변론가",
    "ESFJ": "친절하고 능동적이며 동료애가 깊은 사교적인 외교관",
    "ESFP": "사교적이고 낙천적이며 주위 사람들을 즐겁게 하는 자유로운 영혼의 연예인",
    "ESTJ": "체계적이고 규칙을 준수하며 일을 효율적으로 처리하는 엄격한 관리자",
    "ESTP": "현실적인 문제를 해결하는 능력이 뛰어나고 활동적인 모험을 즐기는 사업가",
    "INFJ": "통찰력이 뛰어나며 사람들에게 영감을 주는 조용한 외유내강형 선의의 옹호자",
    "INFP": "이상주의적이며 성실하고 이해심이 많은 마음이 따뜻한 열정적인 중재자",
    "INTJ": "독립적이고 의지가 강하며 창의적인 용의주도한 전략가",
    "INTP": "비평적인 관점을 가진 뛰어난 전략가이자 논리적인 사색가",
    "ISFJ": "조용하고 차분하며 헌신적이고 책임감이 강한 용감한 수호자",
    "ISFP": "말없이 다정하고 온화하며 삶의 여유를 즐기는 호기심 많은 예술가",
    "ISTJ": "한 번 시작한 일은 끝까지 책임지는 고집 있는 청렴결백한 논리주의자",
    "ISTP": "상황 적응력이 뛰어나고 과묵하게 문제를 해결하는 만능 재주꾼",
    "UNKNOWN": "알 수 없는 신비로운 성향을 가지셨군요!"
};

// 척도 버튼 데이터 정의
const answerOptions = [
    { text: "매우<br>그렇다", class: "btn-very-agree", scoreType: "type1", score: 3 },
    { text: "약간<br>그렇다", class: "btn-somewhat-agree", scoreType: "type1", score: 1 },
    { text: "약간<br>아니다", class: "btn-somewhat-disagree", scoreType: "type2", score: 1 },
    { text: "매우<br>아니다", class: "btn-very-disagree", scoreType: "type2", score: 3 }
];

/* --- 상태 변수 --- */
let currentIdx = 0;
let userName = "";
// 모든 성향 0점으로 초기화
let scores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };

/* --- 화면 전환 함수 --- */
function changeScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

/* --- 네비게이션 함수 --- */
function goToNameScreen() {
    changeScreen('name-screen');
    document.getElementById('user-name').focus();
}

function startQuiz() {
    const input = document.getElementById('user-name');
    if(input.value.trim() === "") {
        alert("이름을 입력해주세요!");
        input.focus();
        return;
    }
    userName = input.value;
    currentIdx = 0;
    // 점수 및 UX 초기화
    scores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
    
    changeScreen('quiz-screen');
    showQuestion();
}

/* --- 퀴즈 로직 (척도형) --- */
function showQuestion() {
    // 1. 진행도 업데이트
    const totalQ = questions.length;
    document.getElementById('progress-text').innerText = `${currentIdx + 1} / ${totalQ}`;
    const progress = ((currentIdx) / totalQ) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    // 2. 질문 출력
    const currentQ = questions[currentIdx];
    document.getElementById('question-text').innerText = currentQ.q;

    // 3. 4점 척도 버튼 생성
    const btnContainer = document.getElementById('answer-buttons');
    btnContainer.innerHTML = ""; // 기존 버튼 초기화

    answerOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.className = `likert-btn ${option.class}`;
        btn.innerHTML = option.text; // <br> 사용을 위해 innerHTML
        
        // 버튼 클릭 시 점수 계산 및 다음 질문으로 이동
        btn.onclick = () => {
            // 어느 성향(예: E)에 몇 점(예: 3)을 더할지 결정
            const targetType = currentQ[option.scoreType];
            scores[targetType] += option.score;
            
            nextQuestion();
        };
        
        btnContainer.appendChild(btn);
    });
}

function nextQuestion() {
    currentIdx++;
    if (currentIdx < questions.length) {
        showQuestion();
    } else {
        // 모든 질문 완료 시 게이지 100% 채우고 종료 화면으로
        document.getElementById('progress-bar').style.width = `100%`;
        setTimeout(() => changeScreen('end-screen'), 300);
    }
}

/* --- 결과 분석 및 도출 --- */
function showResult() {
    let mbti = "";
    // 점수가 높은 쪽을 선택, 같으면 앞쪽 성향(E, N, T, J)을 우선
    mbti += (scores.E >= scores.I) ? "E" : "I";
    mbti += (scores.N >= scores.S) ? "N" : "S";
    mbti += (scores.T >= scores.F) ? "T" : "F";
    mbti += (scores.J >= scores.P) ? "J" : "P";

    // 결과 화면에 데이터 매칭
    document.getElementById('result-user').innerText = userName;
    document.getElementById('result-mbti').innerText = mbti;
    // mbtiDescriptions에 없는 경우에 대한 예외 처리
    document.getElementById('result-desc').innerText = mbtiDescriptions[mbti] || mbtiDescriptions["UNKNOWN"];

    changeScreen('result-screen');
}

/* --- 메인으로 돌아가기 (초기화) --- */
function goHome() {
    document.getElementById('user-name').value = "";
    changeScreen('start-screen');
}
