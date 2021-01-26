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
  //console.log(teamsList)
  getTeamsOptions(teamsList)
  
  
})


const getTeamsOptions = (list) => {
  let teamsOptions = document.querySelector("#team-list")
  list.data.forEach(team => {
    //console.log(team)
    let option = document.createElement('option')
    option.value = team.teams
    //console.log("values: " + option.value)
    option.textContent = team.teams
    //console.log(option)
    teamsOptions.append(option)
  })
}

let teamButton = document.querySelector('#button-team')
teamButton.addEventListener('click', async (e) => {
  e.preventDefault()
  let value = document.querySelector('#league-list').value
  let allData = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=a141a74c096f26f5baeb764d9b7047c3&sport=${value}&region=us&oddsFormat=american&mkt=h2h`)

 
  let getSelectedGameValue = document.querySelector("#team-list").value

  //console.log("getselectedValue: " + getSelectedGameValue)
  let dataPoints = allData.data.data
  // console.log(dataPoints)
  // console.log(dataPoints[0].teams[0]) // first home team name
  // console.log(dataPoints[0].teams[1]) // first away team name
  // console.log(dataPoints[0].sites[0]) //first sportsbook in array's object of data.
  // console.log("Home ML Odds at Fanduel: " + dataPoints[0].sites[0].odds.h2h[0])  //home odds on first sportsbook
  // console.log("Away ML Odds at Fanduel: " + dataPoints[0].sites[0].odds.h2h[1])  // away odds on first sportsbook


  dataPoints.forEach(game => {
    // console.log(game)
    // console.log(game.teams.toString())
    // console.log(game.home_team)
    // console.log(game.sites)

    if (getSelectedGameValue === game.teams.toString()) {
      let appendDiv = document.querySelector("#append-odds")
      let teamsPlaying = document.createElement('h2')
      let fixedTitle = game.teams.toString().split(",").join(" vs. ")
      teamsPlaying.textContent = fixedTitle;
      teamsPlaying.setAttribute("class", "teams-playing")
      appendDiv.append(teamsPlaying)


      for (let i = 0; i < game.sites.length; i++) {
        //console.log(game.sites[i].site_nice)
        //console.log(`${game.teams[0]} : `  + game.sites[i].odds.h2h[0])
        //console.log(`${game.teams[1]} : ` + game.sites[i].odds.h2h[1])   ***if h2h[2] exists there is a draw value***
        
        let homeOdds = document.createElement('div')
        homeOdds.setAttribute("class", "home-odds")
        homeOdds.textContent = `${game.teams[0]} : ${game.sites[i].odds.h2h[0]}`;
        let awayOdds = document.createElement('div')
        awayOdds.setAttribute("class", "away-odds")
        awayOdds.textContent = `${game.teams[1]} : ${game.sites[i].odds.h2h[1]}`;
        let bookNames = document.createElement('h3')
        bookNames.setAttribute('class', "booknames")
        bookNames.textContent = game.sites[i].site_nice;
        
        
        appendDiv.append(bookNames)
        appendDiv.append(homeOdds)
        appendDiv.append(awayOdds)
        if (game.sites[i].odds.h2h[2]) {
          let drawOdds = document.createElement('div')
          drawOdds.setAttribute('class', "draw-odds")
          drawOdds.textContent = `Draw: ${game.sites[i].odds.h2h[2]}`
          //console.log(drawOdds)
          appendDiv.append(drawOdds)
        }
        


      }
    }
   
  }
)

 
  
  
  


} )

