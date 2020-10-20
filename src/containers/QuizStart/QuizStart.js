import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from "./QuizStart.module.css";

class QuizStart extends React.Component {
    state = {
        currentCategory: "9",
        numberOfQuestions: 10,
        difficulty: 'Medium',
        categories: []
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories = () => {
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.json())
            .then(res => this.setCategories(res["trivia_categories"]))
            .catch(console.log("Error categories"))
    }

    setCategories(categoriesToSet) {
        this.setState({
            categories: categoriesToSet
        })
    }

    submitHandler(event) {
        event.preventDefault();
        this.props.history.push({
            pathname: '/quiz',
            search: `?questions=${this.state.numberOfQuestions}&category=${this.state.currentCategory}&difficulty=${this.state.difficulty}`
        })
    }


    handleInputChange(event) {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCategoryChange(event) {
        const cat = this.state.categories.find(cat => cat.name == event.target.value);

        if (cat != undefined) {
            console.log(cat.id)
            this.setState({
                currentCategory: cat.id
            });
        }
    }

    categoriesOptions() {
        return (
            <React.Fragment>
                <input name='currentCategory' type="text" list="categories" placeholder="Choose one" onChange={this.handleCategoryChange.bind(this)} />
                <datalist id='categories'>
                    {this.state.categories.map((category) => {
                        return <option key={category.id}>{category.name}</option>
                    })}
                </datalist>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <h1 className={classes.Title}>Let's quiz!</h1>
                <form className={classes.QuizForm} onSubmit={this.submitHandler.bind(this)}>
                    <label>Number of questions: </label>
                    <input name='numberOfQuestions' type='number' defaultValue='10' min='5' max='50' onChange={this.handleInputChange.bind(this)}></input>
                    <label>Select a category: </label>
                    {this.categoriesOptions()}
                    <label>Select difficulty: </label>
                    <input placeholder="medium" list='difficulty' type="text" list="difficulty" onChange={this.handleInputChange.bind(this)} />
                    <datalist id="difficulty">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </datalist>
                    <input className={classes.Option} type="submit" value="Let's play!"></input>
                    <input className={classes.Option} type="reset" value="Reset"></input>
                </form>
            </React.Fragment>
        )
    }
}

export default QuizStart
