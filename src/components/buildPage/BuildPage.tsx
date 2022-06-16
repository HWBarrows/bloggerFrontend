import { useState } from 'react';
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
        <div className="headingWithPhoto">
          <div
            id="photoUrl"
            className="pagePhoto"
            style={{ backgroundImage: `url(${photoUrl})` }}></div>
          <h1 id="heading">{heading}</h1>
        </div>
        <h5 id="author">Written by: {author}</h5>
        <p id="topic">topic: {topic}</p>
        {content.map((item, index) => (
          <p key={index + topic}>{item}</p>
        ))}
        <button>Click to edit this article</button>
      </div>
    );
  }
}
