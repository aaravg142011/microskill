// ===== Login System =====
let username = "";
document.getElementById('loginBtn').addEventListener('click', ()=>{
  const name = document.getElementById('usernameInput').value.trim();
  if(!name){ alert("Enter a username!"); return; }
  username = name;
  document.getElementById('loginDiv').style.display = 'none';
  document.getElementById('answer').disabled = false;
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('newBtn').disabled = false;
  loadUserData();
  showNewChallenge();
});

// ===== XP & Level =====
let xp=0, level=1, streak=0;
const xpFill = document.getElementById('xp-fill');
const levelEl = document.getElementById('level');

function awardXP(amount){
  xp += amount;
  streak++;
  let xpNeeded = level*100;
  if(xp>=xpNeeded){
    xp-=xpNeeded;
    level++;
    alert(`🎉 Level Up! You are now Level ${level}`);
  }
  xpFill.style.width=(xp/(level*100)*100)+"%";
  levelEl.textContent=`Level ${level} | XP: ${xp}/${level*100} | Streak: ${streak}`;
  saveUserData();
}

function saveUserData(){
  localStorage.setItem(username, JSON.stringify({xp, level, streak, pastChallenges:[...pastChallenges]}));
}

function loadUserData(){
  const data = JSON.parse(localStorage.getItem(username));
  if(data){
    xp=data.xp; level=data.level; streak=data.streak;
    pastChallenges = new Set(data.pastChallenges);
    xpFill.style.width=(xp/(level*100)*100)+"%";
    levelEl.textContent=`Level ${level} | XP: ${xp}/${level*100} | Streak: ${streak}`;
  }
}

