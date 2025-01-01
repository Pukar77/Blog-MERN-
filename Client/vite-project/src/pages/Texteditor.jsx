import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function Texteditor({ setText }) {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      // Listen to text changes in the editor
      quill.on("text-change", () => {
        const content = quill.root.innerHTML; // Get editor content as HTML
        setText(content); // Update parent state with content
      });
    }
  }, [quill, setText]);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <div ref={quillRef} />
    </div>
  );
}

export default Texteditor;
