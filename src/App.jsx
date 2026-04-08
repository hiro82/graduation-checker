import { useState } from "react";

function App() {
  const [liberalArts, setLiberalArts] = useState("");
  const [english, setEnglish] = useState("");
  const [scienceLiberalArts, setScienceLiberalArts] = useState("");
  const [major, setMajor] = useState("");

  const la = Number(liberalArts) || 0;
  const en = Number(english) || 0;
  const sc = Number(scienceLiberalArts) || 0;
  const ma = Number(major) || 0;

  const liberalArtsTotal = la + en + sc;
  const specializedTotal = ma;
  const totalCredits = liberalArtsTotal + specializedTotal;

  const needLiberalArts = Math.max(12 - la, 0);
  const needEnglish = Math.max(8 - en, 0);
  const needScience = Math.max(12 - sc, 0);
  const needLiberalArtsTotal = Math.max(32 - liberalArtsTotal, 0);
  const needMajor = Math.max(80 - specializedTotal, 0);
  const needTotal = Math.max(124 - totalCredits, 0);

  const graduationOk =
    needLiberalArts === 0 &&
    needEnglish === 0 &&
    needScience === 0 &&
    needLiberalArtsTotal === 0 &&
    needMajor === 0 &&
    needTotal === 0;

  const progress = Math.min((totalCredits / 124) * 100, 100);

  const renderStatus = (title, current, need) => {
    const isOk = need === 0;
    return (
      <div style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "10px" }}>
        <h3>{title}</h3>
        <div>取得単位: {current}単位</div>
        <div style={{ color: isOk ? "green" : "red" }}>
          判定: {isOk ? "OK" : "不足"}
        </div>
        {!isOk && <div>あと {need} 単位必要</div>}
      </div>
    );
  };

  const reset = () => {
    setLiberalArts("");
    setEnglish("");
    setScienceLiberalArts("");
    setMajor("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1>🎓 卒業判定アプリ（改良版）</h1>

      <p>取得済み単位を入力してください</p>

      <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
        <input
          type="number"
          placeholder="教養科目 (12以上)"
          value={liberalArts}
          onChange={(e) => setLiberalArts(e.target.value)}
        />

        <input
          type="number"
          placeholder="英語科目 (8)"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />

        <input
          type="number"
          placeholder="理系教養 (12以上)"
          value={scienceLiberalArts}
          onChange={(e) => setScienceLiberalArts(e.target.value)}
        />

        <input
          type="number"
          placeholder="専門科目 (80以上)"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </div>

      <button onClick={reset} style={{ marginTop: "10px" }}>
        リセット
      </button>

      <hr style={{ margin: "24px 0" }} />

      <h2>進捗</h2>
      <div style={{ background: "#eee", borderRadius: "10px", overflow: "hidden" }}>
        <div
          style={{
            width: `${progress}%`,
            background: "green",
            color: "white",
            padding: "5px",
            textAlign: "center",
          }}
        >
          {progress.toFixed(1)}%
        </div>
      </div>

      <hr style={{ margin: "24px 0" }} />

      <div style={{ display: "grid", gap: "16px" }}>
        {renderStatus("教養科目", la, needLiberalArts)}
        {renderStatus("英語科目", en, needEnglish)}
        {renderStatus("理系教養", sc, needScience)}
        {renderStatus("教養合計", liberalArtsTotal, needLiberalArtsTotal)}
        {renderStatus("専門", specializedTotal, needMajor)}
        {renderStatus("総単位", totalCredits, needTotal)}
      </div>

      <h2 style={{ color: graduationOk ? "green" : "red", marginTop: "20px" }}>
        {graduationOk ? "🎉 卒業可能！" : "⚠️ まだ卒業できません"}
      </h2>
    </div>
  );
}

export default App;