// ===== Challenges =====
const challenges = [
  {text:"List 3 creative uses for a paperclip.", skill:"Creativity"},
  {text:"Invent a 3-step game using only a pen and paper.", skill:"Problem-Solving"},
  {text:"Design a 5-minute workout routine for someone at home.", skill:"Planning"},
  {text:"Think of 3 ways to reduce screen time creatively.", skill:"Self-Management"},
  {text:"Come up with a short story with 3 sentences about a lost cat.", skill:"Writing"},
  {text:"List 3 unusual ways to fold a T-shirt quickly.", skill:"Problem-Solving"},
  {text:"Brainstorm 3 ideas for decorating your room with recycled materials.", skill:"Creativity"},
  {text:"Create 3 fun icebreaker questions for a new club.", skill:"Communication"},
  {text:"Make a tiny invention using only coins and rubber bands.", skill:"Creativity"},
  {text:"Think of 3 ways to memorize something faster.", skill:"Memory"},
  {text:"List 3 ways to use a spoon differently than intended.", skill:"Creativity"},
  {text:"Write a 3-line motivational quote for yourself.", skill:"Writing"},
  {text:"Invent 3 rules for a mini obstacle course at home.", skill:"Planning"},
  {text:"Think of 3 unusual ways to carry groceries.", skill:"Problem-Solving"},
  {text:"Create 3 different paper airplanes and name them.", skill:"Creativity"},
  {text:"List 3 fun ways to greet someone without words.", skill:"Communication"},
  {text:"Come up with 3 new uses for a rubber band.", skill:"Creativity"},
  {text:"Design a mini 5-minute meditation routine.", skill:"Mindfulness"},
  {text:"Think of 3 ways to make brushing teeth more fun.", skill:"Problem-Solving"},
  {text:"Write 3 alternative titles for your favorite book.", skill:"Writing"},
  {text:"List 3 small acts of kindness you can do today.", skill:"Empathy"},
  {text:"Create a mini scavenger hunt in your room with 3 clues.", skill:"Planning"},
  {text:"Think of 3 creative ways to drink water.", skill:"Creativity"},
  {text:"List 3 imaginative superhero powers you’d like.", skill:"Creativity"},
  {text:"Come up with 3 short riddles for friends.", skill:"Problem-Solving"},
  {text:"Design a tiny board game with 3 rules.", skill:"Planning"},
  {text:"Think of 3 ways to improve your morning routine.", skill:"Self-Management"},
  {text:"Write 3 fun compliments you can give to a stranger.", skill:"Communication"},
  {text:"List 3 new ways to use sticky notes.", skill:"Creativity"},
  {text:"Create 3 mini challenges for yourself today.", skill:"Self-Management"},
  {text:"Invent 3 new ice cream flavors.", skill:"Creativity"},
  {text:"Think of 3 ways to make walking more fun.", skill:"Problem-Solving"},
  {text:"Write 3 haiku poems about nature.", skill:"Writing"},
  {text:"List 3 unusual hobbies to try.", skill:"Creativity"},
  {text:"Create 3 quick stretches for a break.", skill:"Mindfulness"},
  {text:"Think of 3 ways to make studying more engaging.", skill:"Self-Management"},
  {text:"Design 3 mini challenges for your friends.", skill:"Communication"},
  {text:"List 3 fun ways to organize your desk.", skill:"Planning"},
  {text:"Come up with 3 creative nicknames for a pet.", skill:"Creativity"},
  {text:"Write 3 sentences describing your dream invention.", skill:"Writing"},
  {text:"Think of 3 ways to make chores enjoyable.", skill:"Problem-Solving"},
  {text:"Create 3 new uses for a shoelace.", skill:"Creativity"},
  {text:"List 3 ways to turn a song into a dance routine.", skill:"Creativity"},
  {text:"Design 3 mini challenges for a 5-minute break.", skill:"Planning"},
  {text:"Write 3 jokes for your friends.", skill:"Communication"},
  {text:"Think of 3 ways to repurpose an old T-shirt.", skill:"Creativity"},
  {text:"List 3 ways to make a simple object look artistic.", skill:"Creativity"},
  {text:"Create 3 challenges for improving memory.", skill:"Self-Management"},
  {text:"Invent 3 fun ways to use a cardboard box.", skill:"Creativity"},
  {text:"Write 3 sentences to inspire a friend.", skill:"Communication"},
  {text:"Think of 3 ways to make breakfast more interesting.", skill:"Problem-Solving"},
  {text:"List 3 activities you can do without technology.", skill:"Mindfulness"},
  {text:"Create 3 quick exercises for focus.", skill:"Mindfulness"},
  {text:"Design 3 creative bookmarks for books.", skill:"Creativity"},
  {text:"Think of 3 ways to decorate your notebook.", skill:"Creativity"},
  {text:"Write 3 funny captions for a photo.", skill:"Writing"},
  {text:"List 3 challenges to improve your drawing skills.", skill:"Creativity"},
  {text:"Invent 3 mini games using only paper.", skill:"Planning"},
  {text:"Think of 3 ways to use a cup differently.", skill:"Problem-Solving"},
  {text:"Create 3 quick riddles for friends.", skill:"Problem-Solving"},
  {text:"List 3 ways to relax in 5 minutes.", skill:"Mindfulness"},
  {text:"Write 3 sentences describing your dream room.", skill:"Writing"},
  {text:"Think of 3 fun ways to learn new words.", skill:"Self-Management"},
  {text:"Design 3 mini experiments with water.", skill:"Problem-Solving"},
  {text:"Create 3 creative origami designs.", skill:"Creativity"},
  {text:"List 3 ways to use a notebook creatively.", skill:"Creativity"},
  {text:"Invent 3 fun challenges for family members.", skill:"Communication"},
  {text:"Think of 3 ways to make recycling fun.", skill:"Problem-Solving"},
  {text:"Write 3 motivational phrases for yourself.", skill:"Writing"},
  {text:"List 3 creative ways to exercise indoors.", skill:"Mindfulness"},
  {text:"Create 3 quick mental math challenges.", skill:"Self-Management"},
  {text:"Design 3 imaginative characters for a story.", skill:"Creativity"},
  {text:"Think of 3 ways to make waiting less boring.", skill:"Problem-Solving"},
  {text:"Invent 3 unique bookmarks.", skill:"Creativity"},
  {text:"Write 3 sentences describing your dream vacation.", skill:"Writing"},
  {text:"List 3 mini challenges to boost energy.", skill:"Self-Management"},
  {text:"Create 3 fun ways to organize school supplies.", skill:"Planning"},
  {text:"Think of 3 ways to use a balloon creatively.", skill:"Creativity"},
  {text:"Design 3 quick breathing exercises.", skill:"Mindfulness"},
  {text:"Write 3 funny tweets for a fictional account.", skill:"Writing"},
  {text:"List 3 ways to make drawing more fun.", skill:"Creativity"},
  {text:"Invent 3 challenges for improving focus.", skill:"Self-Management"},
  {text:"Think of 3 ways to make your bed creatively.", skill:"Creativity"},
  {text:"Create 3 mini story prompts.", skill:"Writing"},
  {text:"List 3 ways to use a plastic bottle differently.", skill:"Creativity"},
  {text:"Design 3 creative games using sticky notes.", skill:"Planning"},
  {text:"Write 3 lines to describe a fantasy world.", skill:"Writing"},
  {text:"Think of 3 ways to make a puzzle more fun.", skill:"Problem-Solving"},
  {text:"Create 3 unique doodle designs.", skill:"Creativity"},
  {text:"List 3 challenges for improving concentration.", skill:"Self-Management"},
  {text:"Invent 3 fun ways to use a hat.", skill:"Creativity"},
  {text:"Write 3 sentences for a motivational poster.", skill:"Writing"},
  {text:"Think of 3 ways to make a small space look bigger.", skill:"Problem-Solving"},
  {text:"Create 3 mini challenges for creative thinking.", skill:"Creativity"},
  {text:"List 3 ways to recycle old paper creatively.", skill:"Creativity"},
  {text:"Design 3 5-minute mindfulness exercises.", skill:"Mindfulness"},
  {text:"Write 3 imaginative headlines for a newspaper.", skill:"Writing"},
  {text:"Think of 3 ways to make a sandwich fun.", skill:"Problem-Solving"},
  {text:"Create 3 unique decorations using leaves.", skill:"Creativity"},
  {text:"List 3 fun ways to motivate a friend.", skill:"Communication"},
  {text:"Invent 3 quick team challenges.", skill:"Planning"},
  {text:"Write 3 sentences describing your favorite invention.", skill:"Writing"},
  {text:"Think of 3 ways to make cleaning more fun.", skill:"Problem-Solving"},
  {text:"Create 3 mini riddles for children.", skill:"Problem-Solving"},
  {text:"List 3 creative ways to improve posture.", skill:"Mindfulness"},
  {text:"Design 3 unique paper bookmarks.", skill:"Creativity"},
  {text:"Write 3 short stories in 3 sentences each.", skill:"Writing"},
  {text:"Think of 3 ways to make homework fun.", skill:"Self-Management"},
  {text:"Create 3 imaginative pen-and-paper games.", skill:"Planning"},
  {text:"List 3 ways to make music using household items.", skill:"Creativity"},
  {text:"Invent 3 fun ways to exercise outdoors.", skill:"Mindfulness"},
  {text:"Write 3 sentences describing your ideal pet.", skill:"Writing"},
  {text:"Think of 3 ways to make drawing easier.", skill:"Problem-Solving"},
  {text:"Create 3 unique doodle patterns.", skill:"Creativity"},
  {text:"List 3 mini challenges to boost happiness.", skill:"Self-Management"},
  {text:"Invent 3 fun ways to use a scarf.", skill:"Creativity"},
  {text:"Write 3 motivational notes for friends.", skill:"Communication"},
  {text:"Think of 3 ways to use string creatively.", skill:"Creativity"},
  {text:"Create 3 5-minute focus exercises.", skill:"Mindfulness"},
  {text:"List 3 ways to improve listening skills.", skill:"Communication"},
  {text:"Invent 3 ways to make recycling fun.", skill:"Problem-Solving"},
  {text:"Write 3 sentences for a thank-you note.", skill:"Writing"},
  {text:"Think of 3 ways to use a notebook creatively.", skill:"Creativity"},
  {text:"Create 3 mini challenges for quick thinking.", skill:"Problem-Solving"},
  {text:"List 3 ways to make a small space cozier.", skill:"Problem-Solving"},
  {text:"Invent 3 creative uses for a cup.", skill:"Creativity"},
  {text:"Write 3 sentences describing a futuristic city.", skill:"Writing"},
  {text:"Think of 3 ways to make learning a new language fun.", skill:"Self-Management"},
  {text:"Create 3 unique ways to organize your bag.", skill:"Planning"},
  {text:"List 3 mini challenges to improve math skills.", skill:"Self-Management"},
  {text:"Invent 3 fun ways to use a rubber duck.", skill:"Creativity"},
  {text:"Write 3 sentences describing a dream invention.", skill:"Writing"},
  {text:"Think of 3 ways to make meditation interesting.", skill:"Mindfulness"},
  {text:"Create 3 mini challenges for problem-solving.", skill:"Problem-Solving"},
  {text:"List 3 creative ways to use a pen.", skill:"Creativity"},
  {text:"Invent 3 fun challenges for a friend.", skill:"Communication"},
  {text:"Write 3 sentences for a motivational poster.", skill:"Writing"},
  {text:"Think of 3 ways to make a daily task fun.", skill:"Self-Management"},
  {text:"Create 3 mini origami projects.", skill:"Creativity"},
  {text:"List 3 ways to make reading more exciting.", skill:"Self-Management"},
  {text:"Invent 3 unique uses for a paper cup.", skill:"Creativity"},
  {text:"Write 3 fun captions for a picture.", skill:"Writing"},
  {text:"Think of 3 ways to make teamwork enjoyable.", skill:"Communication"},
  {text:"Create 3 mini challenges to improve focus.", skill:"Self-Management"},
  {text:"List 3 creative ways to use old magazines.", skill:"Creativity"},
  {text:"Invent 3 ways to exercise at home creatively.", skill:"Mindfulness"},
  {text:"Write 3 short stories in 3 sentences.", skill:"Writing"},
  {text:"Think of 3 ways to make study breaks fun.", skill:"Self-Management"},
  {text:"Create 3 fun brain teasers.", skill:"Problem-Solving"},
  {text:"List 3 creative ways to organize your desk.", skill:"Planning"},
  {text:"Invent 3 fun ways to use sticky tape.", skill:"Creativity"},
  {text:"Write 3 imaginative sentences about a flying car.", skill:"Writing"},
  {text:"Think of 3 ways to improve memory.", skill:"Self-Management"},
  {text:"Create 3 unique challenges for friends.", skill:"Communication"},
  {text:"List 3 ways to make chores fun.", skill:"Problem-Solving"},
  {text:"Invent 3 creative ways to fold a napkin.", skill:"Creativity"},
  {text:"Write 3 sentences for a motivational note.", skill:"Writing"},
  {text:"Think of 3 ways to make art using household items.", skill:"Creativity"},
  {text:"Create 3 mini challenges to improve creativity.", skill:"Creativity"},
  {text:"List 3 ways to make walking fun.", skill:"Mindfulness"},
  {text:"Invent 3 imaginative uses for a box.", skill:"Creativity"},
  {text:"Write 3 funny captions for social media.", skill:"Writing"},
  {text:"Think of 3 ways to make cleaning enjoyable.", skill:"Problem-Solving"},
  {text:"Create 3 unique doodle challenges.", skill:"Creativity"},
  {text:"List 3 ways to improve focus in 5 minutes.", skill:"Self-Management"},
  {text:"Invent 3 mini challenges to make friends laugh.", skill:"Communication"},
  {text:"Write 3 sentences describing your dream invention.", skill:"Writing"},
  {text:"Think of 3 ways to turn a song into a game.", skill:"Creativity"},
  {text:"Create 3 quick mental exercises.", skill:"Self-Management"},
  {text:"List 3 ways to make homework fun.", skill:"Self-Management"},
  {text:"Invent 3 fun ways to use a ruler.", skill:"Creativity"},
  {text:"Write 3 sentences describing a magical creature.", skill:"Writing"},
  {text:"Think of 3 ways to improve listening skills.", skill:"Communication"},
  {text:"Create 3 mini challenges to enhance problem-solving.", skill:"Problem-Solving"},
  {text:"List 3 creative uses for old CDs.", skill:"Creativity"},
  {text:"Invent 3 fun ways to exercise outside.", skill:"Mindfulness"},
  {text:"Write 3 short stories in 3 lines.", skill:"Writing"},
  {text:"Think of 3 ways to make studying interactive.", skill:"Self-Management"},
  {text:"Create 3 mini riddles for friends.", skill:"Problem-Solving"},
  {text:"List 3 creative ways to decorate a notebook.", skill:"Creativity"},
  {text:"Invent 3 ways to make daily tasks exciting.", skill:"Self-Management"},
  {text:"Write 3 motivational sentences for yourself.", skill:"Writing"},
  {text:"Think of 3 ways to use rubber bands creatively.", skill:"Creativity"},
  {text:"Create 3 mini challenges for fun at home.", skill:"Planning"},
  {text:"List 3 ways to boost creativity in 5 minutes.", skill:"Creativity"},
  {text:"Invent 3 fun ways to exercise your brain.", skill:"Mindfulness"},
  {text:"Write 3 sentences describing a fantasy landscape.", skill:"Writing"},
  {text:"Think of 3 ways to make small chores fun.", skill:"Problem-Solving"},
  {text:"Create 3 mini challenges to inspire friends.", skill:"Communication"},
  {text:"List 3 ways to make a daily routine more exciting.", skill:"Self-Management"}
];


