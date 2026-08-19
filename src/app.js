async function fetchTeam () {
  let URL = `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=4328`;

  await fetch(URL)
        .then((res) => res.json())
        .then((data) => console.log(data.table));
}

function showTeam (teams) {
  teams.forEach((team) => {
    document.getElementById("display").innerHTML = `
      <div>
        <img src="${team.strBadge}" alt="">
        <img src="${team.strBanner}" alt="">
        <h2>${team.strCountry}</h2>
        <p>${team.strDescriptionEN}</p>
      </div>
    `;
  })
}
fetchTeam();