DrawApi = function () {
    this.init = function (ctx) {
        this.ctx = ctx;
        ctx.fillStyle = 'rgba(0,0,0,1)';
        this.width = ctx.canvas.width;
        this.width4 = ctx.canvas.width * 4;
        this.height = ctx.canvas.height;
        ctx.clearRect(0, 0, this.width , this.height);
        ctx.fillRect(0, 0, this.width , this.height);
        this.imgd = ctx.getImageData(0, 0, this.width, this.height);
        this.pix = this.imgd.data;
    }
    this.render = function(){
        this.preRender();
        this.ctx.putImageData(this.imgd, 0, 0);
    }
    this.setPixel = function (x, y, c) {
        this.pix[ 4 * this.width * y + x * 4] = c.r;
        this.pix[ 4 * this.width * y + x * 4 + 1] = c.g;
        this.pix[ 4 * this.width * y + x * 4 + 2] = c.b;
    };
    this.getPixel = function (x, y) {
        return {
            r: this.pix[ 4 * this.width * y + x * 4],
            g: this.pix[ 4 * this.width * y + x * 4 + 1],
            b: this.pix[ 4 * this.width * y + x * 4 + 2]
        }
    };
    this.clear = function() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this.setPixel( i, j, 0);
            }
        }
        
    };
    //general API 
    this.triangleSE = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < i; j++) {
                this.setPixel(x + j, y + i, color);
            }
        }
        ;
    };
    this.triangleNW = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < i; j++) {
                this.setPixel(x + i, y + j, color);
            }
        }
        ;
    };
    this.triangleNE = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < i; j++) {
                this.setPixel(x + size - j, y + i, color);
            }
        }
        ;
    };
    this.triangleSW = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size - i; j++) {
                this.setPixel(x + i, y + j, color);
            }
        }
        ;
    };
     this.S = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
                this.setPixel(x, y + i, color);
        }
    };
     this.N = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
                this.setPixel(x, y - i, color);
        }
    };
     this.E = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
                this.setPixel(x + i, y, color);
        }
    };
     this.W = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
                this.setPixel(x - i, y, color);
        }
    };
    this.SW = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.setPixel(x - i, y + i, color);
        }
        
    };
    this.NW = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.setPixel(x - i, y - i, color);
        }
        
    };
    this.NE = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.setPixel(x + i, y - i, color);
        }
        
    };
    this.SE = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
             this.setPixel(x + i, y + i, color);
        }
        
    };
    this.preRender = function() {
        var ac = {r: 0, g: 0, b: 0};
        var state = 0;
        for (var i = 0; i < this.width; i++) {
            ac = {r: 0, g: 0, b: 0};
            for (var j = 0; j < this.height; j++) {
                if(i === 100 && j === 200){
                    console.log("w");
                }
                c = this.getPixel(i, j);
                if(c.r === 0) { // if empty        
                     if(state === 3)
                         ac = {r: 0, g: 0, b: 0};        
                     this.setPixel( i, j, ac);
                     state = 2;
                } else {
                    if(ac.r === c.r) {
                       if(state === 2) {
                            ac = {r: 0, g: 0, b: 0};
                       }
                       state = 3; // the same
                    }
                    else     
                      ac = c;  
                }
            }
        }
    }
    this.drawNESW = function ( nesw ) { 
            var position = nesw.position();
            var size = nesw.step;
            var color = nesw.color;
            for(var i =0; i < nesw.dirs.length; i++) {
                var d = nesw.dirs[i];
                this[d](position.x, position.y, size, color);
                if(d === 'N')
                    position.y -= size;
                else if(d === 'S')
                    position.y += size;
                else if(d === 'W')
                    position.x -= size;                    
                else if(d === 'E')
                    position.x += size;            
                else if(d === 'SE') {
                    position.x += size;
                    position.y += size;
                }    
                else if(d === 'NE') {
                    position.x += size;
                    position.y -= size;
                }    
                else if(d === 'SW') {
                    position.x -= size;
                    position.y += size;
                }   
                else if(d === 'NW') {
                    position.x -= size;
                    position.y -= size;
                }                     

             }
    }
  
  
}



