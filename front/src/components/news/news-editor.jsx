import { apiClient } from "@/api/apiClient";
import { useEffect, useRef } from "react";

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

function MyUploadAdapter(loader) {
  return {
    upload: () => {
      return loader.file.then((file) => {
        const formData = new FormData();
        formData.append("image", file);
        return apiClient
          .post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            return {
              default: process.env.NEXT_PUBLIC_API_URL + res.data,
            };
          });
      });
    },
  };
}

function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          config={{
            extraPlugins: [MyCustomUploadAdapterPlugin],
          }}
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
