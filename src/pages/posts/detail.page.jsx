import { useParams } from "react-router-dom"

function PostDetail() {
    const {post_id} = useParams();
    console.log(post_id);
  return (
    <div>
      details page
    </div>
  )
}

export default PostDetail
