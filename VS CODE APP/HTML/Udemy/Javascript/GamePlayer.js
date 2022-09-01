
var GamePlayer = function(name, livesLeft, score, speed, gridLocationX, gridLocationY)
{
    this.name = name;
    this.livesLeft = livesLeft;
    this.score = score;
    this.speed = speed;
    this.gridLocationX = gridLocationX;
    this.gridLocationY = gridLocationY;
}
    GamePlayer.prototype.die = function()
    {
        
       alert("You are dead...");
        
    }
    GamePlayer.prototype.moveLeft = function()
    {
        if(this.gridLocationY>0)
        {
            this.gridLocationY--;
        }else
        {
            alert("You are falling and losing one of your lives..");
            this.livesLeft--;
            if(this.livesLeft==0)
            {
                this.die();
            }

        }
    }
    GamePlayer.prototype.moveRight = function()
    {
        if(this.gridLocationY<10)
        {
            this.gridLocationY++;
        }else
        {
            alert("You are falling and losing one of your lives..");
            this.livesLeft--;
            if(this.livesLeft==0)
            {
                this.die();
            }
        }
    }
    GamePlayer.prototype.moveUp = function()
    {
        if(this.gridLocationX>0)
        {
            this.gridLocationX--;
        }else
        {
            alert("You are falling and losing one of your lives..");
            this.livesLeft--;
            if(this.livesLeft==0)
            {
                this.die();
            }
        }
    }
    GamePlayer.prototype.moveDown = function()
    {
        if(this.gridLocationX<10)
        {
            this.gridLocationX++;
        }else
        {
            alert("You are falling and losing one of your lives..");
            this.livesLeft--;
            if(this.livesLeft==0)
            {
                this.die();
            }
        }
    }
