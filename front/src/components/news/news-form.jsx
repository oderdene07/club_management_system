import { CameraIcon } from "@heroicons/react/24/solid";
import { Box, Button, CardMedia, Stack, TextField, Tooltip } from "@mui/material";
import Editor from "./news-editor";
import { useEffect, useState } from "react";

export const NewsForm = ({ values, handleChange, handleImageChange, handleChangeEditor }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <Stack spacing={2}>
      <TextField
        required
        label="Title"
        name="title"
        fullWidth
        value={values ? values.title : ""}
        onChange={handleChange}
      />
      <Box>
        {values && values.image ? (
          <Stack alignItems="flex-start">
            <Tooltip title="Click to change image">
              <Button
                variant="outlined"
                component="label"
                sx={{
                  padding: 0,
                  overflow: "hidden",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                <CardMedia component="img" height={250} image={values.image} alt="Event Image" />
                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
              </Button>
            </Tooltip>
          </Stack>
        ) : (
          <Button
            variant="outlined"
            component="label"
            startIcon={
              <CameraIcon
                style={{
                  width: 28,
                  height: 28,
                }}
              />
            }
          >
            Upload Image ...
            <input hidden accept="image/*" type="file" onChange={handleImageChange} />
          </Button>
        )}
      </Box>
      <Editor
        name={"content"}
        value={values ? values.content : ""}
        onChange={handleChangeEditor}
        editorLoaded={editorLoaded}
      />
    </Stack>
  );
};
