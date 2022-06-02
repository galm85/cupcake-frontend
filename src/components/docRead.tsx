import DocViewer,{DocViewerRenderers} from "react-doc-viewer";

type Props = {
    file_uri:string;
}
 
const DocRead:React.FC<Props> = ({file_uri})=> {
  const docs = [
    { uri: file_uri },
    // { uri: require("./example-files/pdf.pdf") }, // Local File
  ];
 
  return <DocViewer pluginRenderers={DocViewerRenderers}  documents={docs}/>;
}


export default DocRead;