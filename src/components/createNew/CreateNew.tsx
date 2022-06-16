import React, { useReducer, ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './CreateNew.scss';

export default function CreateNew() {
  const [contentString, setContentString] = useState('');
  const contentArray = contentString.split('\n').filter((item) => item !== '');
  function formReducer(
    state: {
      author: string;
      heading: string;
      photoUrl: string;
      topic: string;
    },
    action: { type: unknown; field: string; payload: string }
  ) {
    switch (action.type) {
      case 'textSubmit':
        return {
          ...state,
          [action.field]: action.payload
        };
      default:
        return state;
    }
  }

  const initialState = {
    author: '',
    heading: '',
    photoUrl: '',
    topic: ''
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  function getContent(e: ChangeEvent<HTMLTextAreaElement>) {
    setContentString(e.target.value);
  }

  function getText(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'textSubmit',
      field: e.target.name,
      payload: e.target.value
    });
  }

  const config = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      heading: formState.heading,
      author: formState.author,
      photoUrl: formState.photoUrl,
      topic: formState.topic,
      content: [...contentArray]
    })
  };

  function sendForm() {
    fetch('https://code-challenge-back.herokuapp.com/articles', config)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        } else {
          alert(`Thank you for your submission`);
        }
      });
  }

  return (
    <div className="formWrapper">
      <p>
        Please fill out the following form to create a new blog article. All requested data are
        mandatory for a successful submission.
      </p>
      <form>
        <label>
          Photo
          <input
            type="text"
            name="photoUrl"
            placeholder="http://www.a-pretty-picture.example"
            value={formState.photoUrl}
            onChange={(e) => getText(e)}
          />
        </label>
        <label>
          Heading
          <input
            type="text"
            name="heading"
            placeholder="what is the article about?"
            value={formState.heading}
            onChange={(e) => getText(e)}
          />
        </label>
        <label>
          Author
          <input
            type="text"
            name="author"
            placeholder="what is your name?"
            value={formState.author}
            onChange={(e) => getText(e)}
          />
        </label>
        <label>
          Topic
          <input
            type="text"
            name="topic"
            placeholder="beauty, health, food and drink, travel, fashion, or finance"
            value={formState.topic}
            onChange={(e) => getText(e)}
          />
        </label>
        <label>
          <p>
            Content: Write the body of your article in the field below. Separate each new paragraph
            by hitting the {<span>enter</span>} or {<span>return</span>} key to start a new line
          </p>
          <textarea
            placeholder="start typing"
            rows={15}
            value={contentString}
            onChange={(e) => getContent(e)}></textarea>
        </label>
      </form>
      <button onClick={() => sendForm()}>send</button>
      <NavLink to="/"> Click to return to Main Page</NavLink>
    </div>
  );
}
