const sportsUrl = `https://api.the-odds-api.com/v3/sports?apiKey=69b790cf49d2c856f04114447b46335e`
//const oddsUrl = `https://api.the-odds-api.com/v3/odds/?apiKey=*INSERT_KEY*&sport=upcoming&region=us``

const getSports = async () => {
  try {
    let sportsData = await axios.get(sportsUrl)
    
    let sportsList = sportsData.data
    
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
  let teamsData = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=69b790cf49d2c856f04114447b46335e&sport=${value}&region=us`)
  console.log(teamsData)
  let teamsList = teamsData.data

// create second drop down after first action is performed

  let where = document.querySelector('#submit-team-form')

  let createSelect = document.createElement("select")
  createSelect.setAttribute('name', 'Team')
  createSelect.setAttribute('id', "team-list")
  where.append(createSelect)

  let createOption = document.createElement('option');
  createOption.textContent = "Now Select a Matchup";
  let teamOptionList = document.querySelector("#team-list")
  teamOptionList.add(createOption);
  

  const teamButton = document.createElement('button');
  teamButton.textContent = "Submit Matchup"
  teamButton.setAttribute('id','button-team')
  //teamButton.setAttribute('class', 'button')
  where.append(teamButton)

  teamButton.addEventListener('click', async (e) => {
    e.preventDefault()
    let value = document.querySelector('#league-list').value
    let allData = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=69b790cf49d2c856f04114447b46335e&sport=${value}&region=us&oddsFormat=american&mkt=h2h`)
  
   
    let getSelectedGameValue = document.querySelector("#team-list").value
    let dataPoints = allData.data.data 
  
    dataPoints.forEach(game => {    
  
      if (getSelectedGameValue === game.teams.toString()) {
        let appendDiv = document.querySelector("#append-odds")
        let bestOddsDiv = document.querySelector("#append-best-odds")
        let teamsPlaying = document.createElement('h2')
        let fixedTitle = game.teams.toString().split(",").join(" vs. ")
        teamsPlaying.textContent = fixedTitle;
        teamsPlaying.setAttribute("class", "teams-playing")
        appendDiv.append(teamsPlaying)
        //let gameTime = game.commence_time;
        // => 1612740600
        
        let homeArray = [];
        let awayArray = [];
        let drawArray = [];
        let drawMax = 0;
        let homeMax = 0;
        let awayMax = 0;
        let homeMin = 0;
        let awayMin = 0;
  
        let legend1 = document.querySelector("#legend-home");
        legend1.textContent = game.teams[0];
        let legend2 = document.querySelector('#legend-away');
        legend2.textContent = game.teams[1];
  
  
        for (let i = 0; i < game.sites.length; i++) {
          
          let homeOdds = document.createElement('div')
          homeOdds.setAttribute("class", "home-odds")
          homeOdds.textContent = `${game.teams[0]} : ${game.sites[i].odds.h2h[0]}`;
          let awayOdds = document.createElement('div')
          awayOdds.setAttribute("class", "away-odds")
          awayOdds.textContent = `${game.teams[1]} : ${game.sites[i].odds.h2h[1]}`;
          let bookNames = document.createElement('h3')
          bookNames.setAttribute('class', "booknames")
          bookNames.textContent = game.sites[i].site_nice;
          
            //all available odds array to get min/max later
          homeArray.push(game.sites[i].odds.h2h[0])
          awayArray.push(game.sites[i].odds.h2h[1])        
          
          appendDiv.append(bookNames)
          appendDiv.append(homeOdds)
          appendDiv.append(awayOdds)
          if (game.sites[i].odds.h2h[2]) {
            let drawOdds = document.createElement('div')
            drawOdds.setAttribute('class', "draw-odds")
            drawOdds.textContent = `Draw: ${game.sites[i].odds.h2h[2]}`
            appendDiv.append(drawOdds)
            drawArray.push(game.sites[i].odds.h2h[2]) // if draw exists push value to array for later
          }
        }
        //get min and max odds for home and away to append
        homeMax = Math.max(...homeArray)
        homeMin = Math.min(...homeArray)
        awayMax = Math.max(...awayArray)
        awayMin = Math.min(...awayArray)
        drawMax = Math.max(...drawArray)
        drawMin = Math.min(...drawArray)
        
  
        let homeMaxDiv = document.createElement('div')
        let awayMaxDiv = document.createElement('div')
        
        
        let bestOddsTitle = document.createElement('p')
        bestOddsTitle.textContent = "Best Odds";
  
        awayMaxDiv.setAttribute('class', 'away-odds')
        awayMaxDiv.textContent = awayMax;
  
        homeMaxDiv.setAttribute('class', 'home-odds')
        homeMaxDiv.textContent = homeMax;
  
        
  
        bestOddsDiv.append(bestOddsTitle) //bestoddsdiv location set above after intial if statement
        bestOddsDiv.append(homeMaxDiv)
        bestOddsDiv.append(awayMaxDiv)
        if (drawArray.length > 0) {
          let drawMaxDiv = document.createElement('div')
          drawMaxDiv.setAttribute('class', 'draw-odds')
          drawMaxDiv.textContent = drawMax;
          bestOddsDiv.append(drawMaxDiv)
        }
        
      }
     
      }
      )
    removeItems();
    
    }
  )

  
  getTeamsOptions(teamsList)
  
  
})


