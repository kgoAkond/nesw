DrawApi = function () {
    this.init = function (ctx) {
        this.ctx = ctx;
        ctx.fillStyle = 'rgba(0,0,0,1)';
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
        ctx.clearRect(0, 0, this.width , this.height);
        ctx.fillRect(0, 0, this.width , this.height);
        this.imgd = ctx.getImageData(0, 0, this.width, this.height);
        this.pix = this.imgd.data;
        this.grid = new Int8Array(this.width * this.height);
        this.debug = false;
     }
    this.clear = function(){
       for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
               //this.setPixel(i,j,0); 
               this.mark(i,j,0); 
            }
        }
        
    }
    this.render = function(){        
        //this.renderGridDebug();
        this.renderGrid();
        this.ctx.putImageData(this.imgd, 0, 0);
    }
    this.setPixel = function (x, y, c) {
        this.pix[4 * this.width * y + x * 4 ] = c;
        this.pix[4 * this.width * y + x * 4 + 1] = c;
        this.pix[4 * this.width * y + x * 4 + 2] = c;
    };
    this.getPixel = function (x, y) {
        return this.pix[ 4 * this.width * y + x * 4 ];
    };
    this.mark = function (x, y, c) {
         this.grid[ y * this.width + x ] = c;
         if( this.debug === true) {
            this.setPixel( x, y, c);
         }
    };
    this.getMark = function (x, y) {
        return this.grid[ y * this.width + x ];
    };
    this.renderGridDebug = function() {
        var shapeId = 0;
        var color = 0;
        for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
                shapeId = this.getMark(i, j);
                color = this.getColor( shapeId );
                this.setPixel( i, j, color);                                               
            }
        }
    }  
     this.renderGrid = function() {
        var shapeId = 0;
        var mark = false;
        var color = 0;
        for (var j = 0; j < this.height; j++) {
            currentId = 0;
            color = 0;
            for (var i = 0; i < this.width; i++) {
                shapeId = this.getMark(i, j);
                if(shapeId < 0){
                   color = this.getColor( shapeId );
                } else if(shapeId > 0) {
                      color = this.getColor( shapeId );   
                      mark = !mark
                    
                } else {
                    if(!mark) {
                        color = 0;
                    }
                }
                this.setPixel( i, j, color);                               
                
            }
        }
    }     
    this.getColor = function( id ) {
        if( id > 0)
            return id;
        if( id < 0)
            return 255;
        return 0;
    }
     this.S = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
            this.mark(x, y + i, color);
        }
    };
     this.N = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
                this.mark(x, y - i, color);
        }
    };
     this.E = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.mark(x + i, y, -color);
        }
        if( this.debug === true) {
            this.setPixel( x + 0, y, 200);
            this.setPixel( x + size - 1 , y, 200);
        }
    };
     this.W = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.mark(x - i, y, -color);                
        }
        if(this.lastDir === 'SW') {
            this.mark(x, y, color);
        }
        if( this.debug === true) {
            this.setPixel( x - 0, y, 200);
            this.setPixel( x - size + 1 , y, 200);
        }
    };
    this.SW = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.mark(x - i, y + i, color);
        }
        if(this.lastDir === 'W') {
            this.mark(x, y, -color);
        }
        if( this.debug === true) {
            this.setPixel( x - 0, y + 0, 255);
            this.setPixel( x - size + 1 , y + size - 1, 255);
        }
        
    };
    this.NW = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.mark(x - i, y - i, color);
        }
        if(this.lastDir === 'SW') {
            this.mark(x, y, -color);
        }
        if( this.debug === true) {
            this.setPixel( x - 0, y - 0, 255);
            this.setPixel( x - size + 1 , y - size + 1, 255);
        }
        
    };
    this.NE = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.mark(x + i, y - i, color);
        }     
        if(this.lastDir === 'E') {
            this.mark(x, y, -color);
        }

        if( this.debug === true) {
            this.setPixel( x + 0, y - 0, 255);
            this.setPixel( x + size - 1 , y - size + 1, 255);
        }
        
    };
    this.SE = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.mark(x + i, y + i, color);
        }
        if(this.lastDir === 'NE' || this.lastDir === 'E') {
            this.mark(x, y, -color);
        }

        if( this.debug === true) {
            this.setPixel( x + 0, y + 0, 255);
            this.setPixel( x + size - 1 , y + size - 1, 255);
        }
        
    };
    this.drawNESW = function ( nesw ) { 
            var position = nesw.position();
            var size = nesw.step;
            var color = 100;
            for(var i =0; i < nesw.dirs.length; i++) {
                var d = nesw.dirs[i];
                this[d](position.x, position.y, size, color);
                this.lastDir = d;
                var s = size;
                if(d === 'N')
                    position.y -= s;
                else if(d === 'S')
                    position.y += s;
                else if(d === 'W')
                    position.x -= s;                    
                else if(d === 'E')
                    position.x += s;            
                else if(d === 'SE') {
                    position.x += s;
                    position.y += s;
                }    
                else if(d === 'NE') {
                    position.x += s;
                    position.y -= s;
                }    
                else if(d === 'SW') {
                    position.x -= s;
                    position.y += s;
                }   
                else if(d === 'NW') {
                    position.x -= s;
                    position.y -= s;
                }                   

             }
             
    };

    
}



