import axios from "axios";
import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function BlogDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);
  const getData = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    setData(data);
  };
  return (
    <Stack direction={"column"} backgroundColor={"#D3D3D3"} paddingTop={20}>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="space-evenly"
        alignItems="center"
        minHeight="40vh"
      >
        <div>
          <TextField
            size="medium"
            id="filled-basic"
            value={data?.title}
            variant="filled"
            sx={{
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 800,
              backgroundColor: "white",
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            size="medium"
            id="filled-multiline-static"
            multiline
            rows={8}
            defaultValue={data?.body}
            variant="filled"
            sx={{
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              m: 2,
              minWidth: 800,
              backgroundColor: "white",
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </Box>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="space-evenly"
        alignItems="center"
        minHeight="38.5vh"
      ></Box>
    </Stack>
  );
}
export default BlogDetails;
