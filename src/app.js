const API_KEY = "123";
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;
const inputBar = document.getElementById("input-bar");
const searchBtn = document.getElementById("search-btn");
const teamDisplayGrid = document.getElementById("team-display-grid");
const playerDisplayGrid = document.getElementById("player-display-grid");
const rosterContainer = document.getElementById("roster-container");
const playerInfoGrid = document.getElementById("player-info-grid");
const closeBtn = document.getElementById("close-btn");

async function searchTeams () {
  const query = inputBar.value.trim();

  if (!query) return;

  try {
    let searchTeamURL = `${BASE_URL}/searchteams.php?t=${query}`;

    await fetch (searchTeamURL)
            .then((res) => res.json())
            .then((data) => {
              if(data.teams) {
                teamDetails(data.teams);
                allPlayers(data.teams[0].idTeam);
              }
            });
  } catch (e) {
    alert("An error occured while fetching data.");
  }
}

async function allPlayers (teamId) {
  try {
    let allPlayerURL = `${BASE_URL}/lookup_all_players.php?id=${teamId}`;

    await fetch(allPlayerURL)
          .then((res) => res.json())
          .then((data) => allPlayerDetails(data.player));
  } catch (e) {
    alert("Error fetching players");
  }
}

function teamDetails (teams) {
  rosterContainer.classList.remove("hidden");

  let teamsHtml = "";

  teams.forEach((team) => {
    teamsHtml += `
      <div class="bg-[#1e293b] rounded-xl overflow-hidden border border-[#334155] mb-8">
      <div class="w-full h-[200px] bg-[#334155]">
        <img src="${team.strBanner}" alt="Team Banner" class="w-full h-full object-full block">
      </div>
      <div class="p-6 flex items-center gap-6">
        <img src="${team.strBadge}" alt="Team Badge" class="w-24 h-24 object-contain">
        <div>
          <h2 class="text-2xl text-gray-200 my-3 font-semibold">
            ${team.strTeam}
          </h2>
          <p class="text-gray-300 text-xl mb-3">
            League : <span>${team.strLeague}</span>
          </p>
          <p class="text-gray-300 mb-3">
            Stadium : <span>${team.strStadium}</span>
          </p>
          <p  class="text-gray-300 mb-3">
            Formed : <span>${team.intFormedYear}</span>
          </p>
        </div>
      </div>
    </div>
    `;
  });
  teamDisplayGrid.innerHTML = teamsHtml;
}

function allPlayerDetails (playerDetails) {
  let playerDetailsHTML = "";

  playerDetails.forEach((player) => {
    playerDetailsHTML += `
      <button class="cursor-pointer transition-transform duration-400 ease-in-out hover:border border-blue-400 rounded-lg hover:-translate-y-1" onclick="playerDetailsURL('${player.idPlayer}')">
        <div class="border border-gray-600 py-2 px-3 rounded-lg text-center">
          <img src="${player.strThumb}" alt="${player.strPlayer}" class="w-full object-cover rounded-lg">
          <h3 class="text-white text-xl my-2">
            ${player.strPlayer}
          </h3>
          <p class="text-gray-300 mb-2">
            ${player.strPosition}
          </p>
        </div>
      </button>
    `;
  });
  playerDisplayGrid.innerHTML = playerDetailsHTML;
}

async function playerDetailsURL (playerId) {
  let playerDetailURL = `${BASE_URL}/lookupplayer.php?id=${playerId}`;

  try {
    await fetch(playerDetailURL)
            .then((res) => res.json())
            .then((data) => playerInfo(data.players));
  } catch(e) {
    alert("Error fetching player details.");
  }
}

function playerInfo (players) {
  playerInfoGrid.classList.add("visible");
  playerInfoGrid.classList.remove("invisible");

  let playerInfoHTML = "";

  players.forEach((player) => {
    playerInfoHTML = `
      <div class="popup bg-slate-800 max-w-[650px] h-[700px] p-6 rounded-lg flex flex-col gap-6 relative overflow-hidden">
        <div class="flex items-center gap-6 relative">
          <img src="${player.strThumb}" alt="${player.strPlayer}" class="w-48 h-48 object-cover rounded-lg shrink-0">
          <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-bold text-slate-50">${player.strPlayer || "N/A"} </h2>
            <p class="text-slate-200">${player.strTeam || "N/A"}</p>
            <p class="text-slate-300">${player.strNationality || "N/A"}</p>
            <p class="text-slate-300">(${player.strSport || "N/A"})</p>
          </div>
          <button class="absolute top-0 right-0 text-slate-400 hover:text-white text-xl p-1 transition-colors" id="close-btn" onclick="closeDetails()">
            X
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 bg-slate-900 p-4 rounded-lg">
          <div class="space-y-3">
            <div>
              <p class="text-lg text-slate-300">POSITION</p>
              <p class="text-blue-400 font-semibold">${player.strPosition || "N/A"}</p>
            </div>
            <div>
              <p class="text-lg text-slate-300">HEIGHT</p>
              <p class="text-blue-400 font-semibold">${player.strHeight || "N/A"}</p>
            </div>
            <div>
              <p class="text-lg text-slate-300">BIRTH-DATE</p>
              <p class="text-blue-400 font-semibold">${player.dateBorn || "N/A"}</p>
            </div>
          </div>
            <div class="space-y-3">
              <div>
                <p class="text-lg text-slate-300">NUMBER</p>
                <p class="text-blue-400 font-semibold">
                ${player.strNumber || "N/A"}</p>
              </div>
              <div>
                <p class="text-lg text-slate-300">WEIGHT</p>
                <P class="text-blue-400 font-semibold">${player.strWeight || "N/A"}</P>
              </div>
              <div>
                <p class="text-lg text-slate-300">SIGNING VALUE</p>
                <p class="text-blue-400 font-semibold">
                ${player.strSigning || "N/A"}</p>
              </div>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <h3 class="text-xl text-slate-300">Biography</h3>
          <P class="text-slate-400">${player.strDescriptionEN || "N/A"}</P>
        </div>
      </div>
    `;
  });
  playerInfoGrid.innerHTML = playerInfoHTML;
}

function closeDetails () {
  playerInfoGrid.classList.add("invisible");
  playerInfoGrid.classList.remove("visible");
}

searchBtn.addEventListener("click", () => {
  searchTeams();
});