
const actorMagic = {};

actorMagic.playerOne = {};
actorMagic.playerOne.hand = [];
actorMagic.playerOneTotal = 0;

actorMagic.playerTwo = {};
actorMagic.playerTwo.hand = [];
actorMagic.playerTwoTotal = 0;

actorMagic.startGame = function(){
    $('.startGame').on ('click', function(e){
        e.preventDefault();
        $('.instructions').addClass('hidden');
    });
}


// take a query from user 1, store and pass on to ajax request
actorMagic.submitActOne = function(){
    $('#playerOneActorForm').on ('submit', function(e){
        e.preventDefault();
        let nameInput1 = $('input[name=entryOne').val();
        actorMagic.getPlayerInfoOne(nameInput1)
            .then(function (res) {
                if (res.results.length === 0) {
                    alert('No results for that Actor. Choose again or check the spelling.');
                } else {
                    let actorName = res.results[0].name;
                    let actorImage = res.results[0].profile_path;
                    actorMagic.displayCharacterOne(actorName, actorImage);
                    // Two things happening here. passing along the details of actor name and image. AND passing along the Actor ID to be used in the GETMOVIES function / ajax. 
                    actorMagic.getMoviesOne(res.results[0].id)
                        .then(function (filmRes) {
                            // select 3 random movies featuring the actor.
                            // push the info from these movies (objects) to an array that will be the users 'hand' 
                            for (let i = 0; i < 3; i = i + 1) {
                                const randomIndex = Math.floor(Math.random() * filmRes.results.length);
                                actorMagic.playerOne.hand.push(filmRes.results[randomIndex]);
                            };

                            console.log(actorMagic.playerOne.hand);

                        });
                }        
            });
    });
}

// make ajax request for actor info based on above submission data
actorMagic.getPlayerInfoOne = function(actorChoice){
    return $.ajax({
        url: 'https://api.themoviedb.org/3/search/person',
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: '919e0920741fba41375054dc31ad1330',
            query: actorChoice
        }
    });
};

// display actor name & image
actorMagic.displayCharacterOne = function (actorName, actorImage){
    $('.playerOne h3').text(actorName);
    $('.playerOne img').attr(`src`,`https://image.tmdb.org/t/p/w640${actorImage}`);
    $('#dealCardsOne').removeClass('hidden');
    $('.playerOne__frame p').addClass('hidden');
};    

// using the actor ID from actor data, make new ajax request for all the Actors movies. 
actorMagic.getMoviesOne = function (actorId) {
    return $.ajax({
        url: 'https://api.themoviedb.org/3/discover/movie',
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: '919e0920741fba41375054dc31ad1330',
            with_cast: actorId
        }
    });
        
}; 
// take a button input to get your ‘cards’
console.log(actorMagic.playerOne.hand);
actorMagic.getCardsOne = function(){
    $('#dealCardsOne').on('submit', function (e) {
        e.preventDefault();
        $('#dealCardsOne').addClass('hidden');
        actorMagic.getTitlesOne(actorMagic.playerOne.hand);
    });
};
// take an array of 3 movie objects and create an array of just the 3 titles
actorMagic.getTitlesOne = function(handArray){
    
    const handTitles = handArray.map(function(movie){
        return movie.title
    })
     // pass the three titles into the display hand function
    actorMagic.displayHandOne(handTitles[0], handTitles[1], handTitles[2]); 
};

// display your cards on the page
actorMagic.displayHandOne = function(m1, m2, m3){
    $('.playerOne__hand').append(`<li><a id="card1" data-index="0" href="">${m1}</a></li>`);
    $('.playerOne__hand').append(`<li><a data-index="1" href="">${m2}</a></li>`);
    $('.playerOne__hand').append(`<li><a data-index="2" href="">${m3}</a></li>`);

};


// ----------------------------
//_____ REPEAT FOR PLAYER 2_____
// -----------------------------


// // take a query from user 2, store and pass on to ajax request
actorMagic.submitActTwo = function () {
    $('#playerTwoActorForm').on('submit', function (e) {
        e.preventDefault();
        let nameInput = $('input[name=entryTwo').val();
        actorMagic.getPlayerInfoTwo(nameInput)
        // target the name, image and movies of that actor
            .then(function (res) {
                if (res.results.length === 0) {
                    alert('No results for that Actor. Choose again or check spelling');
                } else {
                    let actorName = res.results[0].name;
                    let actorImage = res.results[0].profile_path;
                    actorMagic.displayCharacterTwo(actorName, actorImage);
                        // Two things happening here. passing along the details of actor name and image. AND passing along the Actor ID to be used in the GETMOVIES function / ajax. 
                        actorMagic.getMoviesTwo(res.results[0].id)
                        // select 3 random movies featuring the actor.
                        // push the info from these movies (objects) to an array that will be the users 'hand' 
                            .then(function (filmRes) {
                                if (filmRes.results.length < 3) {
                                    // if the actor has less than 3 movies and can't fill a hand
                                    alert ('Choose an actor with more film credits')
                                    } else {
                                        for (let i = 0; i < 3; i = i + 1) {
                                            const randomIndex = Math.floor(Math.random() * filmRes.results.length);
                                            actorMagic.playerTwo.hand.push(filmRes.results[randomIndex]);
                                        };
                                    };

                                
                            });
                    }
                });
    });

}
// // make ajax request for actor info based on above submission data 
actorMagic.getPlayerInfoTwo = function (actorChoice) {
    return $.ajax({
        url: 'https://api.themoviedb.org/3/search/person',
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: '919e0920741fba41375054dc31ad1330',
            query: actorChoice
        }
    });
};

