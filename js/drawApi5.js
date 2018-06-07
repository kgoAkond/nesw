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
        size = 50;
        
     }
    scope.shapes = [];
    scope.clear = function(){
       for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
               this.setPixel(i,j, {r: 0, g: 0, b: 0});                
            }
        }
        
    }
    var offset = 0;
    scope.render = function( ){     
        //renderShapeTr( this.shapes[0], {x: 200, y: 200});
        renderShape( this.shapes[0], {x: 200, y: 200} );
        ctx.putImageData(imgd, 0, 0);
        
    }
    scope._render = function( ){     
        for(var i = 0; i < 20; i++){
            for(var j = 0; j < 15; j++){
                renderShapeTr( this.shapes[0], {x: 60 * i, y: 70 * j});
                //renderShape( this.shapes[i], {x: 400, y: 200} );
            }
        }
        ctx.putImageData(imgd, 0, 0);
    }
    var renderShape = function( shape, pos) {
        for (var j = 0; j < shape.grid.height; j++) {
            for (var i = 0; i < shape.grid.width; i++) {
                var c = shape.getMark(i, j);
                if( c === 1) {
                    scope.setPixel(i * size + pos.x, j * size + pos.y,  {r: 255, g:  255, b: 255});    
                } else if( c === 2) {   
                    scope.setPixel(i * size + pos.x, j * size + pos.y,  {r: 255, g:  0, b: 0});                  
                } else if( c === 3) {   
                    scope.setPixel(i * size + pos.x, j * size + pos.y,  {r: 0, g:  255, b: 0});    
                } else if( c === 10) {   
                    scope.setPixel(i * size + pos.x, j * size + pos.y,  {r: 100, g:  100, b: 100});                  
                }

            }
        }
        
    }
    var renderShapeTr = function( shape, pos) {
        for (var j = 0; j < shape.grid.height - 1; j++) {
            for (var i = 0; i < shape.grid.width - 1; i++) {
                var tr = shape.getGridTr(i, j);
                if( tr === 1) {
                     triangleNW( i * size + pos.x, j * size + pos.y, size, {r: 0, g:  255, b: 255});
                     triangleSE( i * size + pos.x, j * size + pos.y, size, {r: 255, g:  0, b: 0});
                } else if( tr === 2) {   
                     triangleNE( i * size + pos.x, j * size + pos.y, size, {r: 255, g:  255, b: 0});
                } else if( tr === 4) {   
                     triangleNW( i * size + pos.x, j * size + pos.y, size, {r: 0, g:  255, b: 255});
                } else if( tr === 3) {   
                     triangleSE( i * size + pos.x, j * size + pos.y, size, {r: 255, g:  0, b: 0});
                } else if( tr === 5) {   
                     triangleSW( i * size + pos.x, j * size + pos.y, size, {r: 0, g:  255, b: 0});
                }

            }
        }
        
    }
    var triangleSE = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < i; j++) {
                scope.setPixel(x + j, y + i, color);
            }
        }        
    };
    var triangleNW = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j <= i; j++) {
                scope.setPixel(x + i, y + j, color);
            }
        }        
    };
    var triangleNE = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
            for (var j = 1; j <= i; j++) {
                scope.setPixel(x + size - j, y + i, color);
            }
        }        
    };
    var triangleSW = function (x, y, size, color) {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size - i; j++) {
                scope.setPixel(x + i, y + j, color);
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



