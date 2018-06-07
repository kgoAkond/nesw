var newsUtils = {
    modifyDirN: function( nesw, s ) {
        var arrN = [];
        var arrS = [];
        var arrE = [];
        var arrW = [];
        var dirs = nesw.dirs;
        for( var i = 0; i < dirs.length - 1; i+=2 ) {
            var d = dirs[i + 1];
            var len = dirs[i];
            if( d === 'N' ) { 
                arrN.push(i);
            } else if( d === 'S') {
                arrS.push(i);
            } else if( d === 'W') {
                arrW.push(i);
            } else if( d === 'E') {
                arrE.push(i);
            }
        }
        var r = this.getRandom(0, arrN.length);
        dirs[arrN[r]]-=s;
        r = this.getRandom(0, arrS.length);
        dirs[arrS[r]]-=s;
        r = this.getRandom(0, arrW.length);
        dirs[arrW[r]]+=s;
        r = this.getRandom(0, arrE.length);
        dirs[arrE[r]]+=s;
        
    },
    getRandom: function(from, to) {
        return Math.floor((Math.random() * to) + from);
    }
}