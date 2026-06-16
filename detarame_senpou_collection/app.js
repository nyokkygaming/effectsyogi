(() => {
  "use strict";

  const PIECE_LABEL = {
    K: "玉", R: "飛", B: "角", G: "金", S: "銀", N: "桂", L: "香", P: "歩"
  };
  const PROMOTED_LABEL = {
    R: "龍", B: "馬", S: "全", N: "圭", L: "杏", P: "と"
  };
  const HAND_ORDER = ["R", "B", "G", "S", "N", "L", "P"];
  const SIDE_NAME = { black: "先手", white: "後手" };
  const OPP = { black: "white", white: "black" };
  const STORAGE_KEY = "detarame-senpou-collection-v1";
  const HUMAN_SIDE = "black";
  const CPU_SIDE = "white";
  const CPU_THINK_DELAY = 1200;


  const TERMS = {
    "castle": [
        "パンダ囲い",
        "こたつ囲い",
        "レジ袋囲い",
        "ふとん囲い",
        "町内会囲い",
        "カピバラ囲い",
        "湯のみ囲い",
        "日傘囲い",
        "体育座り",
        "二度寝囲い",
        "ほぼ穴熊囲い",
        "玄関先囲い",
        "回覧板囲い",
        "冷蔵庫囲い",
        "雨宿り",
        "うす味囲い",
        "ビニール傘囲い",
        "ぬれせんべい囲い",
        "半ドア囲い",
        "留守番囲い",
        "おしぼり囲い",
        "給湯室囲い",
        "エコバッグ囲い",
        "休日出勤",
        "畳のへり囲い",
        "しょうゆ皿囲い",
        "引きこもり",
        "狭小住宅",
        "ウナギの寝床",
        "ゴミ屋敷",
        "雑居ビル"
    ],
    "move": [
        "重役出勤",
        "とんぼ返り",
        "快速急行",
        "左折専用",
        "いったん実家",
        "逆走",
        "終電ダッシュ",
        "ランダムウォーク",
        "慣性の法則",
        "等速直線運動",
        "放物線運動",
        "大陸移動説",
        "プレート境界",
        "ワープ航法",
        "並進運動",
        "ベクトル解析",
        "ドップラー効果",
        "参勤交代"
    ],
    "retreat": [
        "金バック",
        "いったん保留",
        "トイレ休憩",
        "有給申請",
        "現地解散",
        "帰宅部",
        "早退",
        "戦略的撤退",
        "ズル休み",
        "遅延証明",
        "事故渋滞",
        "雲隠れ"
    ],
    "wait": [
        "置きっぱなし",
        "うす味",
        "二度寝",
        "月曜の朝",
        "エレベーター待ち",
        "既読スルー",
        "微調整",
        "なんとなく",
        "外気浴",
        "定点観測",
        "経過観察",
        "現状維持バイアス",
        "保留音",
        "棚卸資産",
        "減価償却",
        "凪",
        "微分係数",
        "校正待ち",
        "要経過観察"
    ],
    "promote": [
        "課長代理",
        "名刺交換",
        "二階級特進",
        "捨てアカ転生",
        "雨後の竹の子",
        "NASDAQ上場",
        "試用期間",
        "スキマバイト",
        "留年回避",
        "株式公開",
        "上方修正",
        "昇格人事",
        "キャリアアップ",
        "正社員登用",
        "クラスチェンジ",
        "形態変化",
        "進化論",
        "変態",
        "事業拡大"
    ],
    "check": [
        "町内放送",
        "緊急連絡網",
        "管理会社からのお知らせ",
        "最終通告",
        "玄関にいます",
        "逃げ場なし弁当",
        "完全なる昼寝",
        "差し押さえ予告通知",
        "内容証明郵便",
        "強制執行",
        "最終警告",
        "非常警報",
        "レッドアラート",
        "臨界点",
        "デッドライン",
        "行政指導",
        "立入検査",
        "差押予告"
    ],
    "general": [
        "からし大根",
        "歩の前身",
        "日焼け止め戦法",
        "アンドロメダ",
        "ぬれせんべい",
        "夕方のチャイム",
        "ほぼカニ",
        "玄関マット",
        "逆さまプリン",
        "二度寝",
        "置きっぱなし",
        "うす味",
        "町内放送",
        "ななめドーナツ",
        "ポケットティッシュ",
        "カピバラ温泉",
        "目薬",
        "ほうじ茶",
        "ちくわぶ",
        "月曜の朝",
        "エレベーター待ち",
        "うっすら雪",
        "斜め上のレシート",
        "さよなら三角",
        "無印良手",
        "概念",
        "第三駐車場",
        "非常口",
        "だいたい水曜日",
        "サラダバー",
        "試食コーナー",
        "町中華",
        "地下駐輪場",
        "逆立ちペンギン",
        "ぬるま湯",
        "折りたたみイス",
        "なんかのフタ",
        "予備のボタン",
        "迷子センター",
        "充電3％",
        "半額シール",
        "立入禁止",
        "無人販売所",
        "からあげ棒",
        "紙ストロー",
        "途中下車",
        "雨天決行",
        "深夜バス",
        "再配達",
        "冷房直撃",
        "うっかり八兵衛",
        "お徳用",
        "ラストオーダー",
        "文化祭前日",
        "保健室登校",
        "微炭酸",
        "再起動",
        "見切り品",
        "謎の段差",
        "ドップラー効果",
        "シュレディンガーの猫",
        "プレートテクトニクス",
        "相対性理論",
        "ピタゴラスの定理",
        "ランゲルハンス島",
        "マントル対流",
        "フレミング左手の法則",
        "大陸棚",
        "ブラックホール",
        "確定申告",
        "損益分岐点",
        "アンモナイト",
        "前方後円墳",
        "地動説",
        "ストックホルム症候群",
        "パブロフの犬",
        "クーリングオフ",
        "三権分立",
        "エントロピー",
        "フィボナッチ数列",
        "ベルヌーイの定理",
        "メンデルの法則",
        "光合成",
        "三角関数",
        "虚数単位",
        "フェルマーの最終定理",
        "モホロビチッチ不連続面",
        "関ヶ原の戦い",
        "参勤交代",
        "ノルマンディー上陸作戦",
        "ペニシリン",
        "ヘモグロビン",
        "ミトコンドリア",
        "プランクトン",
        "サバンナ気候",
        "六法全書",
        "内容証明郵便",
        "株主総会",
        "減価償却",
        "等速直線運動",
        "放物線運動",
        "大陸移動説",
        "ワープ航法",
        "並進運動",
        "ベクトル解析",
        "定点観測",
        "経過観察",
        "現状維持バイアス",
        "棚卸資産",
        "要経過観察",
        "強制執行",
        "非常警報",
        "レッドアラート",
        "臨界点",
        "正社員登用",
        "株式公開",
        "上方修正",
        "形態変化"
    ]
};

  const CATEGORY_LABEL = {
    castle: "囲いっぽい何か",
    move: "移動系デタラメ",
    retreat: "撤退系デタラメ",
    wait: "地味手系デタラメ",
    promote: "成り系デタラメ",
    check: "王手系デタラメ",
    general: "一般系デタラメ"
  };

  const SUBTITLES = {
    "パンダ囲い": "守っているのか、寝ているのか。",
    "こたつ囲い": "出たら最後、春まで動かない。",
    "体育座り": "守備力よりも哀愁が高い。",
    "雨宿り": "攻めが止むまで、ここにいます。",
    "引きこもり": "玉の在宅率が高すぎる。",
    "狭小住宅": "守れているが、生活動線がない。",
    "ウナギの寝床": "細長く、そして妙に落ち着く。",
    "ゴミ屋敷": "守り駒が多い。整理はされていない。",
    "雑居ビル": "誰が何を守っているのか不明。",
    "重役出勤": "今ごろ来たのに、なぜか偉そう。",
    "ランダムウォーク": "意味は後からついてくる。たぶん。",
    "等速直線運動": "まっすぐ行った。それだけで理科っぽい。",
    "放物線運動": "桂馬が急に物理になった。",
    "ワープ航法": "合法手なのに、気持ちは瞬間移動。",
    "戦略的撤退": "逃げではない。資料上は。",
    "ズル休み": "盤上から気配だけ消した。",
    "遅延証明": "到着は遅れたが、理由はある。",
    "事故渋滞": "進みたい気持ちは、現地にあります。",
    "雲隠れ": "いたはずの駒が、急に不在票になった。",
    "外気浴": "なぜか一手だけ整った。",
    "経過観察": "動いた。だからといって変わったとは限らない。",
    "現状維持バイアス": "変えたようで、変えたくない。",
    "要経過観察": "専門家も様子を見ることにした。",
    "課長代理": "成った瞬間、責任だけ増えた。",
    "二階級特進": "急にえらくなった。理由は聞かない。",
    "捨てアカ転生": "別名義で、もう一度はじめます。",
    "NASDAQ上場": "評価額だけは急上昇。",
    "留年回避": "ギリギリで成れた。えらい。",
    "正社員登用": "ついに盤上で雇用が安定した。",
    "株式公開": "急に市場の視線を浴びた。",
    "形態変化": "成っただけなのに、生物っぽい。",
    "差し押さえ予告通知": "王様宛てに、重要なお知らせです。",
    "内容証明郵便": "逃げても記録は残ります。",
    "強制執行": "もうお願いの段階は終わりました。",
    "レッドアラート": "盤上の空気が赤くなった。",
    "アンドロメダ": "盤上のスケールを急に超えた。",
    "ほぼカニ": "完全なカニではない。それが重要。",
    "無印良手": "派手さはないが、棚にあると助かる。",
    "からし大根": "辛味が盤面に染みわたる。",
    "歩の前身": "前に進むという強い意志。",
    "日焼け止め戦法": "守っている対象が、日差しなのか王なのか。",
    "充電3％": "まだ動く。だが予断は許さない。",
    "なんかのフタ": "重要そうで、何のフタか分からない。",
    "地下駐輪場": "盤面の地下に、何かを停めた。",
    "ランゲルハンス島": "急に体内に島が現れた。",
    "モホロビチッチ不連続面": "長い名前ほど、効いている気がする。",
    "減価償却": "価値は減った。でも会計上は処理済み。"
};

  const READING = {
    "パンダ囲い": "パンダァ、がこいィ！",
    "ほぼ穴熊囲い": "ほぼ、あなぐまァ！",
    "ウナギの寝床": "うなぎの、ねどこォ！",
    "ゴミ屋敷": "ゴミやしきィ！",
    "雑居ビル": "ざっきょビルゥ！",
    "重役出勤": "じゅうやく、しゅっきィン！",
    "快速急行": "かいそく、きゅうこうォ！",
    "ランダムウォーク": "ランダム、ウォーク！",
    "等速直線運動": "とうそく、ちょくせん、うんどう！",
    "放物線運動": "ほうぶつせん、うんどう！",
    "ワープ航法": "ワープ、こうほう！",
    "金バック": "きん、バァック！",
    "戦略的撤退": "せんりゃくてき、てったァい！",
    "ズル休み": "ズルやすみィ！",
    "遅延証明": "ちえん、しょうめェい！",
    "事故渋滞": "じこ、じゅうたァい！",
    "雲隠れ": "くもがくれェ！",
    "外気浴": "がいきよくゥ！",
    "課長代理": "かちょう、だいりィ！",
    "二階級特進": "にかいきゅう、とくしィン！",
    "捨てアカ転生": "すてアカ、てんせェい！",
    "NASDAQ上場": "ナスダック、じょうじょう！",
    "スキマバイト": "スキマ、バイトォ！",
    "差し押さえ予告通知": "さしおさえ、よこく、つうちィ！",
    "内容証明郵便": "ないようしょうめい、ゆうびん！",
    "強制執行": "きょうせい、しっこう！",
    "レッドアラート": "レッド、アラート！",
    "アンドロメダ": "アンドロメダァ！",
    "ほぼカニ": "ほぼ、カニィ！",
    "無印良手": "むじるし、りょうしゅゥ！",
    "からし大根": "からし、だいこんン！",
    "歩の前身": "ふの、ぜんしん！",
    "日焼け止め戦法": "ひやけどめ、せんぽう！",
    "サラダバー": "サラダバァー！",
    "なんかのフタ": "なんかの、フタァ！",
    "充電3％": "じゅうでん、さんパーセント！",
    "モホロビチッチ不連続面": "モホロビチッチ、ふれんぞくめん！",
    "ランゲルハンス島": "ランゲルハンス、とォう！",
    "シュレディンガーの猫": "シュレディンガーの、ねこォ！",
    "フレミング左手の法則": "フレミング、ひだりての、ほうそく！",
    "ノルマンディー上陸作戦": "ノルマンディー、じょうりくさくせん！"
};

  const allTerms = [...new Set(Object.values(TERMS).flat())];

  let board = [];
  let currentSide = "black";
  let selected = null;
  let legalTargets = [];
  let hands = { black: {}, white: {} };
  let lastMove = null;
  let gameOver = false;
  let soundEnabled = true;
  let audioCtx = null;
  let discovered = loadDiscovered();
  let history = [];
  let usedThisGame = new Set();
  let cpuMode = true;
  let cpuThinking = false;
  let cpuTimer = null;

  const els = {
    board: document.getElementById("board"),
    blackHands: document.getElementById("blackHands"),
    whiteHands: document.getElementById("whiteHands"),
    turnText: document.getElementById("turnText"),
    message: document.getElementById("message"),
    collectionCount: document.getElementById("collectionCount"),
    collectionList: document.getElementById("collectionList"),
    historyList: document.getElementById("historyList"),
    effectOverlay: document.getElementById("effectOverlay"),
    effectCategory: document.getElementById("effectCategory"),
    effectTitle: document.getElementById("effectTitle"),
    effectSubtitle: document.getElementById("effectSubtitle"),
    startOverlay: document.getElementById("startOverlay"),
    startSoundBtn: document.getElementById("startSoundBtn"),
    startSilentBtn: document.getElementById("startSilentBtn"),
    newGameBtn: document.getElementById("newGameBtn"),
    cpuModeBtn: document.getElementById("cpuModeBtn"),
    voiceToggleBtn: document.getElementById("voiceToggleBtn"),
    resetCollectionBtn: document.getElementById("resetCollectionBtn")
  };

  function init() {
    els.startSoundBtn.addEventListener("click", () => startGame(true));
    els.startSilentBtn.addEventListener("click", () => startGame(false));
    els.newGameBtn.addEventListener("click", () => {
      initAudio();
      newGame();
      showMessage(cpuMode ? "CPU対戦を開始しました。あなたは先手です。" : "新しい対局を開始しました。駒を選んでください。");
    });
    els.cpuModeBtn.addEventListener("click", () => {
      cpuMode = !cpuMode;
      updateCpuModeButton();
      initAudio();
      newGame();
      showMessage(cpuMode ? "CPU対戦モードです。あなたは先手、CPUは後手です。" : "2人対戦モードです。");
    });
    els.voiceToggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      els.voiceToggleBtn.textContent = soundEnabled ? "声 ON" : "声 OFF";
      if (soundEnabled) {
        initAudio();
        speak("声、オン！");
      } else if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });
    els.resetCollectionBtn.addEventListener("click", () => {
      if (!confirm("用語図鑑をリセットしますか？")) return;
      discovered = new Set();
      saveDiscovered();
      renderCollection();
    });
    newGame();
    render();
  }

  function startGame(withSound) {
    soundEnabled = withSound;
    els.voiceToggleBtn.textContent = soundEnabled ? "声 ON" : "声 OFF";
    els.startOverlay.classList.add("hidden");
    if (soundEnabled) {
      initAudio();
      playTone("start");
      speak(cpuMode ? "CPU対戦、開幕ゥ！" : "デタラメ戦法コレクション、開幕ゥ！");
    }
  }

  function newGame() {
    if (cpuTimer) {
      clearTimeout(cpuTimer);
      cpuTimer = null;
    }
    cpuThinking = false;
    board = makeInitialBoard();
    currentSide = "black";
    selected = null;
    legalTargets = [];
    hands = { black: {}, white: {} };
    lastMove = null;
    gameOver = false;
    history = [];
    usedThisGame = new Set();
    render();
  }

  function makeInitialBoard() {
    const empty = Array.from({ length: 9 }, () => Array(9).fill(null));
    const back = ["L", "N", "S", "G", "K", "G", "S", "N", "L"];
    for (let c = 0; c < 9; c++) {
      empty[0][c] = piece(back[c], "white");
      empty[2][c] = piece("P", "white");
      empty[6][c] = piece("P", "black");
      empty[8][c] = piece(back[c], "black");
    }
    empty[1][1] = piece("R", "white");
    empty[1][7] = piece("B", "white");
    empty[7][1] = piece("B", "black");
    empty[7][7] = piece("R", "black");
    return empty;
  }

  function piece(kind, side, promoted = false) {
    return { kind, side, promoted };
  }

  function render() {
    renderBoard();
    renderHands();
    renderStatus();
    renderCollection();
    renderHistory();
  }

  function renderBoard() {
    els.board.innerHTML = "";
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cell = document.createElement("button");
        cell.className = "cell";
        cell.type = "button";
        cell.setAttribute("aria-label", `${9 - c}筋${r + 1}段`);
        if (selected?.type === "board" && selected.r === r && selected.c === c) cell.classList.add("selected");
        if (legalTargets.some(t => t.r === r && t.c === c)) cell.classList.add("legal");
        if (lastMove && ((lastMove.sr === r && lastMove.sc === c) || (lastMove.tr === r && lastMove.tc === c))) {
          cell.classList.add("last-move");
        }
        const p = board[r][c];
        if (p) {
          const pieceEl = document.createElement("div");
          pieceEl.className = `piece ${p.side}${p.promoted ? " promoted" : ""}`;
          pieceEl.textContent = labelFor(p);
          cell.appendChild(pieceEl);
        }
        cell.addEventListener("click", () => onCellClick(r, c));
        els.board.appendChild(cell);
      }
    }
  }

  function renderHands() {
    renderHand("black", els.blackHands);
    renderHand("white", els.whiteHands);
  }

  function renderHand(side, container) {
    container.innerHTML = "";
    let hasAny = false;
    for (const kind of HAND_ORDER) {
      const count = hands[side][kind] || 0;
      if (count <= 0) continue;
      hasAny = true;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hand-piece";
      if (side !== currentSide || gameOver || !isHumanTurn()) btn.classList.add("disabled");
      if (selected?.type === "hand" && selected.side === side && selected.kind === kind) btn.classList.add("selected");
      btn.innerHTML = `<span>${PIECE_LABEL[kind]}</span><span class="count">×${count}</span>`;
      btn.addEventListener("click", () => onHandClick(side, kind));
      container.appendChild(btn);
    }
    if (!hasAny) {
      const empty = document.createElement("div");
      empty.className = "tiny";
      empty.textContent = "なし";
      container.appendChild(empty);
    }
  }

  function renderStatus() {
    if (gameOver) {
      els.turnText.textContent = "終局";
    } else if (cpuMode && currentSide === CPU_SIDE) {
      els.turnText.textContent = cpuThinking ? "CPU考慮中" : "CPU";
    } else {
      els.turnText.textContent = SIDE_NAME[currentSide];
    }
  }

  function renderCollection() {
    els.collectionCount.textContent = `${discovered.size} / ${allTerms.length}`;
    els.collectionList.innerHTML = "";
    for (const term of allTerms) {
      const row = document.createElement("div");
      row.className = `term-row${discovered.has(term) ? " found" : ""}`;
      const category = categoryForTerm(term);
      row.innerHTML = `<span>${discovered.has(term) ? term : "？？？？"}</span><span class="tag">${CATEGORY_LABEL[category] || "謎"}</span>`;
      els.collectionList.appendChild(row);
    }
  }

  function renderHistory() {
    els.historyList.innerHTML = "";
    if (history.length === 0) {
      const empty = document.createElement("div");
      empty.className = "tiny";
      empty.textContent = "まだ何も発動していません。";
      els.historyList.appendChild(empty);
      return;
    }
    for (const item of history.slice().reverse()) {
      const row = document.createElement("div");
      row.className = "term-row found";
      row.innerHTML = `<span>${item.term}</span><span class="tag">${item.move}</span>`;
      els.historyList.appendChild(row);
    }
  }

  function onCellClick(r, c) {
    if (gameOver || !isHumanTurn()) return;
    initAudio();

    const p = board[r][c];
    if (selected?.type === "hand") {
      tryDrop(selected.kind, r, c);
      return;
    }

    if (!selected) {
      if (p && p.side === currentSide) selectBoardPiece(r, c);
      return;
    }

    if (selected.type === "board") {
      const sp = board[selected.r][selected.c];
      if (p && p.side === currentSide) {
        selectBoardPiece(r, c);
        return;
      }
      if (sp) tryMove(selected.r, selected.c, r, c);
    }
  }

  function onHandClick(side, kind) {
    if (gameOver || !isHumanTurn() || side !== currentSide || (hands[side][kind] || 0) <= 0) return;
    initAudio();
    selected = { type: "hand", side, kind };
    legalTargets = getLegalDropTargets(kind, side);
    showMessage(`${PIECE_LABEL[kind]}を打つ場所を選んでください。`);
    render();
  }

  function selectBoardPiece(r, c) {
    selected = { type: "board", r, c };
    legalTargets = getLegalMoveTargets(r, c);
    showMessage(`${labelFor(board[r][c])}の行き先を選んでください。`);
    render();
  }

  function tryMove(sr, sc, tr, tc) {
    const p = board[sr][sc];
    if (!p || p.side !== currentSide) return;
    if (!isLegalMove(sr, sc, tr, tc, board)) {
      showMessage("その手は指せません。別の手を選んでください。");
      playTone("bad");
      return;
    }

    const captured = board[tr][tc];
    const promotedNow = decidePromotion(p, sr, tr);
    const beforeCastle = castleScore(currentSide, board);

    board[sr][sc] = null;
    board[tr][tc] = { ...p, promoted: p.promoted || promotedNow };
    if (captured && captured.kind !== "K") addHand(currentSide, captured.kind);

    lastMove = { sr, sc, tr, tc };
    selected = null;
    legalTargets = [];

    const kingCaptured = captured?.kind === "K";
    const opponent = OPP[currentSide];
    const check = !kingCaptured && isKingInCheck(opponent, board);
    const context = {
      categoryHint: null,
      piece: p,
      captured,
      promotedNow,
      dropped: false,
      sr, sc, tr, tc,
      distance: Math.max(Math.abs(sr - tr), Math.abs(sc - tc)),
      movedBackward: isBackwardMove(p.side, sr, tr),
      castleLikely: castleScore(currentSide, board) > beforeCastle || isCastleMove(p, currentSide),
      check,
      kingCaptured
    };
    triggerDetarame(context);

    if (kingCaptured) {
      gameOver = true;
      showMessage(`${SIDE_NAME[currentSide]}の勝ちです。王様が盤上から退勤しました。`);
    } else {
      currentSide = opponent;
      showMessage(check ? `${SIDE_NAME[currentSide]}は王手されています。` : `${SIDE_NAME[currentSide]}の手番です。`);
    }
    render();
    maybeScheduleCpuMove();
  }

  function tryDrop(kind, r, c) {
    if (!isLegalDrop(kind, currentSide, r, c, board)) {
      showMessage("そこには打てません。二歩や行き場のない駒に注意してください。");
      playTone("bad");
      return;
    }
    const beforeCastle = castleScore(currentSide, board);
    board[r][c] = piece(kind, currentSide, false);
    hands[currentSide][kind] -= 1;
    if (hands[currentSide][kind] <= 0) delete hands[currentSide][kind];
    lastMove = { sr: -1, sc: -1, tr: r, tc: c };
    selected = null;
    legalTargets = [];

    const opponent = OPP[currentSide];
    const check = isKingInCheck(opponent, board);
    triggerDetarame({
      piece: { kind, side: currentSide, promoted: false },
      captured: null,
      promotedNow: false,
      dropped: true,
      sr: -1, sc: -1, tr: r, tc: c,
      distance: 0,
      movedBackward: false,
      castleLikely: castleScore(currentSide, board) > beforeCastle,
      check,
      kingCaptured: false
    });
    currentSide = opponent;
    showMessage(check ? `${SIDE_NAME[currentSide]}は王手されています。` : `${SIDE_NAME[currentSide]}の手番です。`);
    render();
    maybeScheduleCpuMove();
  }

  function isHumanTurn() {
    return !cpuMode || currentSide === HUMAN_SIDE;
  }

  function updateCpuModeButton() {
    els.cpuModeBtn.textContent = cpuMode ? "CPU対戦 ON" : "CPU対戦 OFF";
    els.cpuModeBtn.classList.toggle("active", cpuMode);
  }

  function maybeScheduleCpuMove() {
    if (!cpuMode || gameOver || currentSide !== CPU_SIDE || cpuThinking) return;
    cpuThinking = true;
    showMessage("CPUが考えています……。");
    render();
    cpuTimer = setTimeout(() => {
      cpuTimer = null;
      cpuThinking = false;
      makeCpuMove();
    }, CPU_THINK_DELAY);
  }

  function makeCpuMove() {
    if (!cpuMode || gameOver || currentSide !== CPU_SIDE) return;
    const action = chooseCpuAction(CPU_SIDE);
    if (!action) {
      gameOver = true;
      const msg = isKingInCheck(CPU_SIDE, board)
        ? "CPUは詰みました。先手の勝ちです。"
        : "CPUに指せる手がありません。終局です。";
      showMessage(msg);
      render();
      return;
    }
    commitCpuAction(action);
  }

  function commitCpuAction(action) {
    const side = CPU_SIDE;
    const opponent = OPP[side];
    let p, captured = null, promotedNow = false;
    let sr = -1, sc = -1, tr = action.tr, tc = action.tc;

    if (action.type === "move") {
      sr = action.sr;
      sc = action.sc;
      p = board[sr][sc];
      captured = board[tr][tc];
      promotedNow = !!action.promote && !p.promoted;
      board[sr][sc] = null;
      board[tr][tc] = { ...p, promoted: p.promoted || !!action.promote };
      if (captured && captured.kind !== "K") addHand(side, captured.kind);
    } else {
      p = piece(action.kind, side, false);
      board[tr][tc] = p;
      hands[side][action.kind] -= 1;
      if (hands[side][action.kind] <= 0) delete hands[side][action.kind];
    }

    lastMove = { sr, sc, tr, tc };
    selected = null;
    legalTargets = [];

    const kingCaptured = captured?.kind === "K";
    const check = !kingCaptured && isKingInCheck(opponent, board);
    // CPU側（後手）の手では、デタラメ戦法エフェクト・読み上げ・図鑑登録を発生させない。

    if (kingCaptured) {
      gameOver = true;
      showMessage("CPUの勝ちです。王様が盤上から退勤しました。");
    } else {
      currentSide = opponent;
      showMessage(check ? "先手は王手されています。" : "あなたの手番です。");
    }
    render();
  }

  const PIECE_VALUE = { K: 0, R: 1000, B: 850, G: 620, S: 560, N: 360, L: 320, P: 120 };
  const PROMOTE_BONUS = { R: 420, B: 360, S: 180, N: 220, L: 220, P: 520 };
  const CENTER_TABLE = [0, 8, 16, 24, 30, 24, 16, 8, 0];

  function chooseCpuAction(side) {
    const actions = generateLegalActions(side, board, hands);
    if (actions.length === 0) return null;

    const quick = actions.map(action => ({
      action,
      score: scoreImmediateAction(side, action) + Math.random() * 18
    })).sort((a, b) => b.score - a.score);

    const candidates = quick.slice(0, Math.min(32, quick.length));
    const searched = candidates.map(item => ({
      action: item.action,
      score: scoreWithReply(side, item.action) + Math.random() * 10
    })).sort((a, b) => b.score - a.score);

    const top = searched.slice(0, Math.min(4, searched.length));
    const roll = Math.random();
    if (roll < 0.66) return top[0].action;
    if (roll < 0.86 && top[1]) return top[1].action;
    if (roll < 0.96 && top[2]) return top[2].action;
    return (top[3] || top[0]).action;
  }

  function scoreImmediateAction(side, action) {
    const before = evaluatePosition(board, hands, side);
    const after = applyActionToState(board, hands, side, action);
    if (after.captured?.kind === "K") return 1_000_000;
    let score = evaluatePosition(after.board, after.hands, side) - before;
    if (after.captured) score += pieceValue(after.captured) * 0.42;
    if (action.type === "move" && action.promote) score += 210;
    if (isKingInCheck(OPP[side], after.board)) score += 260;
    if (action.type === "drop") score += dropShapeBonus(side, action, after.board);
    return score;
  }

  function scoreWithReply(side, action) {
    const after = applyActionToState(board, hands, side, action);
    if (after.captured?.kind === "K") return 1_000_000;

    const opponent = OPP[side];
    let base = evaluatePosition(after.board, after.hands, side);
    if (isKingInCheck(opponent, after.board)) base += 280;

    const replies = generateLegalActions(opponent, after.board, after.hands);
    if (replies.length === 0) {
      return base + (isKingInCheck(opponent, after.board) ? 60_000 : 800);
    }

    let worst = Infinity;
    const replyScores = replies.map(reply => ({ reply, score: scoreImmediateActionOnState(opponent, reply, after.board, after.hands) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.min(28, replies.length));

    for (const item of replyScores) {
      const next = applyActionToState(after.board, after.hands, opponent, item.reply);
      const valueForCpu = next.captured?.kind === "K" ? -1_000_000 : evaluatePosition(next.board, next.hands, side);
      if (valueForCpu < worst) worst = valueForCpu;
    }
    return base * 0.42 + worst * 0.58;
  }

  function scoreImmediateActionOnState(side, action, pos, handState) {
    const before = evaluatePosition(pos, handState, side);
    const after = applyActionToState(pos, handState, side, action);
    if (after.captured?.kind === "K") return 1_000_000;
    let score = evaluatePosition(after.board, after.hands, side) - before;
    if (after.captured) score += pieceValue(after.captured) * 0.42;
    if (action.type === "move" && action.promote) score += 210;
    if (isKingInCheck(OPP[side], after.board)) score += 260;
    return score;
  }

  function generateLegalActions(side, pos, handState) {
    const actions = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const p = pos[r][c];
        if (!p || p.side !== side) continue;
        for (const target of getPseudoMoves(r, c, p, pos)) {
          if (!isLegalMoveForSide(side, r, c, target.r, target.c, pos)) continue;
          if (canPromote(p, r, target.r)) {
            if (mustPromote(p, target.r)) {
              actions.push({ type: "move", sr: r, sc: c, tr: target.r, tc: target.c, promote: true });
            } else {
              actions.push({ type: "move", sr: r, sc: c, tr: target.r, tc: target.c, promote: true });
              actions.push({ type: "move", sr: r, sc: c, tr: target.r, tc: target.c, promote: false });
            }
          } else {
            actions.push({ type: "move", sr: r, sc: c, tr: target.r, tc: target.c, promote: false });
          }
        }
      }
    }

    const ownHands = handState[side] || {};
    for (const kind of HAND_ORDER) {
      if ((ownHands[kind] || 0) <= 0) continue;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (isLegalDrop(kind, side, r, c, pos)) actions.push({ type: "drop", kind, tr: r, tc: c });
        }
      }
    }
    return actions;
  }

  function applyActionToState(pos, handState, side, action) {
    const nextBoard = cloneBoard(pos);
    const nextHands = cloneHands(handState);
    let captured = null;
    let movedPiece = null;

    if (action.type === "move") {
      movedPiece = nextBoard[action.sr][action.sc];
      captured = nextBoard[action.tr][action.tc];
      nextBoard[action.sr][action.sc] = null;
      nextBoard[action.tr][action.tc] = { ...movedPiece, promoted: movedPiece.promoted || !!action.promote };
      if (captured && captured.kind !== "K") {
        nextHands[side][captured.kind] = (nextHands[side][captured.kind] || 0) + 1;
      }
    } else {
      movedPiece = piece(action.kind, side, false);
      nextBoard[action.tr][action.tc] = movedPiece;
      nextHands[side][action.kind] = (nextHands[side][action.kind] || 0) - 1;
      if (nextHands[side][action.kind] <= 0) delete nextHands[side][action.kind];
    }
    return { board: nextBoard, hands: nextHands, captured, movedPiece };
  }

  function cloneHands(handState) {
    return {
      black: { ...(handState.black || {}) },
      white: { ...(handState.white || {}) }
    };
  }

  function evaluatePosition(pos, handState, perspective) {
    const opponent = OPP[perspective];
    let score = 0;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const p = pos[r][c];
        if (!p) continue;
        const sign = p.side === perspective ? 1 : -1;
        score += sign * pieceValue(p);
        score += sign * positionalBonus(p, r, c);
        if (p.kind !== "K" && isSquareAttacked(r, c, OPP[p.side], pos)) score -= sign * pieceValue(p) * 0.075;
        if (p.kind !== "K" && isSquareAttacked(r, c, p.side, pos)) score += sign * pieceValue(p) * 0.025;
      }
    }

    for (const side of ["black", "white"]) {
      const sign = side === perspective ? 1 : -1;
      for (const [kind, count] of Object.entries(handState[side] || {})) {
        score += sign * (PIECE_VALUE[kind] || 0) * count * 0.92;
      }
    }

    score += (castleScore(perspective, pos) - castleScore(opponent, pos)) * 34;
    if (isKingInCheck(opponent, pos)) score += 230;
    if (isKingInCheck(perspective, pos)) score -= 420;
    return score;
  }

  function pieceValue(p) {
    return (PIECE_VALUE[p.kind] || 0) + (p.promoted ? (PROMOTE_BONUS[p.kind] || 0) : 0);
  }

  function positionalBonus(p, r, c) {
    if (p.kind === "K") return 0;
    const center = CENTER_TABLE[c] + CENTER_TABLE[r];
    const advancement = p.side === "black" ? (8 - r) : r;
    let bonus = center * 0.45 + advancement * 8;
    if (["G", "S"].includes(p.kind)) bonus += Math.max(0, 4 - Math.abs(c - 4)) * 6;
    return bonus;
  }

  function dropShapeBonus(side, action, pos) {
    let bonus = 0;
    const opponent = OPP[side];
    if (isSquareAttacked(action.tr, action.tc, side, pos)) bonus += 26;
    if (isKingInCheck(opponent, pos)) bonus += 180;
    const king = findKing(opponent, pos);
    if (king) {
      const dist = Math.abs(king.r - action.tr) + Math.abs(king.c - action.tc);
      bonus += Math.max(0, 8 - dist) * 10;
    }
    return bonus;
  }

  function decidePromotion(p, sr, tr) {
    if (!canPromote(p, sr, tr)) return false;
    if (mustPromote(p, tr)) return true;
    return confirm(`${PIECE_LABEL[p.kind]}を成りますか？`);
  }

  function getLegalMoveTargets(r, c) {
    const p = board[r][c];
    if (!p) return [];
    return getPseudoMoves(r, c, p, board).filter(t => isLegalMove(r, c, t.r, t.c, board));
  }

  function isLegalMove(sr, sc, tr, tc, pos) {
    return isLegalMoveForSide(currentSide, sr, sc, tr, tc, pos);
  }

  function isLegalMoveForSide(side, sr, sc, tr, tc, pos) {
    if (!inside(tr, tc)) return false;
    const p = pos[sr][sc];
    if (!p || p.side !== side) return false;
    const dest = pos[tr][tc];
    if (dest && dest.side === p.side) return false;
    if (!getPseudoMoves(sr, sc, p, pos).some(t => t.r === tr && t.c === tc)) return false;
    const simulated = cloneBoard(pos);
    simulated[tr][tc] = { ...simulated[sr][sc] };
    simulated[sr][sc] = null;
    return !isKingInCheck(p.side, simulated);
  }

  function getLegalDropTargets(kind, side) {
    const targets = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (isLegalDrop(kind, side, r, c, board)) targets.push({ r, c });
      }
    }
    return targets;
  }

  function isLegalDrop(kind, side, r, c, pos) {
    if (!inside(r, c) || pos[r][c]) return false;
    if (!canExistUnpromotedOnRank(kind, side, r)) return false;
    if (kind === "P" && hasUnpromotedPawnOnFile(side, c, pos)) return false;
    const simulated = cloneBoard(pos);
    simulated[r][c] = piece(kind, side, false);
    return !isKingInCheck(side, simulated);
  }

  function getPseudoMoves(r, c, p, pos) {
    const moves = [];
    const dir = p.side === "black" ? -1 : 1;
    const addStep = (dr, dc) => {
      const nr = r + dr, nc = c + dc;
      if (!inside(nr, nc)) return;
      const target = pos[nr][nc];
      if (!target || target.side !== p.side) moves.push({ r: nr, c: nc });
    };
    const addSlide = (dr, dc) => {
      let nr = r + dr, nc = c + dc;
      while (inside(nr, nc)) {
        const target = pos[nr][nc];
        if (!target) {
          moves.push({ r: nr, c: nc });
        } else {
          if (target.side !== p.side) moves.push({ r: nr, c: nc });
          break;
        }
        nr += dr; nc += dc;
      }
    };
    const gold = () => {
      addStep(dir, -1); addStep(dir, 0); addStep(dir, 1);
      addStep(0, -1); addStep(0, 1); addStep(-dir, 0);
    };

    if (p.promoted && ["S", "N", "L", "P"].includes(p.kind)) {
      gold();
      return moves;
    }

    switch (p.kind) {
      case "K":
        for (const dr of [-1, 0, 1]) for (const dc of [-1, 0, 1]) if (dr || dc) addStep(dr, dc);
        break;
      case "G":
        gold();
        break;
      case "S":
        addStep(dir, -1); addStep(dir, 0); addStep(dir, 1); addStep(-dir, -1); addStep(-dir, 1);
        break;
      case "N":
        addStep(dir * 2, -1); addStep(dir * 2, 1);
        break;
      case "L":
        addSlide(dir, 0);
        break;
      case "P":
        addStep(dir, 0);
        break;
      case "R":
        addSlide(-1, 0); addSlide(1, 0); addSlide(0, -1); addSlide(0, 1);
        if (p.promoted) { addStep(-1, -1); addStep(-1, 1); addStep(1, -1); addStep(1, 1); }
        break;
      case "B":
        addSlide(-1, -1); addSlide(-1, 1); addSlide(1, -1); addSlide(1, 1);
        if (p.promoted) { addStep(-1, 0); addStep(1, 0); addStep(0, -1); addStep(0, 1); }
        break;
    }
    return moves;
  }

  function isKingInCheck(side, pos) {
    const king = findKing(side, pos);
    if (!king) return false;
    return isSquareAttacked(king.r, king.c, OPP[side], pos);
  }

  function isSquareAttacked(r, c, bySide, pos) {
    for (let rr = 0; rr < 9; rr++) {
      for (let cc = 0; cc < 9; cc++) {
        const p = pos[rr][cc];
        if (!p || p.side !== bySide) continue;
        if (getPseudoMoves(rr, cc, p, pos).some(t => t.r === r && t.c === c)) return true;
      }
    }
    return false;
  }

  function findKing(side, pos) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const p = pos[r][c];
        if (p && p.side === side && p.kind === "K") return { r, c };
      }
    }
    return null;
  }

  function canPromote(p, sr, tr) {
    if (p.promoted || !["R", "B", "S", "N", "L", "P"].includes(p.kind)) return false;
    return inPromotionZone(p.side, sr) || inPromotionZone(p.side, tr);
  }

  function mustPromote(p, tr) {
    if (p.promoted) return false;
    if (["P", "L"].includes(p.kind)) return p.side === "black" ? tr === 0 : tr === 8;
    if (p.kind === "N") return p.side === "black" ? tr <= 1 : tr >= 7;
    return false;
  }

  function inPromotionZone(side, r) {
    return side === "black" ? r <= 2 : r >= 6;
  }

  function canExistUnpromotedOnRank(kind, side, r) {
    if (["P", "L"].includes(kind)) return side === "black" ? r !== 0 : r !== 8;
    if (kind === "N") return side === "black" ? r > 1 : r < 7;
    return true;
  }

  function hasUnpromotedPawnOnFile(side, c, pos) {
    for (let r = 0; r < 9; r++) {
      const p = pos[r][c];
      if (p && p.side === side && p.kind === "P" && !p.promoted) return true;
    }
    return false;
  }

  function cloneBoard(pos) {
    return pos.map(row => row.map(p => p ? { ...p } : null));
  }

  function addHand(side, kind) {
    if (kind === "K") return;
    hands[side][kind] = (hands[side][kind] || 0) + 1;
  }

  function labelFor(p) {
    if (!p) return "";
    return p.promoted && PROMOTED_LABEL[p.kind] ? PROMOTED_LABEL[p.kind] : PIECE_LABEL[p.kind];
  }

  function inside(r, c) {
    return r >= 0 && r < 9 && c >= 0 && c < 9;
  }

  function isBackwardMove(side, sr, tr) {
    if (sr < 0) return false;
    return side === "black" ? tr > sr : tr < sr;
  }

  function isCastleMove(p, side) {
    return ["K", "G", "S"].includes(p.kind) && p.side === side;
  }

  function castleScore(side, pos) {
    const king = findKing(side, pos);
    if (!king) return 0;
    let score = 0;
    for (let r = Math.max(0, king.r - 2); r <= Math.min(8, king.r + 2); r++) {
      for (let c = Math.max(0, king.c - 2); c <= Math.min(8, king.c + 2); c++) {
        const p = pos[r][c];
        if (p && p.side === side && ["G", "S", "K"].includes(p.kind)) score++;
      }
    }
    return score;
  }

  function triggerDetarame(context) {
    const preferredCategory = chooseCategory(context);
    const picked = chooseTerm(preferredCategory);
    const term = picked.term;
    const category = picked.category;
    const subtitle = SUBTITLES[term] || defaultSubtitle(category);
    usedThisGame.add(term);
    discovered.add(term);
    saveDiscovered();
    history.push({ term, category, move: moveLabel(context) });
    if (history.length > 40) history.shift();
    showEffect(term, category, subtitle);
    playTone(category);
    speak(readingFor(term));
  }

  function chooseCategory(ctx) {
    if (ctx.kingCaptured || ctx.check) return categoryOrGeneral("check");
    if (ctx.promotedNow) return categoryOrGeneral("promote");
    if (ctx.castleLikely) return categoryOrGeneral("castle");
    if (ctx.movedBackward) return categoryOrGeneral("retreat");
    if (ctx.dropped) return categoryOrGeneral("wait");
    if (ctx.distance >= 3) return categoryOrGeneral("move");

    const roll = Math.random();
    if (roll < 0.64) return "general";
    if (roll < 0.73) return "castle";
    if (roll < 0.82) return "move";
    if (roll < 0.91) return "wait";
    return "retreat";
  }

  function categoryOrGeneral(category) {
    return Math.random() < 0.4 ? category : "general";
  }

  function chooseTerm(preferredCategory) {
    const primary = unusedTerms(preferredCategory);
    if (primary.length > 0) return { term: randomFrom(primary), category: preferredCategory };

    if (preferredCategory !== "general") {
      const general = unusedTerms("general");
      if (general.length > 0) return { term: randomFrom(general), category: "general" };
    }

    const anyUnused = allTerms.filter(term => !usedThisGame.has(term));
    if (anyUnused.length > 0) {
      const term = randomFrom(anyUnused);
      return { term, category: categoryForTerm(term) };
    }

    const fallbackPool = TERMS.general.length > 0 ? TERMS.general : allTerms;
    const term = randomFrom(fallbackPool);
    return { term, category: categoryForTerm(term) || "general" };
  }

  function unusedTerms(category) {
    const terms = TERMS[category] || TERMS.general || allTerms;
    return [...new Set(terms)].filter(term => !usedThisGame.has(term));
  }

  function categoryForTerm(term) {
    for (const [category, terms] of Object.entries(TERMS)) {
      if (terms.includes(term)) return category;
    }
    return "general";
  }

  function defaultSubtitle(category) {
    const defaults = {
      castle: "囲えている気はする。気だけは。",
      move: "盤上に謎の移動音が鳴った。",
      retreat: "逃げではない。これは高度な都合。",
      wait: "何かをした。たぶん。",
      promote: "肩書きだけが先に成った。",
      check: "王様の予定表が真っ赤になった。",
      general: "意味はない。でも発動はした。"
    };
    return defaults[category] || "発動しました。";
  }

  function moveLabel(ctx) {
    if (ctx.dropped) return `${SIDE_NAME[ctx.piece.side]} ${PIECE_LABEL[ctx.piece.kind]}打`;
    const from = ctx.sr >= 0 ? `${9 - ctx.sc}${ctx.sr + 1}` : "持駒";
    const to = `${9 - ctx.tc}${ctx.tr + 1}`;
    const cap = ctx.captured ? " 捕獲" : "";
    const pro = ctx.promotedNow ? " 成" : "";
    return `${SIDE_NAME[ctx.piece.side]} ${PIECE_LABEL[ctx.piece.kind]} ${from}→${to}${cap}${pro}`;
  }

  function showEffect(term, category, subtitle) {
    els.effectCategory.textContent = CATEGORY_LABEL[category] || "発動";
    els.effectTitle.textContent = `${term}！`;
    els.effectSubtitle.textContent = subtitle;
    els.effectOverlay.classList.remove("show");
    // restart CSS animation
    void els.effectOverlay.offsetWidth;
    els.effectOverlay.classList.add("show");
  }

  function readingFor(term) {
    if (READING[term]) return READING[term];
    if (term.endsWith("囲い")) return `${term.replace("囲い", "")}, がこいィ！`;
    return `${term}ッ！`;
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showMessage(text) {
    els.message.textContent = text;
  }

  function loadDiscovered() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr.filter(x => typeof x === "string") : []);
    } catch {
      return new Set();
    }
  }

  function saveDiscovered() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...discovered]));
  }

  function initAudio() {
    if (!soundEnabled) return;
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  }

  function playTone(category) {
    if (!soundEnabled || !audioCtx) return;
    const now = audioCtx.currentTime;
    const gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);

    const freqs = {
      start: [220, 330, 550],
      bad: [140, 100],
      castle: [196, 294, 392],
      move: [330, 440, 660],
      retreat: [260, 220, 196],
      wait: [300, 360],
      promote: [440, 660, 880],
      check: [392, 523, 784],
      general: [247, 415, 622]
    }[category] || [330, 550];

    freqs.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      osc.type = i % 2 ? "triangle" : "sawtooth";
      osc.frequency.setValueAtTime(freq, now + i * 0.055);
      osc.connect(gain);
      osc.start(now + i * 0.055);
      osc.stop(now + 0.28 + i * 0.055);
    });
  }

  function speak(text) {
    if (!soundEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.86;
    u.pitch = 0.72;
    u.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const ja = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("ja"));
    if (ja) u.voice = ja;
    window.speechSynthesis.speak(u);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
