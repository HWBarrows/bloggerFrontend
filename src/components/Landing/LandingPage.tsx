import React, { useState, useEffect, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import BuildPage from '../buildPage/BuildPage';

export default function LandingPage() {
  const [effected, setEffected] = useState('');
  const [results, setResults] = useState<
    {
      author: string;
      content: [string];
      createdAt: string;
      heading: string;
      photoUrl: string;
      topic: string;
      updatedAt: string;
      __v: number;
      _id: string;
    }[]
  >([]);
  const [mainDoc, setMainDoc] = useState<{
    author: string;
    content: [string];
    createdAt: string;
    heading: string;
    photoUrl: string;
    topic: string;
    updatedAt: string;
    __v: number;
    _id: string;
  }>({
    author: '',
    content: [''],
    createdAt: '',
    heading: '',
    photoUrl: '',
    topic: '',
    updatedAt: '',
    __v: 0,
    _id: ''
  });

  useEffect(() => {
    fetch('http://localhost:4000/articles')
      .then((response) => response.json())
      .then((response) => {
        setResults(response);
        setMainDoc(response[0]);
      });
  }, [effected]);

  function getNewDoc(e: MouseEvent<HTMLLIElement>) {
    const target = e.target as Element;

    fetch(`http://localhost:4000/articles/${target.id}`)
      .then((response) => response.json())
      .then((response) => setMainDoc(response));
  }

  const sidebar = results.filter((item) => item.heading !== mainDoc.heading);

  return (
    <div className="landingWrapper">
      {' '}
      <BuildPage {...mainDoc} />
      <div>
        {sidebar.map((item, index) => (
          <li key={index + 'sidebar'} id={item._id} onClick={(e) => getNewDoc(e)}>
            {item.heading}
          </li>
        ))}
      </div>
    </div>
  );
}
