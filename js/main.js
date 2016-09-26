var game = {
  startDate: null,
  rounds: [],
  dice: null,
  btn: null,
  tries: 0,

  getDice: function () {
    this.dice = (document.getElementsByClassName("die"));
  },

  roll: function() {
    for (var i = 0; i < this.dice.length; i++) {
      this.dice[i].innerHTML = Math.ceil(Math.random() * 6);
    }
  },

  postToPage: function(message, destinationID) {
    document.getElementById(destinationID).innerHTML = message;
  },

  formatDate: function(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var aorpm = 'AM';
    if (hours > 12) {
      hours -= 12;
      aorpm = 'PM';
    }

    if (month < 10) {
      month = "0" + month;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var timeStamp = month + '/' + day + ' ' + hours + ":" + minutes + " " + aorpm;

    return timeStamp;
  },

  round: function() {
    //increment tries:
    this.tries++;

    //roll dice
    this.roll();

    //calculate total
    var total = 0;
    for (var i = 0; i < this.dice.length; i++) {
      total += Number(this.dice[i].innerHTML);
    };

    //check dice total
    if (total === 7 || total === 11) {
      // display WIN message
      this.postToPage("I GUESS YA WON!", 'message');
      //calculate time
      date = new Date();
      elapsedTime = Math.round((date - this.startDate) / 1000);
      // display STATS
      if (this.tries < 3) {
        this.postToPage("You won in " + this.tries + " tries and " + elapsedTime + " seconds! Dumb luck!", 'stats');
      } else {
        this.postToPage("You won in " + this.tries + " tries and " + elapsedTime + " seconds! Pathetic.", 'stats');
      }
      // push number of tries and date to round array
      var roundData = {
        tries: this.tries,
        date: this.formatDate(this.startDate)
      }; // WHAT DO WE USE THIS FOR? JUST FOR KICKS??
      this.rounds.push(roundData);
      // reset tries
      this.tries = 0;
      // get startdate for next round
      this.startDate = new Date();
    } else if (total === 2) { // easter egg!
      this.postToPage("SNAKE EYES!", 'message');
      this.postToPage("<i class=\"em em-skull\"></i>TIME 2 DIE LOL<i class=\"em em-skull\"></i>", 'stats');
    } else {
      // display TRY AGAIN
      this.postToPage("TRY AGAIN LOSER!", 'message');
      this.postToPage('', 'stats');
    }
  },
  init: function() {
    this.getDice();
    this.btn = document.getElementById('rollButton');
    this.btn = document.addEventListener('click', this.round.bind(this));
    // get the date
    this.startDate = new Date();
    // print date at footer
    document.getElementById('timeStamp').innerHTML = "Game Started at: " + this.formatDate(this.startDate);
  }
}

game.init();
// var dice = document.getElementsByClassName("die");
