/**
 * gradeSubmission: weights based on marks & type
 */
export function gradeSubmission(submission, hw) {
  let totalMarks = 0;
  let scoredMarks = 0;
  const results = hw.questions.map(q => {
    totalMarks += q.marks;
    const resp = (submission.answers?.[q.id] || '').trim().toLowerCase();
    let correct = false;
    if (q.type === 'one-word' || q.type === 'mcq') {
      correct = resp === q.answer.trim().toLowerCase();
    } else if (q.type === 'descriptive') {
      correct = Boolean(resp);
    }
    const earned = correct ? q.marks : 0;
    scoredMarks += earned;
    return { question: q.question, yourAnswer: resp, correctAnswer: q.answer, type: q.type, marks: q.marks, earned, correct };
  });
  const average = Math.round((scoredMarks / totalMarks) * 100);
  return { results, totalMarks, scoredMarks, average };
}