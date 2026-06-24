import { Link } from "react-router";
import { FileSearchCorner } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col p-8 gap-4">
      <h1>
        Oh no, this route does not exist
      </h1>
      <span>
        You can click <Link>here</Link> to head back to the landing page
      </span>
    </div>
  )
}
export default ErrorPage;