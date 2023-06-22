import { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((fetchedQuestions) => setQuestions(fetchedQuestions));
  }, setQuestions);

  function handleDelete(id) {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  }

  function handleUpdatedQuestions(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onUpdatedQuestion={handleUpdatedQuestions} />
      ) : (
        <QuestionList questions={questions} deletedQuestion={handleDelete} />
      )}
    </main>
  );
}

export default App;
