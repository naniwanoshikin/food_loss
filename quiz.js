'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p'); // 結果

  // (0番目を正解とする)
  const quizSet = shuffle([
    { q: 'What is A?', c: ['A0', 'A1', 'A2'] },
    { q: 'What is B?', c: ['B0', 'B1', 'B2'] },
    { q: 'What is C?', c: ['C0', 'C1', 'C2'] },
  ]);

  let currentNum = 0; // 今何問目？
  let isAnswered; // 回答したか？(true/false)
  let score = 0; // 正解数

  // 配列を渡して、シャッフルした配列を返す。
  // （フィッシャー・イェーツのシャッフル）
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 0 - i
      [arr[j], arr[i]] = [arr[i], arr[j]]; // 入れ替え
    }
    return arr;
  }


  // 正誤判定（1問につき1度きり）
  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }
    btn.classList.remove('disabled');
  }

  // 初期状態の画面をセット
  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    // 回答済の選択肢を消す
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    // 選択肢（シャッフル済）
    const shuffledChoices = shuffle([...quizSet[currentNum].c]); // 配列やオブジェクトを引数にすると参照が関数に渡されるので、引数にした大元の配列も書き換えられないようスプレッド演算子をつける。
    // console.log(quizSet[currentNum].c); // 元の配列
    // console.log(...quizSet[currentNum].c); // 要素
    // console.log([...quizSet[currentNum].c]); // 新しい配列

    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      // （設定の最後にかくといい）
      choices.appendChild(li); // 選択肢を詰め替え
    });

    if (currentNum === quizSet.length - 1) { // 最終問題
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();


  // 次へ
  btn.addEventListener('click', () => {
    if (isAnswered) { // 回答済みならば
      btn.classList.add('disabled');
      if (currentNum === quizSet.length - 1) { // 最終問題ならば
        // console.log(`Score: ${score} / ${quizSet.length}`);
        scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
        result.classList.remove('hidden');
        return;
      }
      currentNum++;
      setQuiz();
    }
  });

}
