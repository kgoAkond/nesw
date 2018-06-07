var bitUtils = {
    unsetBit : function( number, b ){   
        if( b === 1) {
            return number ^ 1;
        }
        if( b === 2) {
            return number ^ 2;
        }
        if( b === 3) {
            return number ^ 4;
        }
        if( b === 4) {
            return number ^ 8;
        }
        if( b === 5) {
            return number ^ 16;
        }
        if( b === 6) {
            return number ^ 32;
        }
        if( b === 7) {
            return number ^ 64;
        }
        if( b === 8) {
            return number ^ 128;
        }
    },
    setBit : function( number, b ){   
        if( b === 1) {
            return number | 1;
        }
        if( b === 2) {
            return number | 2;
        }
        if( b === 3) {
            return number | 4;
        }
        if( b === 4) {
            return number | 8;
        }
        if( b === 5) {
            return number | 16;
        }
        if( b === 6) {
            return number | 32;
        }
        if( b === 7) {
            return number | 64;
        }
        if( b === 8) {
            return number | 128;
        }
    },
    getBit : function( number, b ){    
        if( b === 1) {
            return number & 1;
        }
        if( b === 2) {
            return number & 2;
        }
        if( b === 3) {
            return number & 4;
        }
        if( b === 4) {
            return number & 8;
        }
        if( b === 5) {
            return number & 16;
        }
        if( b === 6) {
            return number & 32;
        }
        if( b === 7) {
            return number & 64;
        }
        if( b === 8) {
            return number & 128;
        }
    }
}
