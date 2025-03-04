import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import { getOneToDo } from "../../utility/api";
import { Button, LoadingOverlay } from "@mantine/core";

function PostDetail() {
    const {id} = useParams();
    const Navigate = useNavigate();
    const { data , isLoading ,isError } = useQuery({
      queryKey: ['fetch-post', id],
      queryFn: () => getOneToDo(id),
    });
    if(isLoading){
      <LoadingOverlay visible/>
    }
    if(isError){
      return <h1>Error Occured</h1>
    }
  return (
    <div>
      <Button variant="subtle" onClick={() => {Navigate(-1)}}>
        Go Back
      </Button>
      <h1>{ data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  )
}

export default PostDetail
