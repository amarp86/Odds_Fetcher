# App Title: Wanna_Bet_Odds_Fetcher


App Description: Web App will fetch current sports bettings odds for upcoming matches per league chosen by user.

API: [Link to API] (https://the-odds-api.com/)

API Snippet: ``` [{
    "sport_key": "americanfootball_nfl",
    "sport_nice": "NFL",
    "teams": ["Chicago Bears","Tampa Bay Buccaneers"],
    "home_team": "Chicago Bears",
    "commence_time": "2020-10-09T00:20:00Z",
    "sites": [{
            "site_key": "fanduel",
            "site_nice": "FanDuel",
            "last_update": "2020-10-07T09:13:27Z",
            "odds": {"h2h": [188,-225]}
        },
        {
            "site_key": "bookmaker",
            "site_nice": "Bookmaker",
            "last_update": "2020-10-07T09:16:08Z",
            "odds": {"h2h": [184,-220]}
        },
        {
            "site_key": "unibet",
            "site_nice": "Unibet",
            "last_update": "2020-10-07T09:14:17Z",
            "odds": {"h2h": [185,-213]}
        },
        {
            "site_key": "betrivers",
            "site_nice": "BetRivers",
            "last_update": "2020-10-07T09:14:33Z",
            "odds": {"h2h": [185,-215]}
        },
        {
            "site_key": "williamhill_us",
            "site_nice": "William Hill (US)",
            "last_update": "2020-10-07T09:16:48Z",
            "odds": {"h2h": [190,-220]}
        },
        {
            "site_key": "draftkings",
            "site_nice": "DraftKings",
            "last_update": "2020-10-07T09:17:42Z",
            "odds": {"h2h": [185,-215]}
        },
        {
            "site_key": "betonlineag",
            "site_nice": "BetOnline.ag",
            "last_update": "2020-10-07T09:16:50Z",
            "odds": {"h2h": [190,-222]}
        },
        {
            "site_key": "lowvig",
            "site_nice": "LowVig.ag",
            "last_update": "2020-10-07T09:17:12Z",
            "odds": {"h2h": [190,-220]}
        },
        {
            "site_key": "betmgm",
            "site_nice": "BetMGM",
            "last_update": "2020-10-07T09:14:05Z",
            "odds": {"h2h": [190,-227]}
        },
        {
            "site_key": "mybookieag",
            "site_nice": "MyBookie.ag",
            "last_update": "2020-10-07T09:13:03Z",
            "odds": {"h2h": [190,-240]}
        },
        {
            "site_key": "betfair",
            "site_nice": "Betfair",
            "last_update": "2020-10-07T09:16:05Z",
            "odds": {
                "h2h": [200,-208],
                "h2h_lay": [210,-200]
            }
        },
        {
            "site_key": "intertops",
            "site_nice": "Intertops",
            "last_update": "2020-10-07T09:13:08Z",
            "odds": {"h2h": [180,-220]}
        },
        {
            "site_key": "pointsbetus",
            "site_nice": "PointsBet (US)",
            "last_update": "2020-10-07T09:14:44Z",
            "odds": {"h2h": [180,-225]}
        },
        {
            "site_key": "gtbets",
            "site_nice": "GTbets",
            "last_update": "2020-10-07T09:13:31Z",
            "odds": {"h2h": [195,-225]}
        }
    ],
    "sites_count": 14
},```

Wireframes: [Link to Wireframe](https://wireframe.cc/SXndMc)


MVP: 
1. Establish Connection to API with axios
2. Allow User to select a sports league (NBA, NCAAB, NFL, etc..)
3. Allow user to select a team within selected league (NY Knicks, Penn State Nittany Lions, Kansas City Chiefs, etc)
4. Append DOM to display current realtime bettings odds and other necessary game data to make informed wager.
5. Manipulate DOM with CSS to display information in a presentable manner.



Post-MVP: 
1. Append DOM to link externally to sportsbooks allowing wagers on current matchup that are within API
2. Make second API call to fetch previous results based on odds and display "previous outcomes"
3. Use JS to find sportsbook with BEST ODDS for selected Match-Up


Schedule and Goals: 
| Date      |            Goal of the Day              |  Status |
| --------- | --------------------------------------- | ------- |
| 1/25/2021 | Prompt/Wireframe                        | Pending |
| 1/26/2021 | Approval/Begin Coding                   | Pending |
| 1/27/2021 | Core App Structure                      | Pending |
| 1/28/2021 | Initial Deployment                      | Pending |
| 1/29/2021 | Meet MVP Deliverables                   | Pending |
| 2/1/2021  | Presentations/Submission                | Pending |


Priority Matrix: [Link to Priority Matrix](https://drive.google.com/file/d/1h6b-Pgw7N-GC2XifGAZZEinY6ZF-N-Ef/view?usp=sharing)

![priority matrix](https://drive.google.com/file/d/1h6b-Pgw7N-GC2XifGAZZEinY6ZF-N-Ef/view?usp=sharing)


Timeframes: 
| Component                       | Priority | Estimate Time | Time Invested | Actual Time |
| ------------------------------- | :------: | :-----------: | :-----------: | :---------: |
| Setting Up Basic Layout         | H        | 2 Hr          | TBD           | TBD         |
| Accessing API                   | H        | 3 Hr          | TBD           | TBD         |
| JS API Initial Get Request      | H        | 3 Hr          | TBD           | TBD         |
| Parsing API Data                | H        | 3 Hr          | TBD           | TBD         |
| Creating HTML Elements          | H        | 3 Hr          | TBD           | TBD         |
| JS DOM Data Appends             | H        | 3 Hr          | TBD           | TBD         |
| JS DOM Image Appends            | H        | 3 Hr          | TBD           | TBD         |
| Clear Screen/Reset Page         | M        | 3 Hr          | TBD           | TBD         |
| CSS Styling DESKTOP             | H        | 3 Hr          | TBD           | TBD         |
| CSS Styling MOBILE              | H        | 3 Hr          | TBD           | TBD         |
| POST MVP - External Links       | L        | 3 Hr          | TBD           | TBD         |
| Testing API call(s)             | H        | 3 Hr          | TBD           | TBD         |
| Testing CSS breakpoints         | M        | 2 Hr          | TBD           | TBD         |
| Hosting Final Product           | M        | 3 Hr          | TBD           | TBD         |
| Total Time                      |          | 40 Hrs        |               |             |

