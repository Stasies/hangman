import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Hangman from "./hangman.png";

const Try = () => {
  let input = useRef();
  let button = useRef();
  const [result, setResult] = useState();
  const [attempts, setAttempts] = useState(8);
  const [difficulty, setDifficulty] = useState(true);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [rightLetters, setRightLetters] = useState([]);
  const [filteredWrongLetters, setFilteredWrongLetters] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [indices, setIndices] = useState([]);
  const [randomWord, setRandomWord] = useState("сок");
  const [arraySorted, setArraySorted] = useState([]);
  let hiddenWord = "potato";
  let wordList = [
    "сок",
    "картон",
    "равно",
    "садик",
    "боль",
    "любовь",
    "вера",
    "стол",
    "утеха",
    "чувства",
    "экспертиза",
    "бинго",
    "бордель",
    "рандеву",
    "акционер",
    "эпоха",
    "рабство",
    "апельсин",
    "выгода",
    "метро",
    "порт",
  ];

  window.onload = () => {
    setRandomWord(wordList[Math.floor(Math.random() * wordList.length)]);
    console.log(randomWord);
  };

  let hiddenWordArray = randomWord.split("");

  const removeDuplicates = (arr) => [...new Set(arr)];

  const wrong = () => {
    wrongLetters.push(input.current.value);
    console.log(wrongLetters);
    setFilteredWrongLetters(removeDuplicates(wrongLetters));
  };
  const right = () => {
    let i = randomWord.indexOf(input.current.value);
    console.log(indices);
    console.log(randomWord.charAt(i));
    document.getElementById(i).innerHTML = randomWord.charAt(i);
    rightLetters.push(randomWord.charAt(i));
    setArraySorted(removeDuplicates(rightLetters.sort()));
    console.log(arraySorted);
    console.log(hiddenWordArray.sort());
  };
  const guessWord = () => {
    if (randomWord.match(input.current.value)) {
      right();
      input.current.value = "";
    } else {
      console.log(randomWord);
      wrong();
      input.current.value = "";
      setAttempts(attempts - 1);
      let boxNumber = 6 - attempts;
      document.getElementsByClassName(`box${boxNumber}`).classList.add = "hide";
      console.log(boxNumber);
      console.log(attempts);
    }
  };

  useEffect(() => {
    if (arraySorted.length === hiddenWordArray.length) {
      setDisabled(true);
      setResult("Вы выиграли!!");
    }
    console.log(arraySorted);
    console.log(hiddenWordArray.sort());
    const gameFail = () => {
      if (attempts === 0) {
        setResult("Вы проиграли!");
        setDisabled(true);
      }
    };
    gameFail();
  }, [attempts, arraySorted, hiddenWordArray]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      guessWord();
    } else if (e.key.match(/[0-9]/)) return e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="top">
            <p className="attempts">Осталось попыток:</p>{" "}
            <p className="number">{`${attempts}`} </p>
            {/* <img src={Hangman} alt="" />
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
            <div className="box box4"></div>
            <div className="box box5"></div> */}
          </div>
          <div className="bottom">
            {hiddenWordArray.map((h, index) => (
              <div className="letter" id={index}>
                {""}
              </div>
            ))}
          </div>
        </div>

        <div className="right">
          <h1 className="title">Угадай слово</h1>
          <div className="input_container">
            {disabled ? (
              <>
                <input className="input" type="text" maxLength="1" disabled />
                <div className="buttons">
                  <button disabled>{`${result}`}</button>
                  <button onClick={() => window.location.reload()}>
                    Играть еще раз
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  className="input"
                  type="text"
                  maxLength="1"
                  ref={input}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
                <button
                  ref={button}
                  className="input_button"
                  onClick={() => guessWord()}
                >
                  Угадать
                </button>
              </>
            )}
            <div className="mistakes_container">
              {disabled ? (
                <>
                  <p className="mistakes_title">{`${result}`}</p>
                  <div className="mistakes">
                    <p className="correct">
                      Загадано слово: {`${randomWord}`}{" "}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="mistakes_title" ref={result}>
                    Неправильные буквы:
                  </p>
                  <div className="mistakes">
                    {filteredWrongLetters.map((e) => (
                      <p className="mistake">{e}</p>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Try;
