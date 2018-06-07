NESW = function () {
    return { 
        grid:  undefined,
        size: 2,
        posOnGrig: {x: 6, y: 5},
        position: function () {
            return { x: this.posOnGrig.x * this.step, y: this.posOnGrig.y * this.step } 
        }, 
        color: {r: 180, g:  180, b: 80},
        dirs: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
        getMark: function (x, y) {
            return this.grid.grid[ y * this.grid.width + x ];
        },
        getGridTr: function (x, y) {
            return this.grid.trGrid[ y * (this.grid.width - 1)  + x ];
        }, 
        render: function() {
            var ng = new NeswGrid( this.dirs);
            this.grid = ng.getGrid();          
        }
    }
}
NeswGrid = function( dirs) {   
    var grid = 0, width = 0, height = 0, trGrid;
    var mark = function (x, y, c) {
        if( grid[ y * width + x ] !== 1) {
            grid[ y * width + x ] = c;
        }
    };
    var markD = function (x, y, d, c) {
       if(d === "NE") {
          mark(x, y, c);  
          mark(x + 1, y, 2);
          mark(x + 1, y - 1, c);
          mark(x, y - 1, 0);
        } else if(d === "NW") {
          mark(x, y, c);
          mark(x, y - 1, 2);
          mark(x - 1, y - 1, c);
          mark(x - 1, y, 0);
        } else if(d === "N") {
          mark(x, y, c);
          mark(x + 1, y, 2);
          mark(x, y - 1, c);
          mark(x + 1, y - 1, 2);
        } else if(d === "E") {
          mark(x, y, c);
          mark(x + 1, y, c);
          mark(x, y + 1, 2);
          mark(x + 1, y + 1, 2);
        } else if(d === "W") {
          mark(x, y, c);
          mark(x - 1, y, c);
          mark(x, y - 1, 2);
          mark(x - 1, y - 1, 2);
        } else if(d === "SE") {
          mark(x, y, c);
          mark(x + 1, y, 0);
          mark(x, y + 1, 2);
          mark(x + 1, y + 1, c);
        } else if(d === "S") {
          mark(x, y, c);
          mark(x - 1, y, 2);
          mark(x, y + 1, c);
          mark(x - 1, y + 1, 2);
        } else if(d === "SW") {
          mark(x, y, c);
          mark(x - 1, y, 2);
          mark(x, y + 1, 0);
          mark(x - 1, y + 1, c);
        }
    };
    var getMark = function (x, y) {
        return grid[ y * width + x ];
    };
    var getMarkB = function( x, y) {
        return getMark( x, y) === 1 || getMark( x, y) === 2 || getMark( x, y) === 3;
    } 
    var markTr = function (x, y, tr) {
         trGrid[ y * (width - 1) + x ] = tr;
    };
    var renderEmptyGrid = function() {
        var shapeId = 0;
        var markFlag = false;
        var color = 0;
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                mark ( i, j, 10 );                                               
            }
        }
    } 
    var renderGrid = function() {
        var c = 0;
        var fill = false;
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                c = getMark(i, j);
                if( c === 2) {
                    fill = true;                   
                } else if (c === 1) {
                    fill = false;
                } else if( fill ) {
                     mark ( i, j, 3 );
                }                                              
            }
        }
    } 
    var getTr = function(i, j) {
        var v0 = getMarkB(i, j);
        var v1 = getMarkB(i + 1, j);
        var v2 = getMarkB(i, j + 1);
        var v3 = getMarkB(i + 1, j + 1);
        return [v0, v1, v2, v3];

    }
    var getGridTr = function(i, j) {
        return gridTr[ y * (width - 1)  + x ];
    }
    var setGridTr = function(i, j, v) {
        if( v[0] && v[1] && v[2] && v[3]) {
            markTr( i, j, 1 );//"SQUARE"; 
        } else if( !v[0] && v[1] && v[2] && v[3]) {
            markTr( i, j, 2 );//"NE"; 
        } else if( v[0] && !v[1] && v[2] && v[3]) {
            markTr( i, j, 3 );//"SE"; 
        } else if( v[0] && v[1] && !v[2] && v[3]) {
            markTr( i, j, 4 );//"NW"; 
        } else if( v[0] && v[1] && v[2] && !v[3]) {
            markTr( i, j, 5 );//"SW"; 
        } else {
            markTr( i, j, 0);
        }
       
    }
    var renderTrGrid = function() {
        for (var j = 0; j < height - 1; j++) {
            for (var i = 0; i < width - 1; i++) {
                var v = getTr(i , j);
                setGridTr(i, j, v);                                             
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
    function isDoubleDot(d, lastDir) {
         if(d === 'SW' && lastDir === 'W') {
            return -1;
        };
         if(d === 'NW' && lastDir === 'SW') {
            return -1;
        };
        if(d === 'NE' && lastDir === 'E') {
            return -1;
        };  
        if(d === 'SE' && (lastDir === 'NE' || lastDir === 'E')) {
            return -1;
        };  
        return 1;
    } 
    var markOnGrid = function ( isPre, position) {
            var rect = {xMin: 10000, xMax: -1000, yMin: 10000, yMax: -1000};
            for(var i =0; i < dirs.length; i++) {
                if(isPre) {
                    checkExtPositions(rect, position);
                }
                var d = dirs[i];
                if( !isPre ) {
                    markD(position.x, position.y, d, 1);                                        
                   // mark(position.x, position.y, 2);  
                }
                
                if(d === 'N')
                    position.y -= 1;
                else if(d === 'S')
                    position.y += 1;
                else if(d === 'W')
                    position.x -= 1;                    
                else if(d === 'E')
                    position.x += 1;            
                else if(d === 'SE') {
                    position.x += 1;
                    position.y += 1;
                }    
                else if(d === 'NE') {
                    position.x += 1;
                    position.y -= 1;
                }    
                else if(d === 'SW') {
                    position.x -= 1;
                    position.y += 1;
                }   
                else if(d === 'NW') {
                    position.x -= 1;
                    position.y -= 1;
                } 
                 
             }
             if(isPre) {
                    checkExtPositions(rect, position);
             }
        return rect;     
    };
       
    return {
        getGrid: function () {            
            var rect =  markOnGrid( true, {x: 0, y: 0} );
            width = rect.xMax - rect.xMin + 1;
            height = rect.yMax - rect.yMin + 1;
            grid = new Int8Array( width * height) ;
            trGrid = new Int8Array( (width -1 )* (height - 1)) ; 
            renderEmptyGrid();
            markOnGrid( false, {x: -rect.xMin, y: -rect.yMin});
            renderGrid();
            renderTrGrid();
            return {
                rect: rect,
                width: width,
                height: height,
                grid: grid,
                trGrid: trGrid
            }
        }
    }
}

