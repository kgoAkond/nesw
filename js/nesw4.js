NESW = function () {
    return { 
        grid:  undefined,
        color: {r: 255, g:  180, b: 0},
        position: {x: 15, y:  15},
        dirs: [],
        getMark: function (x, y) {
            return this.grid.grid[ y * this.grid.width + x ];
        },
        getGridTr: function (x, y) {
            return this.grid.trGrid[ y * (this.grid.width - 1)  + x ];
        }, 
        deleteGridTr: function (x, y) {
            this.grid.trGrid[ y * (this.grid.width - 1)  + x ] = 0;
        }, 
        render: function() {
            var ng = new NeswGrid( this.dirs);
            //var ng = new NeswGridRandom( 20, 20);
            this.grid = ng.getGrid();          
        }
    }
}

NeswGrid = function( dirs) {   
    var grid = 0, width = 0, height = 0, trGrid;
    var mark = function (x, y, c) {
        var c0 = grid[ y * width + x ]
        if( c=== 2 || c0 === 0 || c0 > c ) {
            grid[ y * width + x ] = c;
         }
        
    };
    var markD = function (x, y, d, c) {
      
       if(d === "NE") {
          mark(x, y, 2);  
          mark(x + 1, y, 3);
          mark(x + 1, y - 1, 2);
          mark(x, y - 1, 1);
          mark(x + 2, y - 1, 3);
        } else if(d === "NW") {
          mark(x, y, 2);
          mark(x, y - 1, 3);
          mark(x - 1, y - 1, 2);
          mark(x - 1, y, 1);
          mark(x - 1, y - 2, 3);
        } else if(d === "N") {
          mark(x, y, 2);
          mark(x + 1, y, 3);
          mark(x, y - 1, 2);
          mark(x + 1, y - 1, 3);
        } else if(d === "E") {
          mark(x, y, 2);
          mark(x + 1, y, 2);
          mark(x, y + 1, 3);
          mark(x + 1, y + 1, 3);
        } else if(d === "W") {
          mark(x, y, 2);
          mark(x - 1, y, 2);
          mark(x, y - 1, 3);
          mark(x - 1, y - 1, 3);
        } else if(d === "SE") {
          mark(x, y, 2);
          mark(x + 1, y, 1);
          mark(x, y + 1, 3);
          mark(x + 1, y + 1, 2);
          mark(x - 1, y, 3);
        } else if(d === "S") {
          mark(x, y, 2);
          mark(x - 1, y, 3);
          mark(x, y + 1, 2);
          mark(x - 1, y + 1, 3);
        } else if(d === "SW") {
          mark(x, y, 2);
          mark(x - 1, y, 3);
          mark(x, y + 1, 1);
          mark(x - 1, y + 1, 2);
          mark(x - 2, y + 1, 3);
        }
    };
    var getMark = function (x, y) {
        return grid[ y * width + x ];
    };
    var getMarkB = function( x, y) {
        return getMark( x, y) === 2 || getMark( x, y) === 3 || getMark( x, y) === 4;
    } 
    var markTr = function (x, y, tr) {
         trGrid[ y * (width - 1) + x ] = tr;
    };
    var renderEmptyGrid = function() {
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                mark ( i, j, 0 );                                               
            }
        }
    } 
    var renderGrid = function() {
        var c = 0;
        var fill = false;
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                c = getMark(i, j);
                if( c === 3  ) {
                    fill = true;               
                } else if (c === 2) {
                    fill = false;
                } else if( fill ) {
                     mark ( i, j, 4 );
                }                                              
            }
        }
    } 
    var getGridTr = function(i, j) {
        return gridTr[ y * (width - 1)  + x ];
    }
    var getTr = function(i, j) {
        var v0 = getMark(i, j);
        var v1 = getMark(i + 1, j);
        var v2 = getMark(i + 1, j + 1);
        var v3 = getMark(i, j + 1);
        return [v0, v1, v2, v3];

    }
    /*      v0       v1
    *        +------+
    *        |\  1 /|
    *        | \  / |
    *        |4 \/ 2|   
    *        |  /\  |
    *        | /  \ |
    *        |/  3 \|
    *        +------+
    *       v3      v2
    */

    var setGridTr = function(i, j, v) {
        var tr = 0; 
        function a( v ) {
            return v > 1 ? 1 : 0;
        }
        if( a(v[0]) + a(v[1]) + a(v[2]) + a(v[3]) > 2) {   
            if( v[0] > 1 && v[1] > 1 ) {
                 tr = bitUtils.setBit( tr, 1 );
                 if( v[0] !== 2 && v[1] !== 2 && !(v[2]===2 && v[3]===2)) {
                     tr = bitUtils.setBit( tr, 2 );
                 }
            }       
            if( v[1] > 1 && v[2] > 1 ) {
                tr = bitUtils.setBit( tr, 3 );
                 if( v[1] !== 2 && v[2] !== 2 && !(v[0]===2 && v[3]===2)) {
                    tr = bitUtils.setBit( tr, 4 );
                 }
            }       
            if( v[2] > 1 && v[3] > 1 ) {
                 tr = bitUtils.setBit( tr, 5 );
                 if( v[2] !== 2 && v[3] !== 2 && !(v[0]===2 && v[1]===2)) {
                     tr = bitUtils.setBit( tr, 6 );
                 }

            }       
            if( v[3] > 1 && v[0] > 1 ) {
                 tr = bitUtils.setBit( tr, 7 );
                 if( v[3] !== 2 && v[0] !== 2 && !(v[1]===2 && v[2]===2) ) {
                    tr = bitUtils.setBit( tr, 8 );
                 }
            }
        }       
        markTr( i, j, tr ); 

    }
   
    var renderTrGrid = function() {
        for (var j = 0; j < height - 1; j++) {
            for (var i = 0; i < width - 1; i++) {
                var v = getTr(i , j);
                setGridTr(i, j, v);                                             
            }
        }
    } 
    
    var getHistogram = function( dirs ) {
        var hist = [0,0,0,0]; //N E S W
        var d, dd, len;
        var rect = {xMin: 0, xMax: 0, yMin: 0, yMax: 0}, height = 0, width = 0;;
        for(var i = 0; i < dirs.length - 1; i+=2) {
            d = dirs[i + 1];
            len = dirs[i];
            dd = d.split("");
            if( dd[0]=== 'N' ) {
              hist[0] += len; 
              height-=len;
              if( height < rect.yMin) {
                  rect.yMin = height;
              }
            } 
            if( dd[0]=== 'E' || dd.length > 1 && dd[1] === 'E'  ) {
              hist[1] += len; 
              width+=len;
              if( width > rect.xMax) {
                  rect.xMax = width;
              }
            } 
            if( dd[0]=== 'S' ) {
              hist[2] += len; 
              height+=len;
              if( height > rect.yMax) {
                  rect.yMax = height;
              }
            } 
            if( dd[0]=== 'W' || dd.length > 1 && dd[1] === 'W') {
              hist[3] += len; 
              width-=len;
              if( width < rect.xMin) {
                  rect.xMin = width;
              }
            } 
        }
        return { hist: hist,
                 rect: rect,
                 width: rect.xMax - rect.xMin,
                 height: rect.yMax - rect.yMin   
               };
    };
    var markOnGrid = function ( position) {
            for(var i =0; i < dirs.length - 1; i+=2) {
                var len = dirs[i];
                var d = dirs[i + 1];
                for(var j = 0; j < len; j++) {
                    markD(position.x, position.y, d, 1);                                                        
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
                 
             }    
    };
       
    return {
        getGrid: function () {            
            var hist = getHistogram(dirs);
            width = hist.width + 1;
            height = hist.height + 1;
            grid = new Int8Array( width * height) ;
            trGrid = new Int8Array( (width -1 )* (height - 1)) ; 
            renderEmptyGrid();
            markOnGrid( {x: -hist.rect.xMin, y: -hist.rect.yMin});
            renderGrid();
            renderTrGrid();
            return {
                width: width,
                height: height,
                grid: grid,
                trGrid: trGrid
            }
        }
    }
}


