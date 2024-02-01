import React from 'react'
import Background from '../components/Background'
import QuestionElement from '../components/QuestionElement'

const Quiz = () => {
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple');
      const data = await response.json();
      setQuestions(data.results);
    };
    if (questions.length === 0) {
      fetchData();
    }
  }, []);


  const QuestionElements = questions.map(question => (<QuestionElement />))


  return (
    <Background>
      {QuestionElements}
    </Background>
  );
};



export default Quiz