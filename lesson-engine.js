/* LinguaCore v0.12.0 — adaptive multi-exercise lesson engine */
const LinguaCoreEngine=(()=>{
 const MODES=['recognition','reverse','listening','typing'];
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const wordsForLevel=(course,level)=>(COURSE_DATA[course]||[]).filter(w=>w.level===level&&!w.context_only);
 const WORD_SHARE={A1:.90,A2:.80,B1:.70,B2:.60};
 function learningPool(course,level,skills={}){const pool=wordsForLevel(course,level).filter(w=>course!=='idioms'||!isMastered(skills[w.id],course));return {pool,words:pool.filter(w=>w.type==='word'),phrases:pool.filter(w=>w.type==='phrase'),wordShare:course==='idioms'?0:WORD_SHARE[level]??.70}}
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
 const profiles=loadProfiles(),p=profiles[profileId];if(!p)return[];
 const c=getCourse(p,courseId),recent=new Set(c.recent||[]);
 const {pool,words,phrases,wordShare}=learningPool(courseId,level,c.skills||{});if(!pool.length)return[];
 const rank=list=>list.map(w=>{const x=c.skills?.[w.id]||{},attempts=(x.correct||0)+(x.wrong||0);return {w,score:(x.wrong||0)*7-(x.correct||0)*2+(attempts===0?10:0)+(recent.has(w.id)?-14:0)+Math.random()*5}}).sort((a,b)=>b.score-a.score).map(x=>x.w);
 const rw=rank(words),rp=rank(phrases);let wc=Math.min(rw.length,Math.round(count*wordShare)),pc=Math.min(rp.length,count-wc);
 while(wc+pc<count&&wc<rw.length)wc++;while(wc+pc<count&&pc<rp.length)pc++;
 return shuffle([...rw.slice(0,wc),...rp.slice(0,pc)]).slice(0,count).map(w=>{let mode=chooseMode(skillFor(c.skills||{},w.id));if(courseId==='idioms'&&(c.skills?.[w.id]?.correct||0)>=2&&(c.skills?.[w.id]?.idiomRecall||0)<1)mode='typing';if(w.type!=='word'&&mode==='typing'&&courseId!=='idioms')mode='reverse';return {...w,exerciseMode:mode}})
 }
 function recordAnswer(profileId,courseId,wordId,correct,mode='recognition'){
   const s=state(profileId,courseId); if(!s)return;
   const x=s.c.skills[wordId] ||= {correct:0,wrong:0,last:0,modes:{}};
   if(courseId==='idioms'){x.idiomSessions ||= [];const session=s.c.activeSession||'';if(correct&&session&&!x.idiomSessions.some(z=>z.session===session)){x.idiomSessions.push({session,time:Date.now()});} if(mode==='typing'&&correct)x.idiomRecall=(x.idiomRecall||0)+1;}
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
 function isMastered(x,courseId){
   if(!x)return false;
   if(courseId==='idioms'){const sessions=x.idiomSessions||[];return (x.correct||0)>=5&&sessions.length>=5&&(Math.max(...sessions.map(z=>z.time))-Math.min(...sessions.map(z=>z.time)))>=86400000&&(x.idiomRecall||0)>=1;} 
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
     if(isMastered(x,courseId))mastered++;
     else if((x.wrong||0)>0)review++;
   });
   return {todayCorrect:day.correct||0,todayWrong:day.wrong||0,seen,mastered,review,total:pool.length};
 }
 const voiceKey='linguacoreVoiceSettingsV1';
 function getVoiceSettings(profileId){try{const all=JSON.parse(localStorage.getItem(voiceKey)||'{}');return all[profileId]||{}}catch{return {}}}
 function setVoiceSettings(profileId,courseId,settings){let all={};try{all=JSON.parse(localStorage.getItem(voiceKey)||'{}')}catch{};all[profileId] ||= {};all[profileId][courseId]=settings;localStorage.setItem(voiceKey,JSON.stringify(all))}
 function availableVoices(courseId){if(!('speechSynthesis'in window))return [];const lang=APP.languages[courseId]?.speechLanguage||'en-GB';return speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith(lang.toLowerCase().slice(0,2)))}
 function speak(text,courseId,profileId){if(!('speechSynthesis'in window))return;const id=profileId||getActiveProfile()?.id,settings=getVoiceSettings(id)?.[courseId]||{};speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=APP.languages[courseId]?.speechLanguage||'en-GB';u.rate=Number(settings.rate)||.88;const voices=availableVoices(courseId),voice=voices.find(v=>v.voiceURI===settings.voiceURI)||voices.find(v=>v.lang.toLowerCase()===u.lang.toLowerCase())||voices[0];if(voice)u.voice=voice;speechSynthesis.speak(u)}
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
       if(isMastered(x,courseId)){mastered++;cm++}
     });
     total+=items.length;byCourse[courseId]={mastered:cm,seen:cs,total:items.length};
   });
   return {mastered,seen,total,byCourse};
 }
 return {MODES,wordsForLevel,buildLesson,recordAnswer,getSummary,getProgress,getGlobalProgress,speak,getVoiceSettings,setVoiceSettings,availableVoices};
})();