const getTeamsOptions = (list) => {
  let teamsOptions = document.querySelector("#team-list")

  list.data.forEach(team => {   
    let option = document.createElement('option')
    option.value = team.teams
    
    option.textContent = team.teams.toString().split(",").join(" vs. ")
   
    teamsOptions.append(option)
  })
}



//let teamButton = document.querySelector('#button-team')


let removeButton = document.createElement('button')
removeButton.setAttribute("id", "remove-button")
removeButton.textContent = 'Reset/Remove'
  
const removeItems = () => {  
  let where = document.querySelector("#submit-team-form")
  where.append(removeButton)  
}

removeButton.addEventListener('click', (e) => {
  e.preventDefault();
  let where = document.querySelector("#append-odds")
  let list1 = document.querySelector("#team-list")
  let where2 = document.querySelector("#append-best-odds")
  let where3 = document.querySelector('#submit-team-form')
  while (where.lastChild) {
    where.removeChild(where.lastChild)
  }
  while (list1.lastChild) {
    list1.removeChild(list1.lastChild)
  }
  while (where2.lastChild) {
    where2.removeChild(where2.lastChild)
  }
  while (where3.lastChild) {
    where3.removeChild(where3.lastChild)
  }
  let defaultOption = document.createElement("option")
  defaultOption.text = "Select League First"
  list1.add(defaultOption)


  let legend1 = document.querySelector("#legend-home");
  legend1.textContent = "FIRST TEAM"
  let legend2 = document.querySelector('#legend-away');
  legend2.textContent = "SECOND TEAM"
 
}

)



//teams button eventhandler returned object syntax below

// console.log(game)
// console.log(game.teams.toString())
// console.log(game.home_team)
// console.log(game.sites)

  //console.log(game.sites[i].site_nice)
  //console.log(`${game.teams[0]} : `  + game.sites[i].odds.h2h[0])
  //console.log(`${game.teams[1]} : ` + game.sites[i].odds.h2h[1])   ***if h2h[2] exists there is a draw value***
  // console.log(dataPoints)
  // console.log(dataPoints[0].teams[0]) // first home team name
  // console.log(dataPoints[0].teams[1]) // first away team name
  // console.log(dataPoints[0].sites[0]) //first sportsbook in array's object of data.
  // console.log("Home ML Odds at Fanduel: " + dataPoints[0].sites[0].odds.h2h[0])  //home odds on first sportsbook
  // console.log("Away ML Odds at Fanduel: " + dataPoints[0].sites[0].odds.h2h[1])  // away odds on first sportsbook
