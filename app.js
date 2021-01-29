const sportsUrl = `https://api.the-odds-api.com/v3/sports?apiKey=69b790cf49d2c856f04114447b46335e`
//const oddsUrl = `https://api.the-odds-api.com/v3/odds/?apiKey=*INSERT_KEY*&sport=upcoming&region=us``

const getSports = async () => {
  try {
    const sportsData = await axios.get(sportsUrl)
    
    const sportsList = sportsData.data
    
    getSportsOptions(sportsList)
    
  } catch (error) {
    console.log(error)
  }
}
getSports();

const getSportsOptions = (list) => {
  const sportsOptions = document.querySelector('#league-list')
  list.data.forEach(sport => {
    const option = document.createElement('option')
    option.value = sport.key;
    option.textContent = sport.details;
    sportsOptions.append(option);
  })
}


const leagueButton = document.querySelector("#button-league");
leagueButton.addEventListener('click',  async (e) => {
  e.preventDefault();

  const value = document.querySelector("#league-list").value;
  const teamsData = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=69b790cf49d2c856f04114447b46335e&sport=${value}&region=us`)
  console.log(teamsData)
  const teamsList = teamsData.data

// create second drop down after first action is performed

  const where = document.querySelector('#submit-team-form')

  while (where.lastChild) {           // prevents multiple selects and options from being created if user submits league again
    where.removeChild(where.lastChild)
  }
  

    const createSelect = document.createElement("select")
    createSelect.setAttribute('name', 'Team')
    createSelect.setAttribute('id', "team-list")
    where.append(createSelect)
  
  const createOption = document.createElement('option');
  createOption.textContent = "Now Select a Matchup";
  const teamOptionList = document.querySelector("#team-list")
  teamOptionList.add(createOption);
  

  const teamButton = document.createElement('button');
  teamButton.textContent = "Submit Matchup"
  teamButton.setAttribute('id','button-team')
  //teamButton.setAttribute('class', 'button')
  where.append(teamButton)

  teamButton.addEventListener('click', async (e) => {
    e.preventDefault()
    const value = document.querySelector('#league-list').value
    const allData = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=69b790cf49d2c856f04114447b46335e&sport=${value}&region=us&oddsFormat=american&mkt=h2h`)
  
   
    const getSelectedGameValue = document.querySelector("#team-list").value
    const dataPoints = allData.data.data //prevent having to call redundant/nested data objects
  
    dataPoints.forEach(game => {    
  
      if (getSelectedGameValue === game.teams.toString()) {
        const appendDiv = document.querySelector("#append-odds")
        const bestOddsDiv = document.querySelector("#append-best-odds")
        const teamsPlaying = document.createElement('h2')
        const fixedTitle = game.teams.toString().split(",").join(" vs. ")
        teamsPlaying.textContent = fixedTitle;
        teamsPlaying.setAttribute("class", "teams-playing")
        appendDiv.append(teamsPlaying)
        //let gameTime = game.commence_time;
        // => 1612740600
        
        const homeArray = [];
        const awayArray = [];
        const drawArray = [];
        const siteArray = [];
        let drawMax = 0;
        let homeMax = 0;
        let awayMax = 0;
        // let homeMin = 0;
        // let awayMin = 0;
  
        const legend1 = document.querySelector("#legend-home");
        legend1.textContent = game.teams[0];
        const legend2 = document.querySelector('#legend-away');
        legend2.textContent = game.teams[1];
  
  
        for (let i = 0; i < game.sites.length; i++) {
          
          const homeOdds = document.createElement('div')
          homeOdds.setAttribute("class", "home-odds")
          homeOdds.textContent = `${game.teams[0]} : ${game.sites[i].odds.h2h[0]}`;
          const awayOdds = document.createElement('div')
          awayOdds.setAttribute("class", "away-odds")
          awayOdds.textContent = `${game.teams[1]} : ${game.sites[i].odds.h2h[1]}`;
          const bookNames = document.createElement('h3')
          bookNames.setAttribute('class', "booknames")
          bookNames.textContent = game.sites[i].site_nice;
          
            //all available odds array to get min/max later
          homeArray.push(game.sites[i].odds.h2h[0])
          awayArray.push(game.sites[i].odds.h2h[1]) 
          siteArray.push(game.sites[i])
          
          appendDiv.append(bookNames)
          appendDiv.append(homeOdds)
          appendDiv.append(awayOdds)
          if (game.sites[i].odds.h2h[2]) {
            const drawOdds = document.createElement('div')
            drawOdds.setAttribute('class', "draw-odds")
            drawOdds.textContent = `Draw: ${game.sites[i].odds.h2h[2]}`
            appendDiv.append(drawOdds)
            drawArray.push(game.sites[i].odds.h2h[2]) // if draw exists push value to array for later
          }
        }
        //get min and max odds for home and away to append
        homeMax = Math.max(...homeArray)
        const indexHomeMax = homeArray.indexOf(homeMax)
        console.log(indexHomeMax)

        //homeMin = Math.min(...homeArray)
        awayMax = Math.max(...awayArray)
        const indexAwayMax = awayArray.indexOf(awayMax)
        //awayMin = Math.min(...awayArray)
        drawMax = Math.max(...drawArray)
        const indexDrawMax = drawArray.indexOf(drawMax)
        //drawMin = Math.min(...drawArray)
        
  
        const homeMaxDiv = document.createElement('div')
        const awayMaxDiv = document.createElement('div')
        const homeSiteMaxDiv = document.createElement('div')
        const awaySiteMaxDiv = document.createElement('div')
        homeSiteMaxDiv.textContent = siteArray[indexHomeMax].site_nice;
        awaySiteMaxDiv.textContent = siteArray[indexAwayMax].site_nice;        
        
        const bestOddsTitle = document.createElement('p')
        bestOddsTitle.setAttribute('id', 'best-title')
        bestOddsTitle.textContent = "Best Odds";
  
        awayMaxDiv.setAttribute('class', 'away-odds')
        awayMaxDiv.textContent = awayMax;
  
        homeMaxDiv.setAttribute('class', 'home-odds')
        homeMaxDiv.textContent = homeMax;        
  
        bestOddsDiv.append(bestOddsTitle) //bestoddsdiv location set above after intial if statement
        bestOddsDiv.append(homeMaxDiv)
        bestOddsDiv.append(`The Best Odds for ${game.teams[0]} Available at: ${homeSiteMaxDiv.textContent}`)
        bestOddsDiv.append(awayMaxDiv)
        bestOddsDiv.append(`The Best Odds for ${game.teams[1]} Available at: ${awaySiteMaxDiv.textContent}`)

        if (drawArray.length > 0) {
          const drawMaxDiv = document.createElement('div')
          const drawSiteMaxDiv = document.createElement('div')
          drawSiteMaxDiv.textContent = siteArray[indexDrawMax].site_nice;
          drawMaxDiv.setAttribute('class', 'draw-odds')
          drawMaxDiv.textContent = drawMax;
          bestOddsDiv.append(drawMaxDiv)
          bestOddsDiv.append(`The Best Draw Odds Available at: ${drawSiteMaxDiv.textContent}`)
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
  const teamsOptions = document.querySelector("#team-list")

  list.data.forEach(team => {   
    const option = document.createElement('option')
    option.value = team.teams
    
    option.textContent = team.teams.toString().split(",").join(" vs. ")
   
    teamsOptions.append(option)
  })
}



//let teamButton = document.querySelector('#button-team')


const removeButton = document.createElement('button')
removeButton.setAttribute("id", "remove-button")
removeButton.textContent = 'Reset/Remove'
  
const removeItems = () => {  
  const where = document.querySelector("#submit-team-form")
  where.append(removeButton)  
}

removeButton.addEventListener('click', (e) => {
  e.preventDefault();
  const where = document.querySelector("#append-odds")
  const list1 = document.querySelector("#team-list")
  const where2 = document.querySelector("#append-best-odds")
  const where3 = document.querySelector('#submit-team-form')
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
  // let defaultOption = document.createElement("option")
  // defaultOption.text = "Select League First"
  // list1.add(defaultOption)


  const legend1 = document.querySelector("#legend-home");
  legend1.textContent = "FIRST TEAM"
  const legend2 = document.querySelector('#legend-away');
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
