import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function Texteditor() {
  const { quill, quillRef } = useQuill();

  console.log(quill); // undefined > Quill Object
  console.log(quillRef);
  return (
    <div style={{ width: 900, height: 500 }}>
      <div ref={quillRef} />
    </div>
  );
}

export default Texteditor;
