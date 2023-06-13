import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import axios from 'axios';

function AdminPage() {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [editedQuestion, setEditedQuestion] = useState({
    qnId: 0,
    qnInWords: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: 0,
  });

  useEffect(() => {
    // Fetch questions and users on component mount
    fetchQuestions();
    fetchUsers();
  }, []);

  const fetchQuestions = () => {
    const token=localStorage.getItem("token");
    axios
      .get('http://localhost:5180/api/question',{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = () => {
    const token=localStorage.getItem("token");
    axios
      .get('http://localhost:5180/api/user',
      {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteQuestion = (id) => {
    const token=localStorage.getItem("token");
    axios
      .delete(`http://localhost:5180/api/question/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Remove the deleted question from the state
        const updatedQuestions = questions.filter((question) => question.qnId !== id);
        setQuestions(updatedQuestions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQuestion = () => {
    const token=localStorage.getItem("token");
    axios
      .put(`http://localhost:5180/api/question/${editedQuestion.qnId}`, editedQuestion,
      {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Update the question in the state
        const updatedQuestions = questions.map((question) =>
          question.qnId === editedQuestion.qnId ? editedQuestion : question
        );
        setQuestions(updatedQuestions);
        setEditedQuestion({
          qnId: 0,
          qnInWords: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addQuestion = () => {
    const token=localStorage.getItem("token");
    axios
      .post('http://localhost:5180/api/question', editedQuestion,
      {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Reset the new question input fields
        setEditedQuestion({
          qnId: 0,
          qnInWords: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: 0,
        });
        // Fetch the updated list of questions
        fetchQuestions();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuestionEdit = (question) => {
    setEditedQuestion(question);
  };

  const deleteUser = (id) => {
    const token=localStorage.getItem("token");
    axios
      .delete(`http://localhost:5180/api/user/${id}`,
      {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Remove the deleted user from the state
        const updatedUsers = users.filter((user) => user.userId !== id);
        setUsers(updatedUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Admin Page</h2>

      <h3>Questions:</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.qnId}>
                <TableCell>{question.qnId}</TableCell>
                <TableCell>{question.qnInWords}</TableCell>
                <TableCell>
                  <ul>
                    <li>{question.option1}</li>
                    <li>{question.option2}</li>
                    <li>{question.option3}</li>
                    <li>{question.option4}</li>
                  </ul>
                </TableCell>
                <TableCell>{question.answer}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleQuestionEdit(question)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteQuestion(question.qnId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>{editedQuestion.qnId ? 'Update' : 'Add New'} Question:</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  label="Question"
                  variant="outlined"
                  value={editedQuestion.qnInWords}
                  onChange={(e) =>
                    setEditedQuestion({ ...editedQuestion, qnInWords: e.target.value })
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Option 1"
                  variant="outlined"
                  value={editedQuestion.option1}
                  onChange={(e) =>
                    setEditedQuestion({ ...editedQuestion, option1: e.target.value })
                  }
                />
                <TextField
                  label="Option 2"
                  variant="outlined"
                  value={editedQuestion.option2}
                  onChange={(e) =>
                    setEditedQuestion({ ...editedQuestion, option2: e.target.value })
                  }
                />
                <TextField
                  label="Option 3"
                  variant="outlined"
                  value={editedQuestion.option3}
                  onChange={(e) =>
                    setEditedQuestion({ ...editedQuestion, option3: e.target.value })
                  }
                />
                <TextField
                  label="Option 4"
                  variant="outlined"
                  value={editedQuestion.option4}
                  onChange={(e) =>
                    setEditedQuestion({ ...editedQuestion, option4: e.target.value })
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Answer"
                  variant="outlined"
                  type="number"
                  value={editedQuestion.answer}
                  onChange={(e) =>
                    setEditedQuestion({ ...editedQuestion, answer: e.target.value })
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={editedQuestion.qnId ? 'primary' : 'success'}
                  onClick={editedQuestion.qnId ? updateQuestion : addQuestion}
                >
                  {editedQuestion.qnId ? 'Update' : 'Add'}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Registered Users:</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteUser(user.userId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminPage;