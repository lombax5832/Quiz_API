export interface IQuizOptions {
  num_questions?: number
  randomize_questions: boolean
  randomize_answers: boolean
}

export interface IQuizSessionOptions extends IQuizOptions {
  quiz_id: string
}
