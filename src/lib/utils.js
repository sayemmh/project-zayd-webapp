import { shuffle, sample, sampleSize } from 'lodash/collection'

export const createQuestionsList = (qlist) => {
    let output = []
    for (let i = 0; i < qlist.length; i++) {
        output.push(qlist[i].question)
    }
    return output
};

export const sleep = (duration) => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration)
})
  
export const createSelection = (qList, choiceCount) => {
    const currentAnswers = shuffle(sampleSize(qList, choiceCount))
    return { 
        currentAnswers, 
    }
}

export const createAnswerChoicesSelection = (qList, choiceCount) => {
    const currentAnswers = shuffle(sampleSize(qList, choiceCount))
    return {
        currentAnswers,
    }
}

export const createNextQuestionFR = (questions_to_ask) => {
  let subset = sampleSize(questions_to_ask, 4);
  let answers = subset.map((a) => a.answer);
  let cur = sample(subset);

  return {
    currentAnswers: answers,
    qObj: cur
  };
};