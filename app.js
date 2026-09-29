/* LinguaCore v0.10.0 */
const APP={name:'LinguaCore',version:'0.10.0',languages:{
 english:{id:'english',name:'English',flag:'🇬🇧',speechLanguage:'en-GB',levels:['A1','A2','B1','B2']},
 spanish:{id:'spanish',name:'Español',flag:'🇪🇸',speechLanguage:'es-ES',levels:['A1','A2','B1','B2']}
}};
const STORAGE={profiles:'linguacoreProfilesV1',activeProfile:'linguacoreActiveProfileV1'};
function loadProfiles(){try{return JSON.parse(localStorage.getItem(STORAGE.profiles)||'{}')}catch{return {}}}
function saveProfiles(p){localStorage.setItem(STORAGE.profiles,JSON.stringify(p))}
function setActiveProfile(id){localStorage.setItem(STORAGE.activeProfile,id)}
function getActiveProfile(){const p=loadProfiles(),id=localStorage.getItem(STORAGE.activeProfile);return id&&p[id]?p[id]:null}
function createProfile(name){name=name.trim();if(!name)return null;const p=loadProfiles();const id='profile_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);p[id]={id,name,createdAt:Date.now(),courses:{}};saveProfiles(p);setActiveProfile(id);return p[id]}
function getCourse(profile,courseId){profile.courses ||= {};profile.courses[courseId] ||= {level:null,stats:{},skills:{},recent:[],createdAt:Date.now()};return profile.courses[courseId]}
