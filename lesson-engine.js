/* =========================================================
   LinguaCore Lesson Engine v0.7
   Universal learning engine
   ========================================================= */

const LC_ENGINE_VERSION = '0.7';

const LC_STORAGE = {
  progress: 'linguacoreProgressV1'
};


/* =========================================================
   COURSE CONTENT
   Na razie mały zestaw testowy.
   Później słownictwo przeniesiemy do osobnych plików.
   ========================================================= */

const LC_CONTENT = {

  english: [

    /* ---------- A1 ---------- */

    {id:'en-a1-001',level:'A1',target:'hello',pl:'cześć'},
    {id:'en-a1-002',level:'A1',target:'thank you',pl:'dziękuję'},
    {id:'en-a1-003',level:'A1',target:'goodbye',pl:'do widzenia'},
    {id:'en-a1-004',level:'A1',target:'please',pl:'proszę'},
    {id:'en-a1-005',level:'A1',target:'house',pl:'dom'},
    {id:'en-a1-006',level:'A1',target:'car',pl:'samochód'},
    {id:'en-a1-007',level:'A1',target:'water',pl:'woda'},
    {id:'en-a1-008',level:'A1',target:'food',pl:'jedzenie'},
    {id:'en-a1-009',level:'A1',target:'work',pl:'praca'},
    {id:'en-a1-010',level:'A1',target:'family',pl:'rodzina'},


    /* ---------- A2 ---------- */

    {id:'en-a2-001',level:'A2',target:'usually',pl:'zazwyczaj'},
    {id:'en-a2-002',level:'A2',target:'sometimes',pl:'czasami'},
    {id:'en-a2-003',level:'A2',target:'already',pl:'już'},
    {id:'en-a2-004',level:'A2',target:'still',pl:'nadal'},
    {id:'en-a2-005',level:'A2',target:'enough',pl:'wystarczająco'},
    {id:'en-a2-006',level:'A2',target:'journey',pl:'podróż'},
    {id:'en-a2-007',level:'A2',target:'choose',pl:'wybierać'},
    {id:'en-a2-008',level:'A2',target:'remember',pl:'pamiętać'},
    {id:'en-a2-009',level:'A2',target:'happen',pl:'wydarzyć się'},
    {id:'en-a2-010',level:'A2',target:'probably',pl:'prawdopodobnie'},


    /* ---------- B1 ---------- */

    {
      id:'en-b1-001',
      level:'B1',
      target:'although',
      pl:'chociaż',
      example:'Although I was tired, I finished the job.',
      examplePl:'Chociaż byłem zmęczony, skończyłem pracę.'
    },

    {
      id:'en-b1-002',
      level:'B1',
      target:'instead',
      pl:'zamiast / zamiast tego',
      example:'We stayed at home instead.',
      examplePl:'Zamiast tego zostaliśmy w domu.'
    },

    {
      id:'en-b1-003',
      level:'B1',
      target:'improve',
      pl:'poprawiać / ulepszać',
      example:'I want to improve my English.',
      examplePl:'Chcę poprawić swój angielski.'
    },

    {
      id:'en-b1-004',
      level:'B1',
      target:'avoid',
      pl:'unikać',
      example:'Try to avoid making the same mistake.',
      examplePl:'Spróbuj unikać popełniania tego samego błędu.'
    },

    {
      id:'en-b1-005',
      level:'B1',
      target:'manage',
      pl:'dać radę / zdołać',
      example:'I managed to finish on time.',
      examplePl:'Udało mi się skończyć na czas.'
    },

    {
      id:'en-b1-006',
      level:'B1',
      target:'however',
      pl:'jednak',
      example:'It was difficult. However, we succeeded.',
      examplePl:'To było trudne. Jednak nam się udało.'
    },

    {
      id:'en-b1-007',
      level:'B1',
      target:'probably',
      pl:'prawdopodobnie',
      example:'It will probably rain later.',
      examplePl:'Później prawdopodobnie będzie padać.'
    },

    {
      id:'en-b1-008',
      level:'B1',
      target:'decision',
      pl:'decyzja',
      example:'It was a difficult decision.',
      examplePl:'To była trudna decyzja.'
    },

    {
      id:'en-b1-009',
      level:'B1',
      target:'experience',
      pl:'doświadczenie',
      example:'He has a lot of driving experience.',
      examplePl:'Ma duże doświadczenie w prowadzeniu pojazdów.'
    },

    {
      id:'en-b1-010',
      level:'B1',
      target:'require',
      pl:'wymagać',
      example:'This job requires experience.',
      examplePl:'Ta praca wymaga doświadczenia.'
    },


    /* ---------- B2 ---------- */

    {
      id:'en-b2-001',
      level:'B2',
      target:'nevertheless',
      pl:'niemniej jednak',
      example:'The journey was difficult; nevertheless, we continued.',
      examplePl:'Podróż była trudna; niemniej jednak kontynuowaliśmy.'
    },

    {
      id:'en-b2-002',
      level:'B2',
      target:'significant',
      pl:'znaczący / istotny',
      example:'There has been a significant improvement.',
      examplePl:'Nastąpiła znacząca poprawa.'
    },

    {
      id:'en-b2-003',
      level:'B2',
      target:'assume',
      pl:'zakładać / przypuszczać',
      example:'I assumed the meeting had been cancelled.',
      examplePl:'Założyłem, że spotkanie zostało odwołane.'
    },

    {
      id:'en-b2-004',
      level:'B2',
      target:'maintain',
      pl:'utrzymywać',
      example:'It is important to maintain a safe distance.',
      examplePl:'Ważne jest utrzymywanie bezpiecznej odległości.'
    },

    {
      id:'en-b2-005',
      level:'B2',
      target:'despite',
      pl:'pomimo',
      example:'Despite the traffic, we arrived on time.',
      examplePl:'Pomimo korków dotarliśmy na czas.'
    }

  ],


  spanish: [

    {id:'es-a1-001',level:'A1',target:'hola',pl:'cześć'},
    {id:'es-a1-002',level:'A1',target:'gracias',pl:'dziękuję'},
    {id:'es-a1-003',level:'A1',target:'adiós',pl:'do widzenia'},
    {id:'es-a1-004',level:'A1',target:'casa',pl:'dom'},
    {id:'es-a1-005',level:'A1',target:'agua',pl:'woda'},
    {id:'es-a1-006',level:'A1',target:'trabajo',pl:'praca'},
    {id:'es-a1-007',level:'A1',target:'familia',pl:'rodzina'},
    {id:'es-a1-008',level:'A1',target:'comer',pl:'jeść'},
    {id:'es-a1-009',level:'A1',target:'beber',pl:'pić'},
    {id:'es-a1-010',level:'A1',target:'coche',pl:'samochód'}

  ]

};


