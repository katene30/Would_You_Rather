import request from "superagent";

export const SHOW_ERROR = "SHOW_ERROR";
export const RECEIVE_QUESTION = "RECEIVE_QUESTION";
export const REQUEST_QUESTION = "REQUEST_QUESTION";

export const requestQuestion = () => {
  return {
    type: REQUEST_QUESTION,
    loading: true
  };
};

export const receiveQuestion = question => {
  return {
    type: RECEIVE_QUESTION,
    question: question,
    loading: false
  };
};

export const showError = errorMessage => {
  return {
    type: SHOW_ERROR,
    errorMessage: errorMessage,
    loading: false
  };
};

export function fetchQuestion() {
  console.log("action");
  return dispatch => {
    dispatch(requestQuestion());

    return request
      .get(`/api/v1/question`)
      .then(res => {
        console.log(res)
        dispatch(receiveQuestion(res.body));
      })
      .catch(err => {
        dispatch(showError(err.message));
      });
  };
}
