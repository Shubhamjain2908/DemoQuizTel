import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {

    constructor(private http: HttpClient) {}

    QuestionBank = [];

    getQuestions() {
        return this.http.get('https://jsonplaceholder.typicode.com/comments');
    }
}