/* =========================================================
   LEVELS
   ========================================================= */

const LC_LEVEL_ORDER = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4
};


/* =========================================================
   STORAGE
   ========================================================= */

function lcLoadProgress(){

  try{

    return JSON.parse(
      localStorage.getItem(LC_STORAGE.progress) || '{}'
    );

  }catch(error){

    console.error('LinguaCore progress error:',error);

    return {};

  }

}


function lcSaveProgress(data){

  localStorage.setItem(
    LC_STORAGE.progress,
    JSON.stringify(data)
  );

}


/* =========================================================
   PROFILE / COURSE PROGRESS
   ========================================================= */

function lcCourseProgress(profileId,courseId){

  const data=lcLoadProgress();

  if(!data[profileId]){
    data[profileId]={};
  }

  if(!data[profileId][courseId]){

    data[profileId][courseId]={
      words:{},
      sessions:0,
      correct:0,
      wrong:0
    };

  }

  lcSaveProgress(data);

  return data[profileId][courseId];

}


function lcWordProgress(profileId,courseId,wordId){

  const data=lcLoadProgress();

  if(!data[profileId]){
    data[profileId]={};
  }

  if(!data[profileId][courseId]){

    data[profileId][courseId]={
      words:{},
      sessions:0,
      correct:0,
      wrong:0
    };

  }

  const course=data[profileId][courseId];

  if(!course.words[wordId]){

    course.words[wordId]={
      seen:0,
      correct:0,
      wrong:0,
      streak:0,
      strength:0,
      due:0,
      lastSeen:0
    };

  }

  lcSaveProgress(data);

  return course.words[wordId];

}


