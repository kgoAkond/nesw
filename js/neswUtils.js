var newsUtils = {
    genNews: function(n) {
        var dirs = [];
        var that = this;
        function check() {
            var stat = 0;
            if( dirs.length > n) {
                return false;
            }
            return true;
        };
        var tries = 0;  
        var d = 1;      
        while( true ) { 
            var d = that.getRandomDir(d);           
            dirs.push(d);    

            //stat = that.checkCycle(dirs);
            if( dirs.length >= n ) {
                break
            }
            /*
            if( stat === 1 && dirs.length >= n || tries > 5) {
                break;
            } 
            if( stat > 0) {
                dirs.pop();
                tries++;
            } else {
                tries = 0;
            }*/
          
        }
        return that.convertToNESWNotation( dirs );
    },
    checkCycle: function( dirs ) {
        var n = 0, e = 0, s = 0 , w = 0, v;
        for(var i = dirs.length - 1; i >= 0; i--){
            v = dirs[i];
            switch( v ) {
                case 1 : n++; break;
                case 2 : n++; e++; break; 
                case 3 : e++; break; 
                case 4 : s++; e++; break; 
                case 5 : s++; break; 
                case 6 : s++; w++; break; 
                case 7 : w++; break; 
                case 8 : n++; w++; break; 
            }
            if( n > 0 || e > 0 || s > 0 || w > 0) {
                if( n ===  s && e === w) {
                    if( i === 0) {
                        return 1;
                    } else {
                        return 2;
                    }
                }
            }
        };
        return 0;
    },
    /*getRandomDir: function(last) {
        var d = Math.floor((Math.random() * 8) + 1);
        return d;
            
    },*/
    getRandomDir: function(last) {
        var d = Math.floor((Math.random() * 5) + 1);
        if( last === 1) {
            switch(d) {
                case 1: return 1;
                case 2: return 2;
                case 3: return 3;
                case 4: return 7;
                case 5: return 8;
            }
        } else if( last === 2) {
            switch(d) {
                case 1: return 1;
                case 2: return 2;
                case 3: return 3;
                case 4: return 4;
                case 5: return 8;
            }
        } else if( last === 3) {
            switch(d) {
                case 1: return 1;
                case 2: return 2;
                case 3: return 3;
                case 4: return 4;
                case 5: return 5;
            }
        } else if( last === 4) {
            switch(d) {
                case 1: return 2;
                case 2: return 3;
                case 3: return 4;
                case 4: return 5;
                case 5: return 6;
            }
        } else if( last === 5) {
            switch(d) {
                case 1: return 3;
                case 2: return 4;
                case 3: return 5;
                case 4: return 6;
                case 5: return 7;
            }
        } else if( last === 6) {
            switch(d) {
                case 1: return 4;
                case 2: return 5;
                case 3: return 6;
                case 4: return 7;
                case 5: return 8;
            }
        } else if( last === 7) {
            switch(d) {
                case 1: return 5;
                case 2: return 6;
                case 3: return 7;
                case 4: return 8;
                case 5: return 1;
            }
        } else if( last === 8) {
            switch(d) {
                case 1: return 6;
                case 2: return 7;
                case 3: return 8;
                case 4: return 1;
                case 5: return 2;
            }
        }
        return d;
            
    },
    convertToNESWNotation: function ( dirs ) {
        var _that = this;
        var neswDir = [];
        dirs.forEach( function( d ) {
                neswDir.push(_that.getNESWNotation( d) );
            }
        );
        return neswDir;
    },
    getNESWNotation: function( d ) {
          if( d === 1) return "N";
          if( d === 2) return "NE";
          if( d === 3) return "E";
          if( d === 4) return "SE";
          if( d === 5) return "S";
          if( d === 6) return "SW";
          if( d === 7) return "W";
          if( d === 8) return "NW";

          throw "Wrong NESW direction";
    },
    getInvertDirs: function( dirs ) {
        var neswDir = [];
        dirs.forEach( function( d ) {
                if( d === "N" ) {
                    neswDir.push("S");
                } else if( d === "S" ) {
                    neswDir.push("N");
                } else if( d === "E" ) {
                    neswDir.push("W");
                } else if( d === "W" ) {
                    neswDir.push("E");
                } else if( d === "SE" ) {
                    neswDir.push("NW");
                } else if( d === "SW" ) {
                    neswDir.push("NE");
                } else if( d === "NE" ) {
                    neswDir.push("SW");
                } else if( d === "NW" ) {
                    neswDir.push("SE");
                }

            }
        );
        return neswDir;
    }
}

