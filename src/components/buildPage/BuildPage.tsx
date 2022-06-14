import './BuildPage.scss';

interface pageProps {
  author: string;
  content: [string];
  createdAt: string;
  heading: string;
  photoUrl: string;
  topic: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export default function BuildPage({ author, content, heading, photoUrl, topic }: pageProps) {
  if (!heading) {
    return null;
  } else {
    return (
      <div className="pageWrapper">
        <div style={{ backgroundImage: `url(${photoUrl})` }} className="pagePhoto"></div>
        <h1>{heading}</h1>
        <h5>Written by: {author}</h5>
        <p>topic: {topic}</p>
        {content.map((item, index) => (
          // eslint-disable-next-line react/jsx-key
          <p key={index + 'topic'}>{item}</p>
        ))}
      </div>
    );
  }
}
