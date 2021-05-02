import { Component } from "react";
import quizService from '../QuizService'
import QuestionBox from "./QuestionBox";
import Result from "./Result";

class QuizBee extends Component{
    state = {
        questionBank : [],
        score: 0,
        responces: 0
    }
    
    getQuestions = () =>{
        quizService().then(question => {
            this.setState({
                questionBank: question
            })
        })    
    }
    computeAnswer = (answers, correctAnswer) => {
        if(answers === correctAnswer){
            this.setState({
                score: this.state.score + 1
            })
        }
        
        this.setState({
            responces: this.state.responces < 5 ? this.state.responces + 1 : 5
        })
    }
    playAgain= () =>{
        this.getQuestions();
        this.setState({
            score: 0,
            responces: 0
        })
    }
    componentDidMount(){
        this.getQuestions();
    }
    render(){
        return(
            <div className="container">
                <div className="title">QuizBee</div>
                { this.state.questionBank.length > 0 && this.state.responces < 5 &&
                this.state.questionBank.map(({question, answers, correct, questionId}) => (
                    <QuestionBox question={question}
                                options={answers}
                                key={questionId}
                                selected={(answer) => this.computeAnswer(answer, correct)}/>
                
                ))}
                {this.state.responces === 5 ? (
                    <Result
                    score ={this.state.score}
                    playAgain = {this.playAgain}
                    />
                ) : null}

            </div>
        )
    }
}

export default QuizBee;