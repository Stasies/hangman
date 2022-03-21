import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const Home = () => {
  let word = "potato";
  let ltr = useRef();
  let wrong = useRef();
  let button = useRef();
  let open = useRef();
  let i;
  const [guessedLetter, setGuessedLetter] = useState(false);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showWrongLetters, setShowWrongLetters] = useState([]);
  const [openLetter, setOpenLetter] = useState([]);
  const [openWord, setOpenWord] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const removeDuplicates = (arr) => [...new Set(arr)];

  let letter = word.split("");

  useEffect(() => {
    function getGuessed() {
      setOpenWord(openLetter);
    }
    getGuessed();
    console.log(openWord);
  }, [openLetter, openWord]);

  const guessLetter = () => {
    setGuessedLetter(ltr.current.value);
    if (letter.indexOf(guessedLetter) != -1) {
      console.log("horray");
      openLetter.push(letter[letter.indexOf(guessedLetter)]);
    } else {
      wrongLetters.push(guessedLetter);
      setShowWrongLetters(removeDuplicates(wrongLetters));
      console.log(showWrongLetters);
    }
    ltr.current.value = "";
  };

  useEffect(() => {
    const gameFail = () => {
      if (showWrongLetters.length >= 4) {
        setDisabled(true);
        setDisabled(true);
      }
    };
    gameFail();
  }, [showWrongLetters.length]);
  return (
    <>
      <div className="container">
        {letter.map((w, index) => (
          <div className="letter" id={index} key={index} ref={open}>
            {guessedLetter == w ? w : ""}
          </div>
        ))}
      </div>
      <div className="guess">
        <input type="text" maxLength="1" ref={ltr} />
        {disabled ? (
          <button disabled>You lost</button>
        ) : (
          <button
            ref={button}
            onClick={() => guessLetter()}
            className="guess_button"
          >
            Guess
          </button>
        )}

        {showWrongLetters.map((e) => (
          <div>{e}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
