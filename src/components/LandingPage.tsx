import { useState, useEffect, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';

export default function LandingPage() {
  const [effected, setEffected] = useState('');
  const [results, setResults] = useState('loading');
  const [goodResponse, setGoodResponse] = useState(false);
  const [mainDoc, setMainDoc] = useState({});
  const [goodSingleDoc, setGoodSingleDoc] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/articles')
      .then((response) => response.json())
      .then((response) => {
        setResults(response);
        if (results[0]) {
          setGoodResponse(true);
        }
      });
  }, [effected]);
  console.log(results);

  function getSingleDoc(e: SyntheticEvent) {
    const target = e.target as HTMLElement;
    useEffect(() => {
      fetch(`http://localhost:7700/procedures/${target.id}`)
        .then((response) => response.json())
        .then((response) => {
          setMainDoc(response);
          if (response._id) {
            setGoodSingleDoc(true);
          }
        });
    }, [effected]);
  }

  return <div>Hi from Landing</div>;
}
