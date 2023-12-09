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
function CreateBlog() {
  const { id } = useParams();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
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
    setTitle(data.title);
    setBody(data.body);
  };
  const mutationCreateBlog = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    },
    onSuccess: (response) => {
      toast.success("Blog Created Successfully");
      navigate(`/blogs`);
    },
    onError: (response) => {
      toast.error("Error Occured");
    },
  });
  const mutationUpdateBlog = useMutation({
    mutationFn: async () => {
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return data;
    },
    onSuccess: (response) => {
      toast.success("Blog Update Successfully");
      navigate(`/blogs`);
    },
    onError: (response) => {
      toast.error("Error Occured");
    },
  });
  //   function getExistingBlog(params) {
  //     query = useQuery({
  //       queryKey: ["blogs"],
  //       queryFn: async () => {
  //         const { data } = await axios.get(
  //           `https://jsonplaceholder.typicode.com/posts/${id}`
  //         );
  //         return data;
  //       },
  //     });
  //   }

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
            value={title}
            variant="filled"
            sx={{
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 800,
              backgroundColor: "white",
            }}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            size="medium"
            id="filled-multiline-static"
            multiline
            rows={8}
            defaultValue={body}
            variant="filled"
            sx={{
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              m: 2,
              minWidth: 800,
              backgroundColor: "white",
            }}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              if (id) {
                mutationUpdateBlog.mutate({
                  title: title,
                  body: body,
                });
              } else {
                mutationCreateBlog.mutate({
                  title: title,
                  body: body,
                });
              }
            }}
          >
            {id ? "Update Blog" : "Create Blog"}
          </Button>
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
export default CreateBlog;