// // display actor name & image
actorMagic.displayCharacterTwo = function (actorName, actorImage) {
    $('.playerTwo h3').text(actorName);
    $('.playerTwo img').attr(`src`, `https://image.tmdb.org/t/p/w640${actorImage}`);
    $('#dealCardsTwo').removeClass('hidden');
    $('.playerTwo__frame p').addClass('hidden');
};

// // using the actor ID from actor data, make new ajax request for all the Actors movies. 
actorMagic.getMoviesTwo = function (actorId) {
    return $.ajax({
        url: 'https://api.themoviedb.org/3/discover/movie',
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: '919e0920741fba41375054dc31ad1330',
            with_cast: actorId
        }
    });

};

// // take a button input to get your ‘cards’
console.log(actorMagic.playerTwo.hand);
actorMagic.getCardsTwo = function () {
    $('#dealCardsTwo').on('submit', function (event){
        event.preventDefault();
        $('#dealCardsTwo').addClass('hidden');
        actorMagic.getTitlesTwo(actorMagic.playerTwo.hand);
    });
};
// // take an array of 3 movie object and spit out array of 3 titles
actorMagic.getTitlesTwo = function (handArray) {

    let handTitlesTwo = handArray.map(function (movieTwo) {
        return movieTwo.title;
    })
    // pass the three titles into the display hand function
    actorMagic.displayHandTwo(handTitlesTwo[0], handTitlesTwo[1], handTitlesTwo[2]);
};

// // display your cards on the page
actorMagic.displayHandTwo = function (m1, m2, m3) {
    console.log
    $('.playerTwo__hand').append(`<li><a data-index="0" href="">${m1}</a></li>`);
    $('.playerTwo__hand').append(`<li><a data-index="1" href="">${m2}</a></li>`);
    $('.playerTwo__hand').append(`<li><a data-index="2" href="">${m3}</a></li>`);
};


// ----------------------------
// ----BEGINING OF GAMEPLAY-----
// -----------------------------

// Start Round 1 of Game

// player 1 choose movie
actorMagic.playCardOne = function(){
    
    $('.playerOne__hand').on ('click', `a`, function(e){
        e.preventDefault();
        actorMagic.showCardOne(this.dataset.index);
        $('.cardPlaceholder').addClass('hidden');
        $(this).addClass('hidden');
        $('.reveal').removeClass('hidden');
        // pass the data-index of the clicked link on to the show function
    });   
    
};

actorMagic.showCardOne = function(cardNumber){


    $('.playerOne__cardPlayed img').attr('src', `https://image.tmdb.org/t/p/w640${actorMagic.playerOne.hand[cardNumber].poster_path}`);

    $('.playerOne__cardPlayed h4').text(actorMagic.playerOne.hand[cardNumber].title);

    $('.playerOne__cardPlayed h2')
        .text(actorMagic.playerOne.hand[cardNumber].vote_average)
        .data(`data`, actorMagic.playerOne.hand[cardNumber].vote_average)

}

// player 2 choose movie

actorMagic.playCardTwo = function () {
    
    $('.playerTwo__hand').on('click', `a`, function (e) {
        e.preventDefault();
        actorMagic.showCardTwo(this.dataset.index);
        console.log(this.dataset.index);
        $(this).addClass('hidden');
        $('.cardPlaceholder').addClass('hidden');
        $('.reveal').removeClass('hidden');
        // pass the data-index of the clicked link on to the show function
    });
    
};

// display the played card info.
actorMagic.showCardTwo = function (cardNumber) {

    $('.playerTwo__cardPlayed img').attr('src', `https://image.tmdb.org/t/p/w640${actorMagic.playerTwo.hand[cardNumber].poster_path}`);

    $('.playerTwo__cardPlayed h4').text(actorMagic.playerTwo.hand[cardNumber].title);

    $('.playerTwo__cardPlayed h2')
        .text(actorMagic.playerTwo.hand[cardNumber].vote_average)
        .data('data', actorMagic.playerTwo.hand[cardNumber].vote_average);
}

