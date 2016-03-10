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
  var previousNumber = 6;
	var right = 0;
	var wrong = 0;
	var randomNum;
  var diffButtons = document.getElementsByClassName("diff");
  var answerButtons = document.getElementsByClassName("answer");
	var resetButton = document.getElementById("reset");
  var start = document.getElementById("start");
	var question = document.getElementById("question");
	var correct = document.getElementById("correct");
	var missed = document.getElementById("missed");
	var check = document.getElementById("submit");
	var next = document.getElementById("next");

	for (var i = 0; i < 4; i++) {
			answerButtons[i].style.visibility = "hidden";
	}
	
	check.disabled = true;
	next.disabled = true;
	
	right = 0;
	wrong = 0;
	diff = 0;
	correct.textContent = right;
	missed.textContent = wrong;
		
	start.addEventListener("click", startQuiz, false);
	check.addEventListener("click", submitAnswer, false );

  function getDifficulty() { //sets difficulty of questions
		
		if (diffButtons[0].checked = true) {
				diff = 1;
		} else if (diffButtons[1].checked = true) {
				diff = 2;
		} else if (diffButtons[2].checked = true) {
				diff = 3;
		}
		
  }
  
  function startQuiz() {
		
		next.disabled = true;
		start.disabled = true;
		check.disabled = false;
		getDifficulty();
		randomNumber();
		for (var i = 0; i < 4; i++) {
			answerButtons[i].style.visibility = "visible";
	}
		
		if (diff === 1) {
				question.textContent = easyQuestions[randomNum]["question"];
				for (var i = 0; i < 4; i++) {
					answerButtons[i].value = easyQuestions[randomNum]["choices"][i];
				}
		} else if (diff === 2) {
				question.textContent = mediumQuestions[randomNum]["question"];
				for (var i = 0; i < 4; i++) {
					answerButtons[i].value = mediumQuestions[randomNum]["choices"][i];
				}
		} else if (diff === 3) {
				question.textContent = hardQuestions[randomNum]["question"];
				for (var i = 0; i < 4; i++) {
					answerButtons[i].value = hardQuestions[randomNum]["choices"][i];
				}
		}
		
	}
	
	
	
	function submitAnswer() {  //check answer button check vs. correct answer
		
		for (var i = 0; i < 4; i++) {
			if (answerButtons[i].checked = true) {
				if (diff === 1) {
					if (answerButtons[i].value === easyQuestions[randomNum]["correctAnswer"]) { 
						right++;
					} else {
						wrong++;
					}
				} else if (diff === 2) {
					if (answerButtons[i].value === mediumQuestions[randomNum]["correctAnswer"]) {
						right++;
					} else {
						wrong++;
					}
				} else if (diff === 3) {
					if (answerButtons[i].value === hardQuestions[randomNum]["correctAnswer"]) {
						right++;
					} else {
						wrong++;
					}
				}
			}
		}
		
		next.disabled = false;
		
	}
	
	function nextQuestion() {
		
		next.disabled = true;
		
		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
		}
		
	}

  function randomNumber() { //generate random number 0-5
		
		randomNum = Math.floor(Math.random() * 5);
		
		if (randomNum === previousNumber) {
				randomNumber();
		} else {
				previousNumber = randomNum;
		}
		
  }
	
	function resetAll() {
		right = 0;
		wrong = 0;
		diff = 0;
		correct.textContent = right;
		missed.textContent = wrong;
		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
		}
		start.disabled = false;
	}
  
})()