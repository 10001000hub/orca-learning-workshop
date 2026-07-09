// lesson → quiz → workshop → done の進行状態を管理する。
// 教材本文そのものは持たず、content-loaderが返したデータを参照するだけ。
const GameEngine = (() => {
  function createSession(content) {
    return {
      content,
      stage: "lesson", // "lesson" | "quiz" | "workshop" | "done"
      quizIndex: 0,
      quizResults: [], // { questionId, chosen, correct }
      workshopStepIndex: 0,
      workshopChecks: [], // 確認済みstepId
    };
  }

  function startQuiz(session) {
    session.stage = "quiz";
    return session;
  }

  function currentQuizQuestion(session) {
    return session.content.quiz.questions[session.quizIndex];
  }

  // 選んだ選択肢がその設問で初めての回答でなければ上書きしない(1問1回のみ採点)
  function answerQuiz(session, choiceId) {
    const question = currentQuizQuestion(session);
    const alreadyAnswered = session.quizResults.some((r) => r.questionId === question.id);
    if (alreadyAnswered) {
      return session.quizResults.find((r) => r.questionId === question.id);
    }
    const result = {
      questionId: question.id,
      chosen: choiceId,
      correct: choiceId === question.answer,
    };
    session.quizResults.push(result);
    return result;
  }

  function nextQuiz(session) {
    session.quizIndex += 1;
    if (session.quizIndex >= session.content.quiz.questions.length) {
      session.stage = "workshop";
    }
    return session;
  }

  function currentWorkshopStep(session) {
    return session.content.workshop.steps[session.workshopStepIndex];
  }

  function confirmWorkshopStep(session) {
    const step = currentWorkshopStep(session);
    if (!session.workshopChecks.includes(step.id)) {
      session.workshopChecks.push(step.id);
    }
    session.workshopStepIndex += 1;
    if (session.workshopStepIndex >= session.content.workshop.steps.length) {
      session.stage = "done";
    }
    return session;
  }

  function quizScore(session) {
    const correct = session.quizResults.filter((r) => r.correct).length;
    return { correct, total: session.content.quiz.questions.length };
  }

  return {
    createSession,
    startQuiz,
    currentQuizQuestion,
    answerQuiz,
    nextQuiz,
    currentWorkshopStep,
    confirmWorkshopStep,
    quizScore,
  };
})();
