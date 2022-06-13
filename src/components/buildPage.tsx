export default function BuildComponent(doc: {
  photoUrl: string;
  heading: string;
  author: string;
  content: string;
  topic: string;
}) {
  if (!doc.heading) {
    return null;
  } else {
    return (
      //default className is singleDocWrapper
      <div>
        <div style={{ backgroundImage: `url(${doc.photoUrl})` }}></div>
        <h1>{doc.heading}</h1>
        <h5>Written by: {doc.author}</h5>
        <p>{doc.topic}</p>
        <p>{doc.content}</p>
      </div>
    );
  }
}
