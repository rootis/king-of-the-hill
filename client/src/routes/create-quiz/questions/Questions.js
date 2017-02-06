import React, {Component} from "react";
import Question from "../question/Question";
import QuestionEntity from "../../../model/entities/QuestionEntity";
import QuestionTypeEnum from "../../../model/common/QuestionTypeEnum";
import AddIcon from "./add.png";
import "./Questions.css";

export default class Questions extends Component {

    constructor(props) {
        super(props);
        this.lastId = 0;
    }

    addQuestion = () => {
        let question = this.getNewQuestion();
        this.props.value[question._id] = question;
        this.props.onChange(this.createUpdateEvent());
    };

    removeQuestion = (questionId) => {
        delete this.props.value[questionId];
        this.props.onChange(this.createUpdateEvent());
    };

    handleChange = (event) => {
        this.props.onChange(this.updateEvent(event));
    };

    updateEvent(event) {
        if (event.target.name.indexOf(this.props.name) === -1) {
            event.target.name = this.props.name + '.' + event.target.name;
        }
        return event;
    }

    getNewQuestion() {
        this.lastId++;
        let result = new QuestionEntity();
        result._id = this.lastId.toString();
        result.text = 'Question with id: ' + result._id;
        result.type = QuestionTypeEnum.CHECKBOX;
        return result;
    };

    createUpdateEvent() {
        return {
            target: {
                name: this.props.name,
                value: this.props.value
            }
        };
    }

    render() {
        return (
            <div>
                <div className={'Questions-title-box'}>
                    <div className={'Questions-title-left-box'}>
                        <span>{this.props.error ? this.props.error : 'QUESTIONS'}</span>
                    </div>
                    <div className={'Questions-title-right-box'}>
                        <img onClick={this.addQuestion} src={AddIcon} alt="Add Question"/>
                    </div>
                </div>

                {Object.keys(this.props.value).map((key) =>
                    <Question key={key} name={key} onChange={this.handleChange} removeQuestion={this.removeQuestion} value={this.props.value[key]}/>
                )}
            </div>
        );
    }

}
