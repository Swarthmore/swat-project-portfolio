import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {Link} from "@material-ui/core";

export default function MarkdownRenderer({ children, ...rest }: { children: any }) {
   return (
       <ReactMarkdown
           plugins={[gfm]}
           children={children}
           components={{
               a: (props) => <Link {...props} color="secondary" />
           }}
           {...rest}
       />
   )
}