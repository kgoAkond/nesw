DrawApi = function () {
    var ctx,width,height,imgd,pix, scope;
    var scope = this;
    scope.init = function (ctxArg) {
        ctx = ctxArg;
        ctx.fillStyle = 'rgba(0,0,0,1)';
        width = ctx.canvas.width;
        height = ctx.canvas.height;
        ctx.clearRect(0, 0, width , height);
        ctx.fillRect(0, 0, width , height);
        imgd = ctx.getImageData(0, 0, width, height);
        pix = imgd.data;
        size = 4;
        scope.size = size;
   
     }
    scope.shapes = [];
    scope.clear = function(){
       for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
               this.setPixel(i,j, {r: 0, g: 0, b: 0});                
            }
        }
        
    }        
    
    scope.render = function( ){ 
        drawGrid( size, {r: 100 ,g: 100, b: 100});
        for(var i = 0; i < this.shapes.length; i++){    
            renderShapeTr( this.shapes[i]);
          //  renderShape( this.shapes[i] );
        }
        ctx.putImageData(imgd, 0, 0);

        
    }
    scope._render = function( ){     
        for(var i = 0; i < 40; i++){
            for(var j = 0; j < 30; j++){
                renderShapeTr( this.shapes[0], {x: 30 * i, y: 30 * j});
               // renderShape( this.shapes[i], {x: 400, y: 200} );
            }
        }
        ctx.putImageData(imgd, 0, 0);
    }
    scope.detectCollision = function(x, y) {
        for(var i = 0; i < this.shapes.length; i++){   
            if(detectShapeCollision( scope.shapes[i], x, y) !== 0 )
                return scope.shapes[i];
        }
        return null;
    }
    var detectShapeCollision = function(shape, x, y) {
        var i = Math.round( x / size - 0.5) - shape.position.x;
        var j = Math.round( y / size - 0.5) - shape.position.y;
        var tr = 0;
        if( i >=0 && j >=0 && i < shape.grid.width && j < shape.grid.height ) {
            tr = shape.getGridTr(i, j);
            /*if( tr !== 0) {
                shape.deleteGridTr(i, j);
            }*/
        }
        return tr;
    }
    var renderShape = function( shape ) {
        var pos = shape.position;
        for (var j = 0; j < shape.grid.height; j++) {
            for (var i = 0; i < shape.grid.width; i++) {
                var c = shape.getMark(i, j);
                if( c === 2) {
                    square(( i + pos.x) * size, (j + pos.y) * size,  {r: 255, g:  255, b: 255});    
                } else if( c === 3) {   
                    square(( i + pos.x) * size, (j + pos.y) * size,  {r: 255, g:  150, b: 0});                  
                } else if( c === 4) {   
                    square(( i + pos.x) * size, (j + pos.y) * size,  {r: 0, g:  255, b: 0});    
                } else if( c === -1) { //debug   
                    ssquare(( i + pos.x) * size, (j + pos.y) * size,  {r: 0, g:  0, b: 255});    
                } else if( c === 0) {   
                    square(( i + pos.x) * size, (j + pos.y) * size,  {r: 100, g:  100, b: 100});                  
                }

            }
        }
        
    }
    var renderShapeTr = function( shape) {
        var pos = shape.position;
        var c1 = shape.color;
        var c0 = {r: 0, g:  0, b: 255};
        for (var j = 0; j < shape.grid.height - 1; j++) {
            for (var i = 0; i < shape.grid.width - 1; i++) {
                var tr = shape.getGridTr(i, j);
                var c = c0;
                if( bitUtils.getBit( tr , 1) !== 0 ) {   
                     if( bitUtils.getBit( tr , 2) !== 0) {
                         c = c1;
                     } else {
                         c = c0;
                     }
                     triangle1( (i + pos.x) * size, (j + pos.y) * size, size, c );
                }
                if( bitUtils.getBit( tr , 3) !== 0 ) {   
                     if( bitUtils.getBit( tr , 4) !== 0) {
                         c = c1;
                     } else {
                         c = c0;
                     }
                     triangle2( (i + pos.x) * size, (j + pos.y) * size, size, c );
                }
                if( bitUtils.getBit( tr , 5) !== 0 ) {   
                     if( bitUtils.getBit( tr , 6) !== 0) {
                         c = c1;
                     } else {
                         c = c0;
                     }
                     triangle3( (i + pos.x) * size, (j + pos.y) * size, size, c );
                }
                if( bitUtils.getBit( tr , 7) !== 0 ) {   
                     if( bitUtils.getBit( tr , 8) !== 0) {
                         c = c1;
                     } else {
                         c = c0;
                     }
                     triangle4( (i + pos.x) * size, (j + pos.y) * size, size, c );
                }
               
            }
        }
        
    }
    
     var square = function (x, y, color) {
        var s = 4; 
        for (var i = 0; i < s; i++) {
            for (var j = 0; j < s; j++) {
                scope.setPixel(x - s/2 + j, y - s/2 + i, color);
            }
        }        
    };
    var lineY = function (y, color) {
        for (var i = 0; i < width; i++) {
            scope.setPixel(i, y, color);
        }        
    };
    var lineX = function (x, color) {
        for (var i = 0; i < height; i++) {
            scope.setPixel(x, i, color);
        }        
    };
    var drawGrid = function( s, color) {
        for(var i = 0; i < width; i+=s) {
            lineX( i, color);
        } 
        for(var i = 0; i < height; i+=s) {
            lineY( i, color);
        } 
    }
    
    var triangle4 = function (x, y, size, color) {
       var s2 =  Math.ceil( size / 2);
       for (var i = 0; i < s2; i++) {
            for (var j = i + 1; j < size - i; j++) {
                scope.setPixel(x + i, y + j, color);
            }
        }   
    };
    var triangle1 = function (x, y, size, color) {
       var s2 =  Math.ceil( size / 2);
       for (var i = 0; i < s2; i++) {
            for (var j = i; j < size - i; j++) {
                scope.setPixel(x + j, y + i, color);
            }
        }   
    };
    var triangle2 = function (x, y, size, color) {
       var s2 =  Math.ceil( size / 2);
       for (var i = s2; i < size; i++) {
            for (var j = size - i; j <= i; j++) {
                scope.setPixel(x + i, y + j, color);
            }
        }   
    };
    var triangle3 = function (x, y, size, color) {
       var s2 = Math.ceil( size / 2 ); 
       for (var i = size; i >= s2; i--) {
            for (var j = size - i; j < i; j++) {
                scope.setPixel(x + j, y + i, color);
            }
        }   
    };

    
    scope.setPixel = function (x, y, c) {
        pix[4 * width * y + x * 4 ] = c.r;
        pix[4 * width * y + x * 4 + 1] = c.g;
        pix[4 * width * y + x * 4 + 2] = c.b;
    };
    scope.getPixel = function (x, y) {
        return pix[ 4 * width * y + x * 4 ];
    };    
}



