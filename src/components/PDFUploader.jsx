import { useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import Tesseract from "tesseract.js";

GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFUploader({ onTextExtracted }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage("PDFを読み込み中...");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      if (fullText.trim().length < 20) {
        setMessage("OCRで読み取り中...");
        fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          const imageData = canvas.toDataURL("image/png");
          const result = await Tesseract.recognize(imageData, "jpn+eng");

          fullText += result.data.text + "\n";
        }
      }

      onTextExtracted(fullText);
      setMessage("読み取り完了！");
    } catch (error) {
      console.error(error);
      setMessage("PDFの読み取りに失敗しました");
    }

    setLoading(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="file" accept="application/pdf" onChange={handleFile} />
      {loading && <p>処理中...</p>}
      {message && <p>{message}</p>}
    </div>
  );
}