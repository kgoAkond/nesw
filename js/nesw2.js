NESW = function () {
    return { 
        grid:  undefined,
        size: 100,
        posOnGrig: {x: 6, y: 5},
        position: function () {
            return { x: this.posOnGrig.x * this.step, y: this.posOnGrig.y * this.step } 
        }, 
        color: {r: 180, g:  180, b: 80},
        dirs: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
        getMark: function (x, y) {
            return this.grid.grid[ y * this.grid.width + x ];
        },
        render: function() {
            var ng = new NeswGrid( this.dirs, this.size );
            this.grid = ng.getGrid();
        }
    }
}
NeswGrid = function( dirs, size ) {   
    var grid = 0, width = 0, height = 0;
    var mark = function (x, y, c) {
         //console.log(x,y,c);
         grid[ y * width + x ] = c;
    };
    var getMark = function (x, y) {
        return grid[ y * width + x ];
    };
    var renderGrid = function() {
        var shapeId = 0;
        var markFlag = false;
        var color = 0;
        for (var j = 0; j < height; j++) {
            color = 0;
            for (var i = 0; i < width; i++) {
                shapeId = getMark(i, j);
                if(shapeId < 0){
                   color = 1;
                } else if(shapeId > 0) {
                      color = 1;   
                      markFlag = !markFlag
                    
                } else {
                    if(!markFlag) {
                        color = 0;
                    }
                }
                mark (i, j, color);                                               
            }
        }
    } 
    
    var checkExtPositions = function(rect, position) {
        if( position.x > rect.xMax ) {
           rect.xMax = position.x; 
        }
        if( position.y > rect.yMax ) {
           rect.yMax = position.y; 
        }
        if( position.x < rect.xMin ) {
           rect.xMin = position.x; 
        }    
        if( position.y < rect.yMin ) {
           rect.yMin = position.y; 
        }    
    };
    var markOnGrid = function ( isPre, position) {
            var rect = {xMin: 10000, xMax: -1000, yMin: 10000, yMax: -1000}
            var lastDir = dirs[ dirs.length -1];
            for(var i =0; i < dirs.length; i++) {
                if(isPre) {
                    checkExtPositions(rect, position);
                }
                var d = dirs[i];
                if( !isPre ) {
                    utils[d]( position.x, position.y, lastDir);
                }
                lastDir = d;
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
             if(isPre) {
                    checkExtPositions(rect, position);
             }
        return rect;     
    };
    var utils = {
    S: function (x, y, lastDir) {
        for (var i = 0; i < size; i++) {
            mark(x, y + i, 1);
        }
    },
    N: function (x, y, lastDir) {
        for (var i = 0; i < size; i++) {
            mark(x, y - i, 1);
        }
    },
    E: function ( x, y, lastDir) {
        for (var i = 0; i < size; i++) {
           mark( x + i, y, -1);
        }
    },
    W: function ( x, y, lastDir) {
        for (var i = 0; i < size; i++) {
             mark( x - i, y, -1);                
        }
        if(lastDir === 'SW') {
            mark( x, y, 1);            
        }
    },
    SW: function ( x, y, lastDir) {
        for (var i = 0; i < size; i++) {
             mark( x - i, y + i, 1);
        }
        if(lastDir === 'W') {
            mark( x, y, -1);
        }       
    },
    NW: function ( x, y, lastDir) {
        for (var i = 0; i < size; i++) {
             mark( x - i, y - i, 1);
        }
        if(lastDir === 'SW') {
            mark( x, y, -1);
        }        
    },
    NE: function ( x, y, lastDir) {
        for (var i = 0; i < size; i++) {
             mark( x + i, y - i, 1);
        }     
        if(lastDir === 'E') {
            mark( x, y, -1);
        }       
    },
    SE: function ( x, y, lastDir) {
        for (var i = 0; i < size; i++) {
             mark( x + i, y + i, 1);
        }
        if(lastDir === 'NE' || lastDir === 'E') {
            mark( x, y, -1);
        }        
    }
}    
    return {
        getGrid: function () {            
            var rect =  markOnGrid( true, {x: 0, y: 0} );
            width = rect.xMax - rect.xMin + 1;
            height = rect.yMax - rect.yMin + 1;
            grid = new Int8Array( width * height) ; 
            markOnGrid( false, {x: -rect.xMin, y: -rect.yMin});
            renderGrid();
            return {
                rect: rect,
                width: width,
                height: height,
                grid: grid
            }
        }
    }
}

