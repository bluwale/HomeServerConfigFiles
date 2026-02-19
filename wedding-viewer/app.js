// ======= CONFIGURE =======

const CANDIDATE_STREAM_URLS = [

  "#PLACEHOLDER_STREAM_URL",   // <-- replace this with the actual stream URL

  "#PLACEHOLDER_STREAM_URL_2", // <-- you can add more URLs as fallback options

];

const PASSWORD = "wedding2025";

const REMEMBER_MINUTES = 240;

const URL_PARAM_NAME = "p";

// =========================


const $ = (s) => document.querySelector(s);

const gate = $("#gate");

const gateForm = $("#gateForm");

const gateMsg = $("#gateMsg");

const passwordInput = $("#passwordInput");

const player = $("#player");

const video = $("#video");

document.getElementById("year").textContent = new Date().getFullYear();


const KEY = "wedding_gate_ok";

function setGateOK(){

  localStorage.setItem(KEY, JSON.stringify({ ok:true, at:Date.now(), ttl: REMEMBER_MINUTES*60_000 }));

}

function isGateOK(){

  try{

    const raw = localStorage.getItem(KEY);

    if(!raw) return false;

    const { ok, at, ttl } = JSON.parse(raw);

    return ok && (Date.now() - at) < ttl;

  }catch{ return false; }

}

function showError(msg){

  gateMsg.textContent = msg;

}

function revealPlayer(){

  gate.classList.add("hidden");

  player.classList.remove("hidden");

}


async function tryLoadHls(url){

  // Safari path: native HLS

  if (video.canPlayType("application/vnd.apple.mpegurl")) {

    video.src = url;

    revealPlayer();

    return true;

  }


  if (window.Hls && Hls.isSupported()) {

    return await new Promise((resolve) => {

      const hls = new Hls({

        maxBufferLength: 10,

        maxMaxBufferLength: 20,

        liveSyncDurationCount: 2,

      });

      hls.on(Hls.Events.ERROR, (_, data) => {

        if (data?.fatal) resolve(false);

      });

      hls.on(Hls.Events.MANIFEST_PARSED, () => {

        revealPlayer();

        resolve(true);

      });

      hls.loadSource(url);

      hls.attachMedia(video);

    });

  }


  showError("Your browser doesn’t support HLS. Try Chrome, Edge, Firefox, or Safari.");

  return false;

}


async function initPlayer(){

  // try candidates in order

  for (const url of CANDIDATE_STREAM_URLS){

    const ok = await tryLoadHls(url);

    if (ok) return;

  }

  showError("We couldn't load the stream (tried multiple URLs). If the event hasn't started yet, please try again in a minute.");

}


function tryUnlock(pw){

  const typed = (pw ?? "").trim();       // <-- important fix

  if (!typed) return false;

  if (typed === PASSWORD){

    setGateOK();

    initPlayer();

    return true;

  }

  return false;

}


gateForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const ok = tryUnlock(passwordInput.value);

  if (!ok) {

    showError("Incorrect password. Please try again.");

    passwordInput.focus();

    gate.animate(

      [{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],

      {duration:220}

    );

  }

});


// URL shortcut ?p=wedding2025

const urlPw = new URLSearchParams(location.search).get(URL_PARAM_NAME);

if (urlPw && tryUnlock(urlPw)) {

  // unlocked via URL param

} else if (isGateOK()) {

  initPlayer();

} else {

  player.classList.add("hidden");

}

