(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Which actor played Dr Peter Venkman in the original Ghostbusters films?",
      answers: {
        a: "John Candy",
        b: "Dan Akroyd",
        c: "Bill Murray"
      },
      correctAnswer: "c"
    },
    {
      question: "What becomes self-aware and triggers The Terminator series plot?",
      answers: {
        a: "T1000",
        b: "Cyberdyne",
        c: "SkyNet"
      },
      correctAnswer: "c"
    },
    {
      question: "Ivan Drago fights Rocky in which film?",
      answers: {
        a: "Rocky II",
        b: "Rocky III",
        c: "Balboa",
        d: "Rocky IV"
      },
      correctAnswer: "d"
    },
    {
      question: "Which of the following is not a Top Gun character?",
      answers: {
        a: "Iceman",
        b: "Maverick",
        c: "Goose",
        d: "Thunder"
      },
      correctAnswer: "d"
    },
    {
      question: "Which year did The Karate Kid premiere?",
      answers: {
        a: "1984",
        b: "1985",
        c: "1986",
        d: "1987"
      },
      correctAnswer: "a"
    },
    {
      question: "What is Robocop's real name?",
      answers: {
        a: "John Connor",
        b: "Vince Smith",
        c: "Rick Ruben",
        d: "Alex Murphy"
      },
      correctAnswer: "d"
    },
    {
      question: "Who played the guitar solo on Michael Jackson's hit Beat It?",
      answers: {
        a: "Slash",
        b: "Angus Young",
        c: "Eddie Van Halen",
        d: "Sting"
      },
      correctAnswer: "c"
    },
    {
      question: "Where do Transformers come from?",
      answers: {
        a: "The Cube",
        b: "Unicron",
        c: "Cybertron",
        d: "Earth"
      },
      correctAnswer: "c"
    },
    {
      question: "Who is the receptionist of The Ghostbusters?",
      answers: {
        a: "Janine",
        b: "April",
        c: "Marie",
        d: "Dana"
      },
      correctAnswer: "a"
    },
     {
      question: "What year does Marty go back to in Back to the Future?",
      answers: {
        a: "1955",
        b: "1930",
        c: "1973",
        d: "1958"
      },
      correctAnswer: "a"
    }
  ];

  // start it
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
