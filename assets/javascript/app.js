/* Title: Trivia game                                 */
/* Author: Wallis Chau                                */
/* Description: User answers multiple choice questions*/ 
/*            Summary is shown at the end             */ 
/* Date: 8/25/17                                      */

var correctCount = 0;           
var incorrectCount = 0;
var noAnswerCount = 0;
var timerCounter;
const WAIT_TIME = 8;
var intervalId;
var questionTimeout;
//create array of objects[]
var questionList = [];

//create object type
var QuestionSet = {
	question: null,
	answer1:  null,
	answer2:  null,
	answer3:  null,
	answer4:  null,
	key: 0,
}


//create object {question, answersx4}, one per question set
var question1 = Object.create(QuestionSet);
question1.question = "what does A stand for?";
question1.answer1 = "apple";
question1.answer2 = "away";
question1.answer3 = "excellent";
question1.answer4 = "abstract";
question1.key = 1;
questionList.push(question1);

var question2 = Object.create(QuestionSet);
question2.question = "what does B stand for?";
question2.answer1 = "basic";
question2.answer2 = "boy";
question2.answer3 = "bingo";
question2.answer4 = "banana";
question2.key = 2;
questionList.push(question2);

var question3 = Object.create(QuestionSet);
question3.question = "what does C stand for?";
question3.answer1 = "programming language";
question3.answer2 = "cat";
question3.answer3 = "celcius";
question3.answer4 = "capacitor";
question3.key = 2;
questionList.push(question3);

var question4 = Object.create(QuestionSet);
question4.question = "what does D stand for?";
question4.answer1 = "low grade";
question4.answer2 = "done";
question4.answer3 = "dog";
question4.answer4 = "david";
question4.key = 3;
questionList.push(question4);
//console.log(questionList);

//current question
var curQuestion = 0;


