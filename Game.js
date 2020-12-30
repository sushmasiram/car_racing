class Game{
    constructor(){
        this.vis = 255

    }

    getState(){
        var gameStateRef = database.ref("gameState");
        
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })

    }

    update(x){    
        database.ref('/').update({
            "gameState": x
        })
    }

    async start(){
      
        if(gameState === 0){
           
            player = new Player()
            var playerCountRef = await database.ref('playerCount').once("value")
             if(playerCountRef.exists()){
                playerCount = playerCountRef.val()
                player.getCount()
             }

            form = new Form()
            form.display()
        }

        car1 = createSprite(470,650,20,50);
        car1.addImage(car1Img);
        car2 = createSprite(570,650,20,50);
        car2.addImage(car2Img);
        /*car3 = createSprite(670,650,30,50);
        car3.addImage(car3Img);
        car4 = createSprite(770,650,30,50);
        car4.addImage(car4Img);*/
        cars = [car1,car2]
    }

    play(){
        
        form.hideElements()
        image(bg,0, -900*12.8, displayWidth, 900*15)
        
        image(track, 300, -900*12.8, displayWidth/2, 900*15);
        Player.getPlayerInfo()
        player.getCarsAtEnd();
        var index = 0;//array index

        var x=380,y=0;
        var pos = camera.position.y-300;
        push()
        textSize(20);
        textStyle(BOLDITALIC); 
        fill("Black")
        
        textAlign(CENTER);
        text("Player    Distance \n", displayWidth-200, pos); 
        pop()
        for(var plr in allPlayers){
          
            x = x+ 100;
            y = displayHeight - allPlayers[plr].distance + 800
            cars[index].x = x
            cars[index].y = y
    
            if(player.index === index+1){
                fill("red")
                push()
                stroke(10);
                
                ellipse(x,y,60,60)
                pop()
                camera.position.x = displayWidth/2
                camera.position.y = cars[index].y 
                             

            } else{
                fill("white")
            }  
              
            pos = pos + 30;                      
            
            stroke("white"); 
            
            text(allPlayers[plr].name +"   " + Math.round(allPlayers[plr].distance),displayWidth-250, pos)
             //+  "   "  + player.time+ "\n", displayWidth-250, pos);   
            push()
            textAlign(CENTER);
            textSize(20);
            text(allPlayers[plr].name, cars[index].x, cars[index].y + 75);
            pop()
            
            if(allPlayers[plr].rank !== 0){
                push()
                textSize(40)
                text(allPlayers[plr].rank, cars[index].x, cars[index].y + 125);
                pop()
                if(allPlayers[plr].rank === 1){
                    push()
                    fill("yellow")
                    fill(255,this.vis)
                    
                    textSize(25)
                    text("WINNER",cars[index].x, cars[index].y - 100)
                    //image(starImg, cars[index].x-50, cars[index].y - 150,50,50)
                    pop()
                    this.vis = this.vis - 10
                    if(this.vis < 0){
                        this.vis = 255
                    }
                }
            }           
            
            index = index+1                
        }

        if(keyDown("up") && player.ended === false && player.distance<12500){
            player.distance +=100
            player.update();
        }
        
        
        if(player.distance >= 12500 && player.ended === false){       
                       
            carsAtEnd++
                
            player.updateRank(carsAtEnd)
            Player.updateCarsAtEnd(carsAtEnd)
            player.ended = true
        }

         if(carsAtEnd === 2){
             game.update(2)
         }
      
      drawSprites()
    }
    end(){
        camera.position.x = 0
        camera.position.y = 0
        
        var endMsg = createElement('h1')
        endMsg.position(displayWidth/2-100 ,displayHeight/2-300)
        endMsg.style.color = "white"
        endMsg.html("GAME OVER! CLICK ON RESET TO PLAY AGAIN!!")
        /*textSize(100)
        fill('black');
        text("GAME OVER! CLICK ON RESET TO PLAY AGAIN!!", displayWidth/2-100 ,displayHeight/2-300)*/
                   
    
}
       
    
  
      
}