/* =========================================================
   CONTENT SELECTION
   ========================================================= */

function lcWordsForLevel(courseId,startLevel){

  const content=LC_CONTENT[courseId] || [];

  const maxLevel=LC_LEVEL_ORDER[startLevel] || 1;

  return content.filter(word=>{

    const level=LC_LEVEL_ORDER[word.level] || 1;

    return level<=maxLevel;

  });

}


/*
   Użytkownik B1 może dostać:
   A1 + A2 + B1

   Użytkownik A1:
   tylko A1.

   Dzięki temu wyższy poziom nadal może powtarzać podstawy.
*/


/* =========================================================
   PRIORITY
   ========================================================= */

function lcPriority(profileId,courseId,word){

  const data=lcLoadProgress();

  const progress=
    data?.[profileId]?.[courseId]?.words?.[word.id];

  if(!progress){
    return 100 + Math.random()*20;
  }

  let score=0;

  if(progress.due && progress.due<=Date.now()){
    score+=120;
  }

  score+=progress.wrong*15;
  score-=progress.correct*2;
  score-=progress.strength*5;

  score+=Math.random()*20;

  return score;

}


/* =========================================================
   BUILD LESSON
   ========================================================= */

function lcBuildLesson(
  profileId,
  courseId,
  startLevel,
  size=5
){

  const pool=lcWordsForLevel(
    courseId,
    startLevel
  );

  const ranked=pool
    .map(word=>({
      word,
      score:lcPriority(
        profileId,
        courseId,
        word
      )
    }))
    .sort((a,b)=>b.score-a.score);

  return ranked
    .slice(0,size)
    .map(x=>x.word);

}


/* =========================================================
   SPACED REPETITION
   ========================================================= */

function lcNextReview(strength){

  const minute=60000;
  const day=86400000;

  switch(strength){

    case 0:
      return Date.now()+2*minute;

    case 1:
      return Date.now()+10*minute;

    case 2:
      return Date.now()+day;

    case 3:
      return Date.now()+4*day;

    case 4:
      return Date.now()+14*day;

    default:
      return Date.now()+30*day;

  }

}


/* =========================================================
   RECORD ANSWER
   ========================================================= */

function lcRecordAnswer(
  profileId,
  courseId,
  wordId,
  correct
){

  const data=lcLoadProgress();

  if(!data[profileId]){
    data[profileId]={};
  }

  if(!data[profileId][courseId]){

    data[profileId][courseId]={
      words:{},
      sessions:0,
      correct:0,
      wrong:0
    };

  }

  const course=data[profileId][courseId];

  if(!course.words[wordId]){

    course.words[wordId]={
      seen:0,
      correct:0,
      wrong:0,
      streak:0,
      strength:0,
      due:0,
      lastSeen:0
    };

  }

  const word=course.words[wordId];

  word.seen++;
  word.lastSeen=Date.now();

  if(correct){

    word.correct++;
    word.streak++;

    word.strength=Math.min(
      5,
      word.strength+1
    );

    word.due=lcNextReview(
      word.strength
    );

    course.correct++;

  }else{

    word.wrong++;
    word.streak=0;

    word.strength=Math.max(
      0,
      word.strength-1
    );

    word.due=
      Date.now()+(2*60000);

    course.wrong++;

  }

  lcSaveProgress(data);

  return word;

}


