(function() {

  var easyQuestions = [{
    question: "What is the first name of the tennis playing sister of Serena Williams?",
    choices: ["Khloe", "Venus", "Amy", "Vanessa"],
    correctAnswer: 1
  }, {
    question: "A variety of apple called Granny Smith, is what color?",
    choices: ["blue", "orange", "red", "green"],
    correctAnswer: 3
  }, {
    question: "What is the name of the kids show that features big purple dinosaur?",
    choices: ["Thomas", "Fred", "Barney", "The Wiggles"],
    correctAnswer: 2
  }, {
    question: "Who is condisered to be the greatest basketball player of all time?",
    choices: ["Steph Curry", "Michael Jordan", "Larry Bird", "Kobe Bryant"],
    correctAnswer: 1
  }, {
    question: "What is the capital of the United States of America?",
    choices: ["Washington, D.C.", "Seattle", "Maryland", "Canada"],
    correctAnswer: 0
  }];

  var mediumQuestions = [{
    question: "What is James Bond's secret agent number?",
    choices: ["911", "80", "4", "007"],
    correctAnswer: 3
  }, {
    question: "How many edges does a cube have?",
    choices: ["6", "1", "5", "10"],
    correctAnswer: 0
  }, {
    question: "What is the biggest continent in the world?",
    choices: ["Europe", "Asia", "Canada", "Alaska"],
    correctAnswer: 1
  }, {
    question: "Which comic book superhero does not have any 'special powers'?",
    choices: ["Superman", "Flash", "Batman", "Pinocchio"],
    correctAnswer: 2
  }, {
    question: "Who is usually credited for the invention of the light bulb?",
    choices: ["Thomas Edison", "Albert Einstein", "Geroge Washington", "Isaac Newton"],
    correctAnswer: 0
  }];

  var hardQuestions = [{
    question: "What does the 'www' stand for in 'www.google.com'?",
    choices: ["webpage", "world wide web", "whiskey while working", "internet"],
    correctAnswer: 1
  }, {
    question: "What is the square root of the number 25?",
    choices: ["1", "7.43", "625", "5"],
    correctAnswer: 3
  }, {
    question: "What American icon wore a 'coonskin cap?",
    choices: ["Henry Ford", "Paul Bunyan", "Davy Crockett", "John Adams"],
    correctAnswer: 2
  }, {
    question: "What kind of car did the 'Dukes of Hazard' drive",
    choices: ["Dodge Charger", "Dodge Neon", "Chevrolet Camaro", "Ford Thunderbird"],
    correctAnswer: 0
  }, {
    question: "What kind of animal was Lassie",
    choices: ["elephant", "horse", "dolphin", "dog"],
    correctAnswer: 3
  }];

  var diff = 0; //difficulty
	var right = 0;
	var wrong = 0;
	var counter = 0; // keep track of which question the user is on
  var diffButtons = document.getElementsByClassName("diff");
  var answerButtons = document.getElementsByClassName("answer");
	var resetButton = document.getElementById("reset");
  var start = document.getElementById("start");
	var question = document.getElementById("question");
	var correct = document.getElementById("correct");
	var missed = document.getElementById("missed");
	var check = document.getElementById("submit");
	var next = document.getElementById("next");
  var label = document.getElementsByClassName("guessLabel")

	for (var i = 0; i < 4; i++) {
		answerButtons[i].style.visibility = "hidden";
	}
	
	check.disabled = true;
	next.disabled = true;
	
	right = 0;
	wrong = 0;
	correct.textContent = right;
	missed.textContent = wrong;
		
	start.addEventListener("click", startQuiz, false);
	check.addEventListener("click", submitAnswer, false);
	next.addEventListener("click", nextQuestion, false);
	resetButton.addEventListener("click", resetAll, false);

  function getDifficulty() { //sets difficulty of questions
		
		diff = 0;
		
		if (diffButtons[2].checked === true) {
				diff = 3;
		} else if (diffButtons[1].checked === true) {
				diff = 2;
		} else {
				diff = 1;
		}
		
  }
    
    function radioHidden() {
        for (var i = 0; i < 4; i++) {
            answerButtons[i].style.visibility = "hidden"
        }
    }
    
    function radioVis() {
        for (var i = 0; i < 4; i++) {
            answerButtons[i].style.visibility = "visible"
        }
    }
    
    function radioGuess() {
      if (diff === 1) {
				question.textContent = easyQuestions[counter]["question"];
				for (var i = 0; i < 4; i++) {
					label[i].textContent = easyQuestions[counter]["choices"][i];
				}
			} else if (diff === 2) {
					question.textContent = mediumQuestions[counter]["question"];
					for (var i = 0; i < 4; i++) {
						label[i].textContent = mediumQuestions[counter]["choices"][i];
					}
			} else if (diff === 3) {
					question.textContent = hardQuestions[counter]["question"];
					for (var i = 0; i < 4; i++) {
						label[i].textContent = hardQuestions[counter]["choices"][i];
					}
			}
    }
  
  function startQuiz() {
		
		next.disabled = true;
		start.disabled = true;
		check.disabled = false;
      
		getDifficulty();
		radioVis();
		radioGuess()
		
	}
	
	function submitAnswer() {  //check answer check vs. correct answer
    
		var wrongGuess = 0;
		
    check.disabled = true;
        
		for (var i = 0; i < 4; i++) {
      if (answerButtons[i].checked) {
        if (diff === 1) {
          if (Number(answerButtons[i].value) === easyQuestions[counter]["correctAnswer"]) {
            right++;
          } else {
						wrongGuess++;
					}
        } else if (diff === 2) {
          if (Number(answerButtons[i].value) === mediumQuestions[counter]["correctAnswer"]) {
            right++;
          } else {
						wrongGuess++;
					}
        }else {
          if (Number(answerButtons[i].value) === hardQuestions[counter]["correctAnswer"]) {
            right++;
          } else {
						wrongGuess++;
					}
        }
      }
    };
		
		if (wrongGuess > 0) {
			wrong++;
		}
		
		correct.textContent = right;
		missed.textContent = wrong;
        
    next.disabled = false;
		
	}
	 
	function nextQuestion() {
		
		counter++;
		
    check.disabled = false;
		next.disabled = true;
            
		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
		}
		if (counter < 5) {
            radioGuess();
        } else {
            question.textContent = "You have reached the end of the quiz!";
            check.disabled = true;
            for (var i = 0; i < 4; i++) {
              label[i].textContent = ""
            }
            radioHidden();
        }
		
	}
	
	function resetAll() {
		
		right = 0;
		wrong = 0;
		diff = 0;
		counter = 0;
		
		question.textContent = "";
		correct.textContent = right;
		missed.textContent = wrong;
        
    radioHidden();
		
		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
      label[i].textContent = "";
		}
		
		start.disabled = false;
		next.disabled = true;
		check.disabled = true;
		
	}
  
})();