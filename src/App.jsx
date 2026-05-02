import { useState } from "react";
import PDFUploader from "./components/PDFUploader";

function App() {
  const [liberalArts, setLiberalArts] = useState("");
  const [english, setEnglish] = useState("");
  const [scienceLiberalArts, setScienceLiberalArts] = useState("");
  const [major, setMajor] = useState("");
  const [ocrText, setOcrText] = useState("");

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

  const renderStatus = (need) => (
    <div style={{ marginBottom: "12px" }}>
      <div>判定: {need === 0 ? "OK" : "不足"}</div>
      <div>不足単位: {need}単位</div>
    </div>
  );

  const reset = () => {
    setLiberalArts("");
    setEnglish("");
    setScienceLiberalArts("");
    setMajor("");
    setOcrText("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1>卒業判定アプリ</h1>

      <h2>PDF読み込み</h2>
      <PDFUploader onTextExtracted={setOcrText} />

      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#f5f5f5",
          padding: "12px",
          borderRadius: "8px",
          maxHeight: "250px",
          overflow: "auto",
        }}
      >
        {ocrText}
      </pre>

      <p>取得済み単位を入力してください</p>

      <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
        <label>
          教養科目（12単位以上）
          <br />
          <input
            type="number"
            value={liberalArts}
            onChange={(e) => setLiberalArts(e.target.value)}
          />
        </label>

        <label>
          英語科目（8単位）
          <br />
          <input
            type="number"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
          />
        </label>

        <label>
          理系教養科目（12単位以上）
          <br />
          <input
            type="number"
            value={scienceLiberalArts}
            onChange={(e) => setScienceLiberalArts(e.target.value)}
          />
        </label>

        <label>
          自学科専門科目（80単位以上）
          <br />
          <input
            type="number"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </label>
      </div>

      <button onClick={reset} style={{ marginTop: "16px" }}>
        リセット
      </button>

      <hr style={{ margin: "24px 0" }} />

      <h2>判定結果</h2>

      <h3>教養科目</h3>
      <div>取得単位: {la}単位</div>
      {renderStatus(needLiberalArts)}

      <h3>英語科目</h3>
      <div>取得単位: {en}単位</div>
      {renderStatus(needEnglish)}

      <h3>理系教養科目</h3>
      <div>取得単位: {sc}単位</div>
      {renderStatus(needScience)}

      <h3>教養系合計</h3>
      <div>取得単位: {liberalArtsTotal}単位</div>
      {renderStatus(needLiberalArtsTotal)}

      <h3>専門系合計</h3>
      <div>取得単位: {specializedTotal}単位</div>
      {renderStatus(needMajor)}

      <h3>総取得単位</h3>
      <div>取得単位: {totalCredits}単位</div>
      {renderStatus(needTotal)}

      <h2 style={{ color: graduationOk ? "green" : "red" }}>
        {graduationOk
          ? "卒業要件を満たしています"
          : "卒業要件を満たしていません"}
      </h2>
    </div>
  );
}

export default App;