let pastChallenges = new Set();

// ===== UI Functions =====
const challengeEl = document.getElementById('challenge');
const skillEl = document.getElementById('skill');
const answerEl = document.getElementById('answer');
const feedbackEl = document.getElementById('feedback');
const submitBtn = document.getElementById('submitBtn');
const newBtn = document.getElementById('newBtn');

function getRandomChallenge(){
  if(pastChallenges.size===challenges.length) pastChallenges.clear();
  let ch;
  do{ ch=challenges[Math.floor(Math.random()*challenges.length)]; } while(pastChallenges.has(ch.text));
  pastChallenges.add(ch.text);
  return ch;
}

function showNewChallenge(){
  const {text, skill} = getRandomChallenge();
  challengeEl.textContent = text;
  skillEl.textContent = "Skill: "+skill;
  answerEl.value="";
  feedbackEl.textContent="";
}

// ===== Feedback generator (offline AI-like) =====
function generateFeedback(answer){
  const positive=["Great job!","Awesome work!","Nice attempt!","Well done!"];
  const tips=["Try adding more details.","Be more creative.","Think outside the box.","Give specific examples."];
  const pos = positive[Math.floor(Math.random()*positive.length)];
  const tip = tips[Math.floor(Math.random()*tips.length)];
  return `${pos} Tip: ${tip}`;
}

submitBtn.addEventListener('click', ()=>{
  if(!answerEl.value.trim()){ feedbackEl.textContent="⚠️ Please enter your answer!"; return; }
  feedbackEl.textContent = generateFeedback(answerEl.value.trim());
  awardXP(20);
});

newBtn.addEventListener('click', showNewChallenge);
