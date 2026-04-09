import { useState } from "react";
<<<<<<< HEAD
import Tesseract from "tesseract.js";
=======
import PDFUploader from "./components/PDFUploader";
>>>>>>> PDF追加

function App() {
  const [liberalArts, setLiberalArts] = useState("");
  const [english, setEnglish] = useState("");
  const [scienceLiberalArts, setScienceLiberalArts] = useState("");
  const [major, setMajor] = useState("");
  const [loading, setLoading] = useState(false);

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

  const progress = Math.min((totalCredits / 124) * 100, 100);

  // 数字抽出
  const extractNumber = (text) => {
    const match = text.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

<<<<<<< HEAD
  // OCR結果を解析
  const parseCredits = (text) => {
    let la = 0;
    let en = 0;
    let sc = 0;
    let ma = 0;

    const lines = text.split("\n");

    lines.forEach((line) => {
      if (line.includes("英語")) {
        en += extractNumber(line);
      } else if (line.includes("物理") || line.includes("数学")) {
        sc += extractNumber(line);
      } else if (line.includes("プログラミング") || line.includes("専門")) {
        ma += extractNumber(line);
      } else {
        la += extractNumber(line);
      }
    });

    setEnglish(en);
    setScienceLiberalArts(sc);
    setMajor(ma);
    setLiberalArts(la);
  };

  // 画像アップロード
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
=======
  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <h1>卒業判定アプリ</h1>

<h2>PDF読み込み</h2>
<PDFUploader onTextExtracted={setOcrText} />

<pre
  style={{
    whiteSpace: "pre-wrap",
    background: "#f5f5f5",
    padding: "12px",
    borderRadius: "8px",
  }}
>
  {ocrText}
</pre>

      <p>取得済み単位を入力してください</p>

      <PDFUploader />

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
>>>>>>> PDF追加

    try {
      const result = await Tesseract.recognize(file, "jpn");
      const text = result.data.text;

      console.log("OCR結果:", text);

      parseCredits(text);
    } catch (err) {
      console.error(err);
      alert("読み取り失敗");
    }

    setLoading(false);
  };

  const reset = () => {
    setLiberalArts("");
    setEnglish("");
    setScienceLiberalArts("");
    setMajor("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1>🎓 卒業判定アプリ（OCR対応）</h1>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {loading && <p>📷 解析中...</p>}

      <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
        <input
          type="number"
          placeholder="教養"
          value={liberalArts}
          onChange={(e) => setLiberalArts(e.target.value)}
        />
        <input
          type="number"
          placeholder="英語"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
        <input
          type="number"
          placeholder="理系教養"
          value={scienceLiberalArts}
          onChange={(e) => setScienceLiberalArts(e.target.value)}
        />
        <input
          type="number"
          placeholder="専門"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </div>

      <button onClick={reset}>リセット</button>

      <h2>進捗: {progress.toFixed(1)}%</h2>

      <h2 style={{ color: graduationOk ? "green" : "red" }}>
        {graduationOk ? "卒業OK" : "まだ不足"}
      </h2>
    </div>
  );
}

export default App;