/* =========================================================
   ANSWER NORMALIZATION
   ========================================================= */

function lcNormalize(text){

  return String(text || '')
    .trim()
    .toLocaleLowerCase()
    .replace(/[.,!?¿¡"'’]/g,'')
    .replace(/\s+/g,' ');

}


function lcStripAccents(text){

  return lcNormalize(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'');

}


function lcCheckAnswer(
  input,
  target,
  strictAccents=false
){

  const a=lcNormalize(input);
  const b=lcNormalize(target);

  if(a===b){

    return {
      correct:true,
      accentWarning:false
    };

  }

  if(
    !strictAccents &&
    lcStripAccents(a)===lcStripAccents(b)
  ){

    return {
      correct:true,
      accentWarning:true
    };

  }

  return {
    correct:false,
    accentWarning:false
  };

}


/* =========================================================
   SPEECH
   ========================================================= */

function lcSpeak(text,courseId){

  if(!('speechSynthesis' in window)){
    return;
  }

  speechSynthesis.cancel();

  const utterance=
    new SpeechSynthesisUtterance(text);

  if(courseId==='english'){

    utterance.lang='en-GB';

  }else if(courseId==='spanish'){

    utterance.lang='es-ES';

  }

  utterance.rate=.82;

  /*
    Staramy się wybrać głos zgodny z językiem,
    zamiast brać pierwszy losowy głos iOS.
  */

  const voices=
    speechSynthesis.getVoices();

  const prefix=
    courseId==='english'
      ? 'en-GB'
      : 'es-ES';

  const matching=voices.filter(v=>
    v.lang &&
    v.lang.toLowerCase()
      .startsWith(prefix.toLowerCase())
  );

  if(matching.length){

    const preferred=
      matching.find(v=>
        /premium|enhanced|siri/i.test(v.name)
      ) || matching[0];

    utterance.voice=preferred;

  }

  speechSynthesis.speak(utterance);

}


/* =========================================================
   EXERCISE SELECTION
   ========================================================= */

function lcExerciseType(wordProgress){

  if(!wordProgress || wordProgress.seen===0){
    return 'recognition';
  }

  if(wordProgress.strength<=1){

    return Math.random()<.7
      ? 'recognition'
      : 'listening';

  }

  if(wordProgress.strength<=3){

    const modes=[
      'recognition',
      'listening',
      'typing'
    ];

    return modes[
      Math.floor(Math.random()*modes.length)
    ];

  }

  const modes=[
    'listening',
    'typing',
    'translation'
  ];

  return modes[
    Math.floor(Math.random()*modes.length)
  ];

}


/* =========================================================
   SUMMARY
   ========================================================= */

function lcGetSummary(
  profileId,
  courseId
){

  const data=lcLoadProgress();

  const course=
    data?.[profileId]?.[courseId];

  if(!course){

    return {
      learned:0,
      learning:0,
      due:0,
      correct:0,
      wrong:0
    };

  }

  let learned=0;
  let learning=0;
  let due=0;

  Object.values(course.words)
    .forEach(word=>{

      if(word.strength>=4){
        learned++;
      }else if(word.seen>0){
        learning++;
      }

      if(
        word.due &&
        word.due<=Date.now()
      ){
        due++;
      }

    });

  return {
    learned,
    learning,
    due,
    correct:course.correct,
    wrong:course.wrong
  };

}


/* =========================================================
   PUBLIC ENGINE
   ========================================================= */

window.LinguaCoreEngine={

  version:LC_ENGINE_VERSION,

  content:LC_CONTENT,

  buildLesson:lcBuildLesson,

  recordAnswer:lcRecordAnswer,

  checkAnswer:lcCheckAnswer,

  speak:lcSpeak,

  getSummary:lcGetSummary,

  exerciseType:lcExerciseType,

  wordsForLevel:lcWordsForLevel

};


console.log(
  'LinguaCore Lesson Engine v'+
  LC_ENGINE_VERSION+
  ' loaded'
);
