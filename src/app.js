const API_KEY = "123";
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;
const inputBar = document.getElementById("input-bar");
const searchBtn = document.getElementById("search-btn");
const teamDisplayGrid = document.getElementById("team-display-grid");
const playerDisplayGrid = document.getElementById("player-display-grid");
const rosterContainer = document.getElementById("roster-container");

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
      <div class="border border-gray-600 py-2 px-3 rounded-lg text-center">
        <img src="${player.strThumb}" alt="${player.strPlayer}" class="w-full object-cover rounded-lg">
        <h3 class="text-white text-xl my-2">
          ${player.strPlayer}
        </h3>
        <p class="text-gray-300 mb-2">
          ${player.strPosition}
        </p>
      </div>
    `;
  });
  playerDisplayGrid.innerHTML = playerDetailsHTML;
}

searchBtn.addEventListener("click", () => {
  searchTeams();
});