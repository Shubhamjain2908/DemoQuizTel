import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  ansSelected: any
  radioEvent: MatRadioChange;

  Questions: any;
  qb = {
    qid: '',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    answer: '',
    ansSelected: ''
  };
  index: number = 1;

  correctAnswer: string;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getQuestions()
      .subscribe(
        response => {
          this.Questions = response;
          console.log(this.shuffle(this.Questions));
          this.qb['question'] = this.Questions[0].body
        },
        error => {
          console.log(error);
        }
      );
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array.splice(1,10);
  }

  nextQuestion() {
    if (this.index < 10) {
      this.qb['question'] = this.Questions[this.index].body
      this.index++;
      console.log(this.ansSelected);
    } else {
      alert('Last Question!!!');
    }
  }
  previousQuestion() {
    if (this.index > 1) {
      this.qb['question'] = this.Questions[this.index].body
      this.radioEvent.source.checked = false;    
      this.index-- ;
    } else {
      alert('First Question');
    }
  }
  radioChange(e: MatRadioChange) {
    console.log(e.value, e);
    this.radioEvent = e;
  }
}