$(document).ready(function() {

/* description: map answer key to answer string */
/* parameter: key - answer key in object        */
/* return:  string of the answer                */
function mapKey2Choice(key) {
	var str =null;
	switch (key) {
		case 1: {
			str = questionList[curQuestion].answer1;
			break;
		}
		case 2: {
			str = questionList[curQuestion].answer2;
			break;
		}
		case 3: {
			str = questionList[curQuestion].answer3;
			break;
		}
		case 4: {
			str = questionList[curQuestion].answer4;
			break;
		}
	}
	return (str);
}

/* description: show result of question/answer                */
/*              hide previous element and show result element */
/* parameter: correct - bool                                  */

function showResult(correct) {
	//hide question
	$('.q-a-row').hide();
	//show timer
	$('#timer').css('background', '#beb');	
	$('#timer').html('<h3 class="text-center">' + 'Time remain: ' + timerCounter + '</h3>');
	$('#timer').show();
	//show msg
	if (correct) {
		//show yea
		$('#Y_N').css('background', '#1f4');
		$('#Y_N').html('<h2 class="text-center">' + 'Correct!' + '</h2>');
	}
	else {
		//show ney
		$('#Y_N').css('background', '#e76');
		$('#Y_N').html('<h2 class="text-center">' + 'Incorrect!' + '</h2>');
		//show correct answer
		//map key to answer string
		var str = mapKey2Choice(questionList[curQuestion].key);
		console.log(str);
		$('#answer-key').css('background', '#eee');
		$('#answer-key').html('<h2 class="text-center">' + 'Correct answer is: ' + str + '</h2>');
		$('#answer-key').show();
	}
	$('#Y_N').show();
}

/* description: show question page                 */
/*              show timer, question, answers      */
function showQuestionPage(curQuestion) {
	timerCounter = WAIT_TIME;
	$('#Y_N').hide();
	$('#answer-key').hide();
	//display question
	$('')
	$('.q-a-row').show();
	$('#question-text').css('background','#af9');
	$('#question-text').html('<h3 class="text-center">' + questionList[curQuestion].question + '</h3>');
	//display answer choices
	$('.answer').css('background','#8ea');
	$('#answer1-text').html('<h3 class="text-center">' + questionList[curQuestion].answer1 + '</h3>');
	$('#answer2-text').html('<h3 class="text-center">' + questionList[curQuestion].answer2 + '</h3>');
	$('#answer3-text').html('<h3 class="text-center">' + questionList[curQuestion].answer3 + '</h3>');
	$('#answer4-text').html('<h3 class="text-center">' + questionList[curQuestion].answer4 + '</h3>');
	//display timer
	$('#timer').css('background', '#beb');
	$('#timer').html('<h3 class="text-center">' + 'Time remain: ' + timerCounter + '</h3>');
	//set timer
	intervalId = setInterval(countDown, 1000);
	 questionTimeout = setTimeout(endQuestion, timerCounter * 1000, intervalId);
}

/* description: show summary at end game             */
/*              show result statistic                */
/*              restart option                      */
function showSummary() {
	//	show end message
	$('#end-msg').css('background', '#af9');
	$('#end-msg').html('<h2 class="text-center">All done. Good job! </h2>');
	$('#end-msg').show();
	//show end result
	$('#result-stat').css('background', '#eee');
	$('.stat').css('background', '#9ef');
	$('#correct-stat').html('<h3 class="text-center">Correct: ' + correctCount + '</h3>');
	$('#incorrect-stat').html('<h3 class="text-center">Incorrect: ' + incorrectCount + '</h3>');
	$('#unanswer-stat').html('<h3 class="text-center">Unanswered: ' + noAnswerCount + '</h3>');
	$('.end-result').show();
	//show restart button
	$('#restart').addClass("text-center");
	var restartBtn = $("<button>");
	restartBtn.text("Restart?");
	restartBtn.attr("id", "restart-button");
	restartBtn.addClass("btn btn-success btn-lg");
	$('#restart').append(restartBtn);
	//click restart button
	$('#restart-button').click(restart);

}

/* description: restart                            */
/*              hide previous page, show questions */
function restart() {
	//hide result page
	console.log("restart");
	$('#restart-button').remove();
	$('#end-msg').hide();
	$('.end-result').hide();
	//reset count
	curQuestion = 0;
	correctCount = 0;
	incorrectCount = 0;
	noAnswerCount = 0;
	//show question page
	showQuestionPage(curQuestion);
}


/* description: end game */
function endgame() {
	//hide elements
	$('#answer-key').hide();
	$('#Y_N').hide();
	//display sumary
	showSummary();
}

//wait  sec
/* description: wait n seconds                       */
/* parameter: sec - number of seconds before timeout */
function waitSecond(sec) {
	//not last question
	if (++curQuestion < questionList.length) {
		var endQuestionTimeout = setTimeout(showQuestionPage, sec, curQuestion);
	}
	//last question
	else {
		var endQuestionTimeout = setTimeout(endgame, sec);
	}

}

/* description: answer got clicked         */
/*              check answer, show result  */
function answerClick() {
	console.log($(this));
	//stop the timer
	clearInterval(intervalId);
	clearTimeout(questionTimeout);

	//get user value from input click
	var userVal = parseInt(($(this)[0].id).charAt(6));
	console.log(userVal);
	var correct = false;
	//check answer
	if (userVal === questionList[curQuestion].key) {
		//correct
		correctCount++;
		correct = true;
	}
	else {
		incorrectCount++;
	}
	showResult(correct);
	//wait 3 sec after showing result
	waitSecond(3000);
}

//answer click event
$(document).on("click", ".answer", answerClick);

//click start button
$('#startbtn').click(function() {
	//hide start button 
	$('#startbtn').hide();
	//show question page
	showQuestionPage(curQuestion);
});


/* description: count down           */
/*              display time remain  */
function countDown() {
	//display time
	$('#timer').html('<h3 class="text-center">' + 'Time remain: ' + --timerCounter + '</h3>');
	console.log(timerCounter);
}

/* description: time out at question   */
function endQuestion(id) {
	clearInterval(id);
	$('#timer').html('<h3 class="text-center">' + "time out" + '</h3');
	noAnswerCount++;
	//show result of unanswered
	showResult(false);
	//wait 3 sec
	waitSecond(3000);
}


}); //ready