// reveal the user rating.
$('.reveal').on('click', function(e){
    $('.reveal').addClass('hidden');
    $('.nextRound').removeClass('hidden');

    e.preventDefault();
    let playCheck = $('.cardPlayedFrame img').attr('src');
    console.log (playCheck);
    if (playCheck === ''){
        alert ('Please play both cards first.')
    } else {
        $('.rating').fadeIn('slow')
    
        let score1 = $('.playerOne__cardPlayed h2').data().data;
        let score2 = $('.playerTwo__cardPlayed h2').data().data;
        actorMagic.roundWinner(score1, score2);
    }
});

// display the winner
// display score.
actorMagic.roundWinner = (score1, score2) => {
        
    if (score1 > score2){
        // $('.scoreboard h1').text('Player One Wins');
        $('scoreboard h3')
        actorMagic.playerOneTotal = actorMagic.playerOneTotal + 1;
        $('.playerOneTotal').val(actorMagic.playerOneTotal);
    } else if(score1 < score2){
        // $('.scoreboard h1').text('Player Two Wins');
        actorMagic.playerTwoTotal = actorMagic.playerTwoTotal + 1;
        $('.playerTwoTotal').val(actorMagic.playerTwoTotal);
    } else if(score1 === score2){
        // $('.scoreboard h1').text('Draw');
    }

    actorMagic.clearTable();
}


// Clear the played cards
actorMagic.clearTable = () => {
    $('.nextRound').on('click', (e) => {
        e.preventDefault();
        
        $('.nextRound').addClass('hidden');

        $('.rating').text('').css('display','none');
        $('.cardPlayedTitle').text('');
        $('.cardPlayedImage').attr('src', '');
        
    });
    actorMagic.bigWinner();
    
};

// REPEAT GAMEPLAY...

// display final score and Winner
actorMagic.bigWinner = () => {

    console.log ($('.playerOneTotal').val());

    let finalTotalOne = $('.playerOneTotal').val();
    let finalTotalTwo = $('.playerTwoTotal').val();

    if (finalTotalOne === '2') {
        console.log('1 win');
        $('.winner h3').text($('.playerOne h3').text());
        $('.winner').toggleClass('hidden');
    } else if (finalTotalTwo === '2'){
        console.log('2 win')
        $('.winner h3').text($('.playerTwo h3').text());
        $('.winner').toggleClass('hidden');
    } 

    actorMagic.playAgain();
};
// play again button clears all inputs but keeps the score running.

actorMagic.playAgain = () => {
    $('.playAgain').on('click', (e) => {
        e.preventDefault();
        // hide winner window
        $('.winner').fadeOut('slow');
        // reset character info
        $('.player h3').text('Choose a New Deck');
        $('.player img').attr('src', 'images/coatOfArms.svg');
        $('.player .actorForm input').val('');
        // reset hand on page
        $('.hand button').fadeIn('slow');
        $('.hand ul').empty();
        $('.hand ul a').removeClass('hidden');
        // reset 'get cards' button
        // $('#dealCardsOne').removeClass('hidden');
        // $('#dealCardsTwo').removeClass('hidden');
        // reset table
        $('.rating').text('').css('display', 'none');
        $('.cardPlayedTitle').text('');
        $('.cardPlayedImage').attr('src', '');
        // clear out contents of the .hand arrays
        actorMagic.playerOne.hand = [];
        actorMagic.playerTwo.hand = [];
        // hide the gameplay buttons
        $('nextRound').addClass('hidden');
        // reveal the New Deck button
        $('.newDeck').removeClass('hidden');
    })
};

actorMagic.continuePlay = function() {
    $('.newDeck').on('click', (e) => {
        e.preventDefault();
        // reset character info
        $('.player h3').text('Choose a New Deck');
        $('.player img').attr('src', 'images/coatOfArms.svg');
        $('.player .actorForm input').val('');
        // reset hand on page
        $('.hand button').fadeIn('slow');
        $('.hand ul').empty();
        $('.hand ul a').removeClass('hidden');
        // reset 'get cards' button
        // $('#dealCardsOne').removeClass('hidden');
        // $('#dealCardsTwo').removeClass('hidden');
        // reset table
        $('.rating').text('').css('display', 'none');
        $('.cardPlayedTitle').text('');
        $('.cardPlayedImage').attr('src', '');
        // clear out contents of the .hand arrays
        actorMagic.playerOne.hand = [];
        actorMagic.playerTwo.hand = [];
        // hide the gameplay buttons
        $('nextRound').addClass('hidden');
        // reveal the New Deck button
        $('.newDeck').removeClass('hidden');
    })
}


actorMagic.events = function () {
    actorMagic.submitActOne();
    actorMagic.getCardsOne();
    actorMagic.playCardOne();
    
    
    actorMagic.submitActTwo();
    actorMagic.getCardsTwo();
    actorMagic.playCardTwo();

    actorMagic.continuePlay();
};    

actorMagic.init = function () {
    actorMagic.events();
    actorMagic.startGame();
};

$(document).ready(function () {
    actorMagic.init();
});