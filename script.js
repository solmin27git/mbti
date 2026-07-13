/* --- 데이터 정의 --- */
const questions = [
    { id: "EI", q: "주말에 당신은 주로 무엇을 하나요?", a: "사람들을 만나며 에너지를 얻는다.", b: "집에서 혼자 쉬며 재충전한다." },
    { id: "NS", q: "사과를 보면 드는 생각은?", a: "빨갛고 맛있겠다. (보이는 그대로)", b: "백설공주, 아이폰, 중력... (꼬리를 무는 상상)" },
    { id: "TF", q: "친구를 위로할 때 당신의 방식은?", a: "문제를 분석하고 해결책을 제시한다.", b: "친구의 감정에 공감하고 위로해준다." },
    { id: "JP", q: "여행을 갈 때 당신 스타일은?", a: "시간별로 꼼꼼하게 일정을 짠다.", b: "목적지만 정하고 발길 닿는 대로 간다." }
];

const mbtiDescriptions = {
    "ENFJ": "따뜻하고 책임감이 강하며 사교적인 정이 많은 스타일",
    "ENFP": "열정적이고 창의적이며 항상 웃음을 잃지 않는 자유로운 영혼",
    "ENTJ": "철저하게 준비하며 열정적으로 일을 추진하는 리더 스타일",
    "ENTP": "풍부한 상상력을 가지고 새로운 도전을 즐기는 발명가형",
    "ESFJ": "친절하고 능동적이며 동료애가 깊은 협력자 스타일",
    "ESFP": "사교적이고 낙천적이며 주위 사람들을 즐겁게 하는 분위기 메이커",
    "ESTJ": "체계적이고 규칙을 준수하며 일을 효율적으로 처리하는 관리자",
    "ESTP": "현실적인 문제를 해결하는 능력이 뛰어나고 활동적인 스타일",
    "INFJ": "통찰력이 뛰어나며 사람들에게 영감을 주는 조용한 외유내강형",
    "INFP": "이상주의적이며 성실하고 이해심이 많은 마음이 따뜻한 사람",
    "INTJ": "독립적이고 의지가 강하며 창의적인 전략가 타입",
    "INTP": "비평적인 관점을 가진 뛰어난 전략가이자 사색가",
    "ISFJ": "조용하고 차분하며 헌신적이고 책임감이 강한 스타일",
    "ISFP": "말없이 다정하고 온화하며 삶의 여유를 즐기는 예술가",
    "ISTJ": "한 번 시작한 일은 끝까지 책임지는 고집 있는 현실주의자",
    "ISTP": "상황 적응력이 뛰어나고 과묵하게 문제를 해결하는 재주꾼"
};

/* --- 상태 변수 --- */
let currentIdx = 0;
let userName = "";
let scores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };

/* --- 화면 전환 함수 --- */
function changeScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

/* --- 네비게이션 함수 --- */
function goToNameScreen() {
    changeScreen('name-screen');
}

function startQuiz() {
    const input = document.getElementById('user-name');
    if(input.value.trim() === "") {
        alert("이름을 입력해주세요!");
        return;
    }
    userName = input.value;
    currentIdx = 0;
    // 점수 초기화
    scores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
    
    changeScreen('quiz-screen');
    showQuestion();
}

/* --- 퀴즈 로직 --- */
function showQuestion() {
    // 진행 바 업데이트
    const progress = (currentIdx / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    if (currentIdx >= questions.length) {
        changeScreen('end-screen');
        return;
    }

    const currentQ = questions[currentIdx];
    document.getElementById('question-text').innerText = currentQ.q;

    const btnContainer = document.getElementById('answer-buttons');
    btnContainer.innerHTML = ""; // 기존 버튼 제거

    // 첫 번째 선택지 버튼 (E, N, T, J 성향)
    const btnA = document.createElement('button');
    btnA.className = "answer-btn";
    btnA.innerText = currentQ.a;
    btnA.onclick = () => selectAnswer(currentQ.id[0]);

    // 두 번째 선택지 버튼 (I, S, F, P 성향)
    const btnB = document.createElement('button');
    btnB.className = "answer-btn";
    btnB.innerText = currentQ.b;
    btnB.onclick = () => selectAnswer(currentQ.id[1]);

    btnContainer.appendChild(btnA);
    btnContainer.appendChild(btnB);
}

function selectAnswer(type) {
    scores[type]++;
    currentIdx++;
    showQuestion();
}

/* --- 결과 도출 --- */
function showResult() {
    let mbti = "";
    mbti += (scores.E >= scores.I) ? "E" : "I";
    mbti += (scores.N >= scores.S) ? "N" : "S";
    mbti += (scores.T >= scores.F) ? "T" : "F";
    mbti += (scores.J >= scores.P) ? "J" : "P";

    document.getElementById('result-user').innerText = userName;
    document.getElementById('result-mbti').innerText = mbti;
    document.getElementById('result-desc').innerText = mbtiDescriptions[mbti] || "멋진 성향을 가지셨군요!";

    changeScreen('result-screen');
}

/* --- 초기화 및 홈으로 --- */
function goHome() {
    document.getElementById('user-name').value = "";
    changeScreen('start-screen');
}