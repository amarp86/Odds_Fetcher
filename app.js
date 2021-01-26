const sportsUrl = `https://api.the-odds-api.com/v3/sports?apiKey=a141a74c096f26f5baeb764d9b7047c3`
//const oddsUrl = `https://api.the-odds-api.com/v3/odds/?apiKey=a141a74c096f26f5baeb764d9b7047c3&sport=upcoming&region=us``



const getSports = async () => {
  try {
    let sportsData = await axios.get(sportsUrl)
    //let sportsList = Object.keys(sportsData)
    let sportsList = sportsData.data
    //console.log(sportsList)
    getSportsOptions(sportsList)
    
  } catch (error) {
    console.log(error)
  }
}
getSports();

const getSportsOptions = (list) => {
  let sportsOptions = document.querySelector('#league-list')
  list.data.forEach(sport => {
    let option = document.createElement('option')
    option.value = sport.key;
    option.textContent = sport.details;
    sportsOptions.append(option);
  })
}


let leagueButton = document.querySelector("#button-league");
leagueButton.addEventListener('click',  async (e) => {
  e.preventDefault();
  let value = document.querySelector("#league-list").value;
  let teamsData = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=a141a74c096f26f5baeb764d9b7047c3&sport=${value}&region=us`)
  let teamsList = teamsData.data
  console.log(teamsList)
  getTeamsOptions(teamsList)
})


const getTeamsOptions = (list) => {
  let teamsOptions = document.querySelector("#team-list")
  list.data.forEach(team => {
    //console.log(team)
    let option = document.createElement('option')
    option.value = team.teams
    option.textContent = team.teams
    //console.log(option)
    teamsOptions.append(option)
  })
}


// axios.get(url).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });