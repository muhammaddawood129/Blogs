import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box, Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomizedButtons from "../../components/common/buttons/createButton";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";

function Blogs() {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    },
  });
  const queryClient = useQueryClient();
  const mutationDeleteBlog = useMutation({
    queryKey: ["deleteBlogs"],
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return data;
    },
    onSuccess: (response) => {
      toast.success("Blog Deleted Successfully");
    },
    onError: (response) => {
      toast.error("Error Occured");
    },
    onSettled: () => {
      // Refetch the 'items' query or update the cache manually
      queryClient.invalidateQueries("deleteBlogs");
    },
  });
  return (
    <React.Fragment>
      <Stack direction={"column"} backgroundColor={"#D3D3D3"} paddingTop={10}>
        <Container>
          <Box
            marginBottom={3}
            display="flex"
            justifyContent="end"
            alignItems="end"
          >
            <CustomizedButtons />
          </Box>
          <Grid
            container
            gap={1}
            spacing={{ xs: 0, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            paddingBottom={2}
          >
            {query.data?.map((x, i) => (
              <Card
                key={i}
                variant="elevation"
                sx={{ width: 380 }}
                style={{ flexDirection: "row" }}
              >
                <CardContent
                  className="blog-content"
                  onClick={() => {
                    navigate(`/blogs/blogDetails/${x.id}`);
                  }}
                  sx={{ height: 100 }}
                >
                  {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {x.id}
      </Typography> */}
                  <Typography className="blog-title" variant="h6">
                    {x.title}
                  </Typography>
                  {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
       {x.userId}
      </Typography>
      <Typography variant="body2">
        {x.body}
      </Typography> */}
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      navigate(`/blogs/manage/${x.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      mutationDeleteBlog.mutate(x.id);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Container>
      </Stack>
    </React.Fragment>
  );
}

export default Blogs;
