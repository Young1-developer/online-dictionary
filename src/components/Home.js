import React, { useState } from 'react';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dicData, setDicData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    

    setIsLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Word not found');
        }
        return res.json();
      })
      .then((data) => {
        setDicData(data);
      })
      .catch((error) => {
        console.error(error);
        setDicData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='form-container container'>
      <h1 style={{textAlign:'center'}}>Online Dictionary by <span style={{color:'green'}}>Abusameer</span></h1>
      <form onSubmit={handleSubmit}> 
        <input
          type='text'
          placeholder='Search a word by typing here'
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button type='submit'>Search</button>
      </form>

      {isLoading && <p>Loading...</p>}

      {dicData && dicData.length > 0 && (
        <div className='container'>
          {dicData.map((entry, index) => (
            <div key={index}>
              <h2>{entry.word}</h2>
              <p>{entry.origin}</p>
              {entry.phonetics.map((phonetic, pIndex) => (
                <div key={pIndex}>
                  <audio controls src={phonetic.audio}>
                    Your browser does not support the audio element.
                  </audio>
                  <p>{phonetic.text}</p>
                </div>
              ))}
              {entry.meanings.map((meaning, mIndex) => (
                <div key={mIndex}>
                  <h3>{meaning.partOfSpeech}</h3>
                  {meaning.definitions.map((definition, dIndex) => (
                    <p key={dIndex}>{definition.definition}</p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) }
    </div>
  );
}

export default Home;
