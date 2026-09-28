/*
  LinguaCore
  Universal language-learning engine

  Version: 0.7
*/

const APP = {
  name: 'LinguaCore',
  version: '0.7',

  languages: {
    english: {
      id: 'english',
      name: 'English',
      flag: '🇬🇧',
      speechLanguage: 'en-GB',
      levels: ['A1', 'A2', 'B1', 'B2']
    },

    spanish: {
      id: 'spanish',
      name: 'Español',
      flag: '🇪🇸',
      speechLanguage: 'es-ES',
      levels: ['A1']
    }
  }
};

const STORAGE = {
  profiles: 'linguacoreProfilesV1',
  activeProfile: 'linguacoreActiveProfileV1'
};

function loadProfiles() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.profiles) || '{}');
  } catch {
    return {};
  }
}

function saveProfiles(profiles) {
  localStorage.setItem(
    STORAGE.profiles,
    JSON.stringify(profiles)
  );
}

function createProfile(name) {
  const cleanName = name.trim();

  if (!cleanName) {
    return null;
  }

  const profiles = loadProfiles();

  const id =
    'profile_' +
    Date.now().toString(36) +
    '_' +
    Math.random().toString(36).slice(2, 8);

  profiles[id] = {
    id,
    name: cleanName,
    createdAt: Date.now(),

    courses: {}
  };

  saveProfiles(profiles);
  setActiveProfile(id);

  return profiles[id];
}

function setActiveProfile(id) {
  localStorage.setItem(
    STORAGE.activeProfile,
    id
  );
}

function getActiveProfile() {
  const profiles = loadProfiles();
  const id = localStorage.getItem(STORAGE.activeProfile);

  if (!id || !profiles[id]) {
    return null;
  }

  return profiles[id];
}

function getCourse(profile, courseId) {
  if (!profile.courses[courseId]) {
    profile.courses[courseId] = {
      level: null,
      stats: {},
      skills: {},
      createdAt: Date.now()
    };
  }

  return profile.courses[courseId];
}

console.log(
  `${APP.name} v${APP.version} core loaded`
);
