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
    choices: ["Thomas Edison", "Albert Einstein", "George Washington", "Isaac Newton"],
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
    question: "What kind of animal was Lassie?",
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
	var back = document.getElementById("back");
	var fadeEl = document.getElementById("fade");
  var label = document.getElementsByClassName("guessLabel");
	var guessForm = document.getElementById("guessForm");
	var caution = document.getElementById("caution");
	var gameContainer = document.getElementById("container2");  // container for questions and answers
	var previous = document.getElementById("previous"); // to set previous score

	for (var i = 0; i < 4; i++) {
		answerButtons[i].style.visibility = "hidden";
	}
	
	check.disabled = true;
	back.disabled = true;
	
	right = 0;
	wrong = 0;
	correct.textContent = right;
	missed.textContent = wrong;
		
	start.addEventListener("click", startQuiz, false);
	back.addEventListener("click", goBack, false);
	check.addEventListener("click", submitAnswer, false);
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
		
		if (diff === 3) {
			question.textContent = hardQuestions[counter]["question"];
			
			for (var i = 0; i < 4; i++) {
				label[i].textContent = hardQuestions[counter]["choices"][i];
			}
			
		} else if (diff === 2) {
			question.textContent = mediumQuestions[counter]["question"];
			
			for (var i = 0; i < 4; i++) {
				label[i].textContent = mediumQuestions[counter]["choices"][i];
			}
			
		} else {
			diffButtons[0].checked = true;
			question.textContent = easyQuestions[counter]["question"];
			
			for (var i = 0; i < 4; i++) {
				label[i].textContent = easyQuestions[counter]["choices"][i];
			}
			
		}
		
	}
  
  function startQuiz() {
		
		fadeIn();
		
		start.disabled = true;
		check.disabled = false;
      
		getDifficulty();
		radioVis();
		radioGuess();
		
		if (localStorage.score >= 0) {
			var score = localStorage.getItem("score");
			previous.textContent = score + "/" + easyQuestions.length;
		} else {
			previous.textContent = "N/A";
		}
		
	}
	
	function submitAnswer() {  //check user answer vs. correct answer
    
		var wrongGuess = 0;
		var didAnswer = 0; // to check if user chose an answer
        
		for (var i = 0; i < 4; i++) {
      if (answerButtons[i].checked === true) {
				didAnswer =  1;
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
      } else {
				continue;
			}
			
    }
		
		if (wrongGuess > 0) {
			wrong++;
		}
		
		// check if answer was submitted
		if (didAnswer === 1) {
			check.disabled = true; // disable when answer is chosen
			guessForm.classList.remove("cautionBorder");
			caution.style.visibility = "hidden";
			correct.textContent = right;
			missed.textContent = wrong;
			nextQuestion();
		} else {
			caution.style.visibility = "visible";
			guessForm.classList.add("cautionBorder");
		}
		
		back.disabled = false;
		
	}
	
	function goBack() {
		
		counter--;
		
	}
	 
	function nextQuestion() {
		
		fadeOut();
		fadeIn();
		
		counter++;
		
    check.disabled = false;
            
		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
		}
		
		if (counter < easyQuestions.length) {
      radioGuess();
    } else {
			question.textContent = "Congratulations! You have reached the end of the quiz!";
			check.disabled = true;
			back.disabled = true;
			
			for (var i = 0; i < 4; i++) {
				label[i].textContent = ""
			}
			
			radioHidden();
			
			if (storageAvailable("localStorage")) {
				localStorage.setItem("score", right);
			}
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
		caution.style.visibility = "hidden";
		guessForm.classList.remove("cautionBorder");
        
    radioHidden();
		
		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
      label[i].textContent = "";
		}
		
		for (var i = 0; i < 3; i++) {
			diffButtons[i].checked = false;
		}
		
		start.disabled = false;
		check.disabled = true;
		back.disabled = true;
		
	}
	
	// check if local storage is available
	function storageAvailable(type) {
		
		try {
			var storage = window[type];
			var x = "__storage_test__";
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		} catch (e) {
			return false;
		}
		
	}
	
	// fade in
	function fadeIn() {
		
		var val = parseFloat(fadeEl.style.opacity);
		
		var timer = setInterval(function() {
			if (val >= 1.0) {
				clearInterval(timer);
			}
			
			val += 0.1;
			fadeEl.style.opactiy = val;
		}, 500);
		
	}
	
	// fade out
	function fadeOut(){
		
		var val = parseFloat(fadeEl.style.opacity);
		
		var timer = setInterval(function() {
			if (val <= 1.0) {
				clearInterval(timer);
			}
			
			val -= 0.1;
			fadeEl.style.opactiy = val;
		}, 500);
		
	}
	
	
  
})();