import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';
import './Landing.scss';

export default function LandingPage() {
  //These useStates will be used to edit the individual sections
  const [editHeading, setEditHeading] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editTopic, setEditTopic] = useState('');
  const [editContent, setEditContent] = useState('');
  const editedSplitArray = editContent.split('\n').filter((item) => item !== '');
  const [showEdit, setShowEdit] = useState(false);

  //This is the function to generate a config file to send as a PATCH request to the API
  function sendEdits(
    e: MouseEvent<HTMLElement>,
    parameter1: string,
    parameter2: string | string[]
  ) {
    e.preventDefault();
    if (parameter2.length < 1) {
      return null;
    }
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [parameter1]: parameter2
      })
    };
    fetch(`http://localhost:4000/articles/${mainDoc._id}`, config)
      .then((response) => response.json())
      .then((response) => {
        if (response._id) {
          setMainDoc(response);
        }
      });
  }

  //This function clears the input field
  function clear(
    e: MouseEvent<HTMLElement>,
    selectedState: React.Dispatch<React.SetStateAction<string>>
  ) {
    e.preventDefault();
    selectedState('');
  }

  //The following line is used for the useEffect array of dependencies
  const [effected, setEffected] = useState('');

  //The following line is the array of objects that is used for the sidebar
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

  //The following line uses the response from the original API call to set the main blog article of the landing page
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

  //The following line is used the change the main blog article to one from the array of fetched articles
  function getNewDoc(e: MouseEvent<HTMLLIElement>) {
    const target = e.target as Element;

    fetch(`http://localhost:4000/articles/${target.id}`)
      .then((response) => response.json())
      .then((response) => setMainDoc(response));
  }

  //This function deletes the selected article from the API
  function deleteArticle() {
    fetch(`http://localhost:4000/articles/${mainDoc._id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((response) => console.log(response));
    const deletedArray = results.filter((item) => item._id !== mainDoc._id);
    setResults([...deletedArray]);
    setMainDoc(deletedArray[0]);
  }

  if (results.length < 1) {
    return (
      <div>
        <h1>Sorry, no articles found</h1>
        <NavLink to="/createNew"> Click to Create a new blog post </NavLink>
      </div>
    );
  }
  return (
    <div className="landingWrapper">
      <div className="pageWrapper">
        <div className="headingWithPhoto">
          <h1 id="heading">{mainDoc.heading}</h1>

          {showEdit && (
            <form>
              <input
                type="text"
                placeholder="heading"
                value={editHeading}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditHeading(e.target.value)}
              />
              <button onClick={(e) => sendEdits(e, 'heading', editHeading)}>Save edits</button>
              <button onClick={(e) => clear(e, setEditHeading)}>Clear</button>
            </form>
          )}
          <div
            id="photoUrl"
            className="pagePhoto"
            style={{ backgroundImage: `url(${mainDoc.photoUrl})` }}></div>
          {showEdit && (
            <form>
              <input
                type="text"
                placeholder="photoUrl"
                value={editPhoto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditPhoto(e.target.value)}
              />
              <button onClick={(e) => sendEdits(e, 'photoUrl', editPhoto)}>Save edits</button>
              <button onClick={(e) => clear(e, setEditPhoto)}>Clear</button>
            </form>
          )}
        </div>
        <h5 id="author">Written by: {mainDoc.author}</h5>
        {showEdit && (
          <form>
            <input
              type="text"
              placeholder="author"
              value={editAuthor}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEditAuthor(e.target.value)}
            />
            <button onClick={(e) => sendEdits(e, 'author', editAuthor)}>Save edits</button>
            <button onClick={(e) => clear(e, setEditAuthor)}>Clear</button>
          </form>
        )}
        <p id="topic">topic: {mainDoc.topic}</p>
        {showEdit && (
          <form>
            <input
              type="text"
              placeholder="topic"
              value={editTopic}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEditTopic(e.target.value)}
            />
            <button onClick={(e) => sendEdits(e, 'topic', editTopic)}>Save edits</button>
            <button onClick={(e) => clear(e, setEditTopic)}>Clear</button>
          </form>
        )}
        {mainDoc.content.map((item, index) => (
          <p key={index + mainDoc.topic}>{item}</p>
        ))}
        {showEdit && (
          <form>
            <textarea
              placeholder="start typing"
              rows={10}
              value={editContent}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setEditContent(e.target.value)
              }></textarea>
            <button onClick={(e) => sendEdits(e, 'content', [...editedSplitArray])}>
              Save edits
            </button>
            <button onClick={(e) => clear(e, setEditContent)}>Clear</button>
          </form>
        )}

        <button onClick={() => setShowEdit(!showEdit)}>
          {showEdit ? 'Close edit dialog' : 'Click to edit this article'}
        </button>
        <button id="deleteArticle" onClick={() => deleteArticle()}>
          DELETE
        </button>
      </div>
      <div className="sidebar">
        {results.map((item, index) => (
          <li key={index + 'sidebar'} id={item._id} onClick={(e) => getNewDoc(e)}>
            {item.heading}
          </li>
        ))}
        <NavLink to="/createNew"> Click to Create a new blog post </NavLink>
      </div>
    </div>
  );
}
