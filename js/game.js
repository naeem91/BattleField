window.onload = function()
{
	game.loadView();	
}
var game =
{
	
	loadView:function()
	{
		
		game.field = document.createElement('img');
		game.start = document.createElement('span');
		game.help = document.createElement('span');
		game.field.src="images/start.jpg";
		game.start.id = "start";
		game.help.id="help";
		game.gameView = document.getElementById('game-view');
		game.gameView.appendChild(game.field);
		game.gameView.appendChild(game.start);
		game.gameView.appendChild(game.help);
		
		game.scoreView = document.getElementById('score-view');
		starthelp = document.createElement('img');
		starthelp.src = "images/starthelp.jpg";
		game.scoreView.appendChild(starthelp);
		
		game.help.onclick = function()
		{
			alert("Created by: Naeem Ilyas");
		}
		
		game.start.onclick= gamePlay.play;		
	}
};
var scoreBoard = 
{
	score:0,
	gameStatus:'playing',
	createBoard:function()
	{
		scoreBoard.playerScore = document.createElement('p');
		scoreBoard.playerScore.innerHTML = "Score: <span class='score'>" + scoreBoard.score + "</span>";
		scoreBoard.yourLife = document.createElement('p');
		scoreBoard.yourLife.innerHTML = "Life: <br />";
		
		scoreBoard.jets = [];
		for(var i = 1; i<=3; i++)
		{
			scoreBoard.jets[i] = document.createElement('img');
			scoreBoard.jets[i].src = "images/ship.gif";
			scoreBoard.jets[i].width = "50";
			scoreBoard.jets[i].height = "25";
			scoreBoard.yourLife.appendChild(scoreBoard.jets[i]);
		}
		scoreBoard.pLife = document.createElement('p');
		scoreBoard.pLife.innerHTML = "Plane Life: <br />";
		scoreBoard.planes = [];
		for(var i=1;i<=10;i++)
		{
			scoreBoard.planes[i] = document.createElement('img');
			scoreBoard.planes[i].src = "images/plane2.png";
			scoreBoard.planes[i].width="30";
			scoreBoard.planes[i].height="30";
			scoreBoard.pLife.appendChild(scoreBoard.planes[i]);  
		}
		
		
		scoreBoard.gStatus = document.createElement('p');
		scoreBoard.gStatus.innerHTML = "Status: "+ scoreBoard.gameStatus;
		
		scoreBoard.restartButton = document.createElement('input');
		scoreBoard.restartButton.type = "button";
		scoreBoard.restartButton.value = "Restart Game";
		scoreBoard.restartButton.addEventListener('click',restart.restart,scoreBoard.restartButton);
		
		
				
		game.scoreView.appendChild(scoreBoard.playerScore);
		game.scoreView.appendChild(scoreBoard.yourLife);
		game.scoreView.appendChild(scoreBoard.pLife);
		game.scoreView.appendChild(scoreBoard.gStatus);
		game.scoreView.appendChild(scoreBoard.restartButton);
	},
	updateScore:function()
	{
		scoreBoard.playerScore.innerHTML = "";
		scoreBoard.score += 10;
		scoreBoard.playerScore.innerHTML = "Score: <span class='score'>" + scoreBoard.score + "</span>";
		scoreBoard.updatePlaneLife();
	},
	updatePlaneLife:function()
	{
		scoreBoard.pLife.removeChild(scoreBoard.planes[plan.life]);
	},
	updateJetLife:function()
	{
		scoreBoard.yourLife.removeChild(scoreBoard.jets[jet.life]);
	},
	updateStatus:function()
	{
		scoreBoard.gStatus.innerHTML = "";
		scoreBoard.gStatus.innerHTML = "Status: "+scoreBoard.gameStatus;
	}
}
var gamePlay =
{
	
	play:function()
	{
		
		game.scoreView.removeChild(starthelp);
		game.gameView.removeChild(game.field);
		game.gameView.removeChild(game.start);
		game.gameView.removeChild(game.help);
		bg = document.createElement('img');
		bg.src="images/field4.jpg";
		bg.width="700";
		bg.height="500";
		game.gameView.appendChild(bg);
		
		scoreBoard.createBoard();
		plan.createNewPlane();
		jet.createNewJet();
		
		plan.fly();
		jet.controlKeys();
	}
	
};
var restart = 
{
	handleRestart:function()
	{
		gameControl.startNew.onclick = function()
		{
			window.location.reload();
		}
	},
	restart:function()
	{
		window.location.reload();
	}
}
var gameControl =
{
	winLose:function()
	{
		if(jet.life == 0 && plan.life > 0)
		{
			plan.life = 0;	
			plan.alive = 0;		
			gameControl.removeScene();
			game.gameView.removeChild(plan.curPlane);			
			loseMsg = document.createElement('img');
			loseMsg.src="images/youlose2.jpg";	
			game.gameView.appendChild(loseMsg);
			
			scoreBoard.gameStatus = "You Lose!";
			scoreBoard.updateStatus();		
		}
		else if(plan.life == 0 && jet.life > 0)
		{
			jet.life = 0;
			jet.alive = false;
			gameControl.removeScene();			
			game.gameView.removeChild(jet.curJet);
			var winMsg = document.createElement('img');
			winMsg.src = "images/youwon2.jpg";
			winMsg.style.width = "650";
			winMsg.style.height = "480";
			game.gameView.appendChild(winMsg);
			
			scoreBoard.gameStatus = "You Won!";
			scoreBoard.updateStatus();	
		}
		else
		{
		}
		
		gameControl.startNew = document.createElement('span');
		gameControl.startNew.id = "winlose";
		game.gameView.appendChild(gameControl.startNew);
					
		restart.handleRestart();
	},
	removeScene:function()
	{		
		game.gameView.removeChild(bg);	
		game.gameView.removeChild(planeF);
	},
	
}
var plan = 
{
		xcords:0,
		ycords:0,
		alive:true,
		curPlane:null,
		life:10,
		fly:function()
		{
			plan.xcords = -300;
			plan.ycords = 60;
			function animate()
			{	
				plan.xcords += 1.5;
				plan.curPlane.style.right=plan.xcords+"px";
				if(plan.xcords < 690 && plan.alive == true)
				{
					if(planeFire.planeFiring == false)
						planeFire.fire(plan.xcords);
						
					setTimeout(animate,8);	
				}
				else 
				{
					if(plan.life > 0)
					{
						plan.createNewPlane();
						plan.alive = true;
						plan.fly();
					}
					else
						gameControl.winLose();
				}
			}
			animate();					
		},
		createNewPlane:function()
		{
			plan.curPlane = document.createElement('img');
			plan.curPlane.src="images/plane2.png";
			plan.curPlane.width="200";
			plan.curPlane.height="200";
			plan.curPlane.style.position = "absolute";
			plan.curPlane.style.right="-300px";
			plan.curPlane.style.top="10px";
			game.gameView.appendChild(plan.curPlane);
		}
};
var jet = 
{
	gunPosition:270,
	alive:true,
	life:3,
	curJet:null,
	createNewJet:function()
	{
		if(jet.life == 0)
		{
			gameControl.winLose();
		}
		else
		{
			jet.curJet = document.createElement('img');
			jet.curJet.src="images/ship.gif";
			/*jet.curJet.width="200";
			jet.curJet.height="200";*/
			jet.curJet.style.position = "absolute";
			jet.curJet.style.right="270px";
			jet.curJet.style.bottom="-5px";
			game.gameView.appendChild(jet.curJet);
			jet.alive = true;
			jet.gunPosition = 270;
		}
	},
	controlKeys:function()
	{
		document.onkeydown= function(event)
		{
			if(jet.alive == true)
			{
				var key = event.keyCode;
				switch(key)
				{
					case 39:
						if(jet.gunPosition > -15)
							jet.gunPosition -= 10;	
											
						jet.curJet.style.right= jet.gunPosition+"px";
						break;
					case 37:
						
						if(jet.gunPosition < 550)
							jet.gunPosition += 10;
						
						jet.curJet.style.right= jet.gunPosition+"px";
						break;
					case 32:
						if(bomb.firing == false)
							bomb.fire(jet.gunPosition);
						break;
					default:					
						break;
				}
			}
		}
	}
}
var bomb =
{
	yPos:0,
	firing:false,
	xPos:0,
	createBomb:function()
	{
		
		var b = document.createElement('img');
		b.src="images/rocket.gif";
		return b;
	},
	fire:function(gunPos)
	{
		bomb.xPos = gunPos + 50;
		rocket= bomb.createBomb();
		rocket.style.position = "absolute";
		rocket.style.height = "50px";
		rocket.style.right = bomb.xPos+"px";
		rocket.style.bottom = "50px";
		bomb.yPos = 50;
		game.gameView.appendChild(rocket);
		
		function animate()
		{	
			
			bomb.firing = true;
			bomb.yPos += 1.5;
			rocket.style.bottom = bomb.yPos+"px";
			
			if(bomb.yPos < 550)
			{
				if((bomb.xPos - plan.xcords <= 150 && bomb.xPos - plan.xcords >= 0) && bomb.yPos == 320 && plan.alive == true)
				{
						bomb.firing = false;
						plan.alive == false;
						
						scoreBoard.updateScore();
						plan.life--;
												
						blast.dhamaka(bomb.xPos,bomb.yPos);
				}
				else			
					setTimeout(animate,2);	
			}
			else
				bomb.firing = false;	
		}
		animate();
		
	}
}

