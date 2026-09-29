/* LinguaCore v0.11.0 — adaptive multi-exercise lesson engine */
const LinguaCoreEngine=(()=>{
 const MODES=['recognition','reverse','listening','typing'];
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const wordsForLevel=(course,level)=>(COURSE_DATA[course]||[]).filter(w=>w.level===level);
 function state(profileId,courseId){
   const profiles=loadProfiles(),p=profiles[profileId]; if(!p)return null;
   const c=getCourse(p,courseId); c.skills ||= {}; c.recent ||= []; return {profiles,p,c};
 }
 function skillFor(skills,id){return skills[id]||{correct:0,wrong:0,last:0,modes:{}}}
 function modeStats(x,m){x.modes ||= {}; return x.modes[m]||{correct:0,wrong:0,last:0}}
 function chooseMode(x){
   const r=modeStats(x,'recognition'),v=modeStats(x,'reverse'),l=modeStats(x,'listening'),t=modeStats(x,'typing');
   if(r.correct<1 || r.wrong>r.correct) return 'recognition';
   if(v.correct<1 || v.wrong>v.correct) return Math.random()<.72?'reverse':'recognition';
   if(l.correct<1 || l.wrong>l.correct) return Math.random()<.72?'listening':'reverse';
   if(t.correct<1 || t.wrong>t.correct) return Math.random()<.72?'typing':shuffle(['reverse','listening'])[0];
   return shuffle(MODES)[0];
 }
 function buildLesson(profileId,courseId,level,count=5){
   const pool=wordsForLevel(courseId,level); if(!pool.length)return [];
   const s=state(profileId,courseId),skills=s?.c.skills||{},recent=s?.c.recent||[];
   const ranked=shuffle(pool).sort((a,b)=>{
     const A=skillFor(skills,a.id),B=skillFor(skills,b.id);
     const score=x=>(x.wrong||0)*4-(x.correct||0)*.55;
     return (score(B)+(recent.includes(b.id)?-5:0)-(B.last||0)/1e13)-
            (score(A)+(recent.includes(a.id)?-5:0)-(A.last||0)/1e13);
   });
   const chosen=ranked.slice(0,Math.min(count,pool.length));
   return chosen.map(w=>({...w,exerciseMode:chooseMode(skillFor(skills,w.id))}));
 }
 function recordAnswer(profileId,courseId,wordId,correct,mode='recognition'){
   const s=state(profileId,courseId); if(!s)return;
   const x=s.c.skills[wordId] ||= {correct:0,wrong:0,last:0,modes:{}};
   x.modes ||= {};
   const ms=x.modes[mode] ||= {correct:0,wrong:0,last:0};
   correct?(x.correct++,ms.correct++):(x.wrong++,ms.wrong++);
   x.last=ms.last=Date.now();
   s.c.stats ||= {correct:0,wrong:0}; s.c.stats.correct ||=0;s.c.stats.wrong ||=0;
   correct?s.c.stats.correct++:s.c.stats.wrong++;
   const d=new Date(),dayKey=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
   s.c.daily ||= {};
   const ds=s.c.daily[dayKey] ||= {correct:0,wrong:0,levels:{}};
   correct?ds.correct++:ds.wrong++;
   ds.levels ||= {};
   const lvl=s.c.level||'A1',ls=ds.levels[lvl] ||= {correct:0,wrong:0};
   correct?ls.correct++:ls.wrong++;
   s.c.recent=(s.c.recent||[]).filter(id=>id!==wordId);s.c.recent.push(wordId);
   s.c.recent=s.c.recent.slice(-Math.min(20,Math.max(10,Math.floor(wordsForLevel(courseId,lvl).length/2))));
   saveProfiles(s.profiles);
 }
 function getSummary(profileId,courseId){const s=state(profileId,courseId),st=s?.c.stats||{};return {correct:st.correct||0,wrong:st.wrong||0}}
 function isMastered(x){
   if(!x)return false;
   return MODES.every(m=>{const z=x.modes?.[m];return z&&(z.correct||0)>=1&&(z.correct||0)>=(z.wrong||0)});
 }
 function getProgress(profileId,courseId,level){
   const s=state(profileId,courseId);
   if(!s)return {todayCorrect:0,todayWrong:0,seen:0,mastered:0,review:0,total:0};
   const d=new Date(),dayKey=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
   const day=s.c.daily?.[dayKey]?.levels?.[level]||{correct:0,wrong:0};
   const pool=wordsForLevel(courseId,level),ids=new Set(pool.map(w=>w.id));
   let seen=0,mastered=0,review=0;
   Object.entries(s.c.skills||{}).forEach(([id,x])=>{
     if(!ids.has(id))return;
     const attempts=(x.correct||0)+(x.wrong||0);
     if(attempts>0)seen++;
     if(isMastered(x))mastered++;
     else if((x.wrong||0)>0)review++;
   });
   return {todayCorrect:day.correct||0,todayWrong:day.wrong||0,seen,mastered,review,total:pool.length};
 }
 function speak(text,courseId){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=APP.languages[courseId]?.speechLanguage||'en-GB';u.rate=.88;speechSynthesis.speak(u)}
 function getGlobalProgress(profileId){
   const profiles=loadProfiles(),p=profiles[profileId];
   if(!p)return {mastered:0,seen:0,total:0,byCourse:{}};
   let mastered=0,seen=0,total=0; const byCourse={};
   Object.keys(APP.languages).forEach(courseId=>{
     const c=getCourse(p,courseId),skills=c.skills||{},items=COURSE_DATA[courseId]||[];
     let cm=0,cs=0;
     items.forEach(w=>{
       const x=skills[w.id],attempts=(x?.correct||0)+(x?.wrong||0);
       if(attempts>0){seen++;cs++}
       if(isMastered(x)){mastered++;cm++}
     });
     total+=items.length;byCourse[courseId]={mastered:cm,seen:cs,total:items.length};
   });
   return {mastered,seen,total,byCourse};
 }
 return {MODES,wordsForLevel,buildLesson,recordAnswer,getSummary,getProgress,getGlobalProgress,speak};
})();