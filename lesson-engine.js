/* LinguaCore v0.8.0 — lesson engine */
const LinguaCoreEngine=(()=>{
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const wordsForLevel=(course,level)=>(COURSE_DATA[course]||[]).filter(w=>w.level===level);
 function state(profileId,courseId){
   const profiles=loadProfiles(),p=profiles[profileId]; if(!p)return null;
   const c=getCourse(p,courseId); c.skills ||= {}; c.recent ||= []; return {profiles,p,c};
 }
 function buildLesson(profileId,courseId,level,count=5){
   const pool=wordsForLevel(courseId,level); if(!pool.length)return [];
   const s=state(profileId,courseId); const skills=s?.c.skills||{}, recent=s?.c.recent||[];
   const ranked=shuffle(pool).sort((a,b)=>{
     const A=skills[a.id]||{correct:0,wrong:0,last:0},B=skills[b.id]||{correct:0,wrong:0,last:0};
     const ar=(A.wrong*4)-(A.correct*0.6)+(recent.includes(a.id)?-5:0)-(A.last/1e13);
     const br=(B.wrong*4)-(B.correct*0.6)+(recent.includes(b.id)?-5:0)-(B.last/1e13);
     return br-ar;
   });
   let chosen=ranked.slice(0,Math.min(count,pool.length));
   if(chosen.length<count) chosen=[...chosen,...shuffle(pool).slice(0,count-chosen.length)];
   return chosen;
 }
 function recordAnswer(profileId,courseId,wordId,correct){
   const s=state(profileId,courseId); if(!s)return;
   const x=s.c.skills[wordId] ||= {correct:0,wrong:0,last:0};
   correct?x.correct++:x.wrong++; x.last=Date.now();
   s.c.stats ||= {correct:0,wrong:0}; s.c.stats.correct ||=0;s.c.stats.wrong ||=0;
   correct?s.c.stats.correct++:s.c.stats.wrong++;
   s.c.recent=(s.c.recent||[]).filter(id=>id!==wordId);s.c.recent.push(wordId);
   s.c.recent=s.c.recent.slice(-Math.min(20,Math.max(10,Math.floor(wordsForLevel(courseId,s.c.level||'A1').length/2))));
   saveProfiles(s.profiles);
 }
 function getSummary(profileId,courseId){const s=state(profileId,courseId);const st=s?.c.stats||{};return {correct:st.correct||0,wrong:st.wrong||0}}
 function speak(text,courseId){if(!('speechSynthesis'in window))return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=APP.languages[courseId]?.speechLanguage||'en-GB';u.rate=.88;speechSynthesis.speak(u)}
 return {wordsForLevel,buildLesson,recordAnswer,getSummary,speak};
})();