var blast = 
{
	createBlast:function()
	{
		var b = document.createElement('img');
		b.src = "images/explosion3.png";
		return b;
	},
	dhamaka:function(blastX,blastY)
	{
		blastX -= 50;
		b = blast.createBlast();
		b.style.position = "absolute";
		b.style.right = blastX+"px";
		b.style.bottom = blastY+"px";
		b.width = "150";
		b.height = "150";
		game.gameView.appendChild(b);
		blast.count = 0;
		game.gameView.removeChild(rocket);
		game.gameView.removeChild(plan.curPlane);
		plan.alive = false;
		
		function removeBlast()
		{
			blast.count++;
			if(blast.count == 5)
				game.gameView.removeChild(b);
			else	
				setTimeout(removeBlast,150);
		}
		removeBlast();
	}
}

var planeFire =
{
	planeFiring:false,
	createFire:function()
	{
		var f = document.createElement('img');
		f.src = "images/plane-bomb.png";
		return f;
	},
	fire:function(planePos)
	{
		var right = plan.xcords + 100;
		planeF = planeFire.createFire();
		planeF.style.position = "absolute";
		planeF.style.height = "50px";
		planeF.style.right = right+"px";
		planeF.style.top = "90px";
		var top = 90;
		game.gameView.appendChild(planeF);
		
		function animate()
		{
			planeFire.planeFiring = true;
			top += 3;
			planeF.style.top = top+"px";
			if(top < 500)
			{
				if((right - jet.gunPosition <= 200 && right - jet.gunPosition >= 0) && top == 390 && jet.alive == true)
				{
						planeFire.planeFiring = false;
						jetBlast.blast();						
				}
				else	
					setTimeout(animate,1);
			}
			else
				planeFire.planeFiring = false;
		}
		animate();
	}
}

var jetBlast = 
{
	createBlast:function()
	{
		var b = document.createElement('img');
		b.src = "images/explosion2.png";
		return b;
	},
	blast:function()
	{
		var blast = jetBlast.createBlast();
		blast.style.position = "absolute";
		blast.style.right = jet.gunPosition+"px";
		blast.style.bottom = "-45px";
		game.gameView.appendChild(blast);
		
		jetBlast.count = 0;
		game.gameView.removeChild(jet.curJet);
		game.gameView.removeChild(planeF);
		jet.alive = false;
		scoreBoard.updateJetLife();	
		jet.life--;
			
		function removeBlast()
		{
			jetBlast.count++;
			if(jetBlast.count == 5)
				game.gameView.removeChild(blast);
			else	
				setTimeout(removeBlast,200);
		}
		removeBlast();
		
		
		
		function callCreateNewJet()
		{
			jetBlast.count++;
			if(jetBlast.count == 15)
			{		
				jetBlast.count = 0;		
				jet.createNewJet();
			}
			else
				setTimeout(callCreateNewJet,220);
		}
		callCreateNewJet();
	}
}