NESW = function () {
    return { 
        step: 100,
        posOnGrig: {x: 6, y: 5},
        position: function () {
            return { x: this.posOnGrig.x * this.step, y: this.posOnGrig.y * this.step } 
        }, 
        color: {r: 180, g:  180, b: 80},
        dirs: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    }
}
NeswGrid = function(n, m){
    var grid = new Uint8Array(n * m);
    var grid4 = new Uint8Array( 4 * n * m);
    
    for( var i = 0, len = n * m; i != len; i++) {
       grid[i] = 0; 
    }

    for( var i = 0, len = 4 * n * m; i != len; i++) {
       grid4[i] = 0; 
    }
    var mark = function (grid, x, y, w, v) {
         grid[ y * w + x ] = v;
    }
    var getMark = function (grid, x, y, w) {
        return  grid[ y * w + x ];
    }
    var fillShapes = function(grid, n, m) {
        var ac = 0;
        var state = 0;
        for (var i = 0; i < n; i++) {
            ac = 0;
            for (var j = 0; j < m; j++) {
                c = getMark(grid, i, j, n);
                if(c === 0) { // if empty        
                     if(state === 3)
                         ac = 0;      
                     if(ac === 1)
                        console.log(i,j,ac);      
                     mark(grid,  i, j, n, ac);
                     state = 2;
                } else {
                    if(ac === c) {
                       if(state === 2) {
                            ac = 0;
                       }
                       state = 3; // the same
                    }
                    else     
                      ac = c;  
                }
            }
        }
    }
    var markOnGrig = function( nesw ) {
        var n = this.n, m = this.m;
        var x = nesw.posOnGrig.x;
        var y = nesw.posOnGrig.y;
        for(var i = 0, len = nesw.dirs.length; i != len; i++) {
                mark(this.grid, x, y, n, 1);  
                var d = nesw.dirs[i];
                if(d === 'N') 
                    y--;                
                else if(d === 'S')
                    y++;
                else if(d === 'W')
                    x--;                    
                else if(d === 'E')
                    x++;            
                else if(d === 'SE') {
                    x++;
                    y++;
                }    
                else if(d === 'NE') {
                    x++;
                    y--;
                }    
                else if(d === 'SW') {
                    x--;
                    y++;
                }   
                else if(d === 'NW') {
                    x--;
                    y--;
                }                     
             }
    } 
    return {
        n: n,
        m: m,
        nesw: [], 
        grid: grid,
        render: function() {
            for(var i = 0, len = this.nesw.length; i != len; i++) {
                markOnGrig.call(this, this.nesw[i]);
            }
            fillShapes(grid, n, m);
        }
    }              
}